#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl,webUrl } from "../constants.js";
import { saveLS,getLS, deleteLS } from "../cookies.js";

$(function() {
    let itemIndex = 1; // Initialize item index for unique IDs
    let selectedQuantity = 0;
    const itemQuantities  = new FormData();
    ajax_request(apiUrl + `order/${getLS("order")}`, "GET", getLS("company"))
    .then(response => {

        let order = response.order
        let order_prod = response.order_prod
        let order_proces = response.order_proces
        $("#status").append($("<option>").attr("value", order.status).attr("selected", true).text(order.status))
        ajax_request(apiUrl + `customer`, "GET", getLS("company"))
        .then(customer => {
            customer.forEach(cust_value => {
                if (cust_value.id == order.cus_id) {
                    $("#cus_id").append($("<option>").attr("value", cust_value.id).attr("selected", true).text(cust_value.full_name))
                } else {
                    $("#cus_id").append($("<option>").attr("value", cust_value.id).text(cust_value.full_name))
                }
            })
        })
        .catch(error => console.error(error))

        order_prod.forEach(order_p => {

            itemIndex++;
        const newRow = $('<div>').addClass('row g-3 item-row');

        const itemCol = $('<div>').addClass('col-md-6');
        const itemLabel = $('<label>').attr('for', `prod_id_${itemIndex}`).addClass('form-label').text('Item');
        const itemSelect = $('<select>').attr('id', `prod_id_${itemIndex}`).addClass('form-select item-select');
        ajax_request(apiUrl + "inventory", "GET", getLS("company"))
        .then(inventory => {
            inventory.forEach(value => {
                if (value.id == order_p.prod_id && value.quantity > 0) {
                    itemSelect.append($("<option>").attr("value", value.id)
                    .attr("selected", true).text(value.product))

                    itemQuantities[String(value.id)] = value.quantity
                    const quantityCol = $('<div>').addClass('col-md-4');
                    const quantityLabel = $('<label>').attr('for', `quantity_${itemIndex}`).addClass('form-label').text('Quantity');
                    const quantityInput = $('<input>').attr('type', 'number').attr('id', `quantity_${itemIndex}`).addClass('form-control quantity-input').val(order_p.quantity)
                                            .attr("max", value.quantity).attr("min", 1);
                    itemCol.append(itemLabel).append(itemSelect);
                    quantityCol.append(quantityLabel).append(quantityInput);
                    newRow.append(itemCol).append(quantityCol);

                        // Create the Remove button column
                    const removeCol = $('<div>').addClass('col-md-2 d-flex align-items-end');
                    const removeButton = $('<button>')
                        .attr('type', 'button')
                        .addClass('btn btn-danger btn-remove')
                        .append($('<i>').addClass('bi bi-trash'));
                    removeCol.append(removeButton);
                    newRow.append(removeCol);
                } else {
                    itemSelect.append($("<option>").attr("value", value.id).text(value.product))
                    itemQuantities[String(value.id)] = value.quantity


                }

            })
        })
        .catch(error => console.log(error))

        console.log(itemQuantities)

        $('#item-container').append(newRow);
        })
    })

    $('#add-item').on('click', function() {
        itemIndex++;
        const newRow = $('<div>').addClass('row g-3 item-row');

        const itemCol = $('<div>').addClass('col-md-6');
        const itemLabel = $('<label>').attr('for', `prod_id_${itemIndex}`).addClass('form-label').text('Item');
        const itemSelect = $('<select>').attr('id', `prod_id_${itemIndex}`).addClass('form-select item-select');
        const option1 = $('<option>').text('Choose...').attr('selected', true).attr("disabled", true);
        itemSelect.append(option1)
        ajax_request(apiUrl + "inventory", "GET", getLS("company"))
        .then(response => {
            response.forEach(value => {
                if (value.quantity > 0) {
                    itemSelect.append($("<option>").attr("value", value.id).text(value.product))
                    itemQuantities[JSON.stringify(value.id)] = value.quantity
                }
            })
        })
        .catch(error => console.log(error))

        itemCol.append(itemLabel).append(itemSelect);

        const quantityCol = $('<div>').addClass('col-md-4');
        const quantityLabel = $('<label>').attr('for', `quantity_${itemIndex}`).addClass('form-label').text('Quantity');
        const quantityInput = $('<input>').attr('type', 'number').attr('id', `quantity_${itemIndex}`).addClass('form-control quantity-input');
        quantityCol.append(quantityLabel).append(quantityInput);

        newRow.append(itemCol).append(quantityCol);

        // Create the Remove button column
    const removeCol = $('<div>').addClass('col-md-2 d-flex align-items-end');
    const removeButton = $('<button>')
        .attr('type', 'button')
        .addClass('btn btn-danger btn-remove')
        .append($('<i>').addClass('bi bi-trash'));
    removeCol.append(removeButton);
    newRow.append(removeCol);

        $('#item-container').append(newRow);
    });

    $(document).on('change', '.item-select', function() {
        const selectedItem = $(this).val();
        const quantityInput = $(this).closest('.item-row').find('.quantity-input');

        if (itemQuantities[selectedItem]) {
            quantityInput.attr('min',1);
            quantityInput.attr('max', itemQuantities[selectedItem]);
        } else {
            quantityInput.removeAttr('min');
            quantityInput.removeAttr('max');
        }
    });


    $(document).on('click', '.btn-remove', function() {
        $(this).closest('.item-row').remove();
    });

    $('#order-form').on('submit', function(event) {
        event.preventDefault();

        const formData = new FormData();
        let prod_value = {}
        let sum = 0;
        $('#item-container .item-row').each(function() {
            const item = $(this).find('.item-select').val();
            const quantity = $(this).find('.quantity-input').val();
            prod_value[item] = quantity
            sum += Number.parseInt(quantity)
        });

        formData.append("cus_id", $("#cus_id").val())
        formData.append("process_status", $("#process").val())
        formData.append("status", $("#status").val())
        formData.append("prod_value", JSON.stringify(prod_value));
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);

        }
        console.log("after request", sum)
       ajax_request(apiUrl + `order/${getLS("order")}`, "PUT", getLS("company"),
                     false, formData)
        .then(response => {
            deleteLS("order")
            saveLS("order", response.id)
            window.location.assign(webUrl + "order")
        })
        .catch(error => console.log(error))

    });

})