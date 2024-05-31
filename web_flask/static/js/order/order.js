#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { saveLS, getLS, deleteLS } from "../cookies.js";


$(function() {
    let itemIndex = 1; // Initialize item index for unique IDs

    const itemQuantities  = {}

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
                    itemQuantities[value.id] = value.quantity
                }
            })
        })
        .catch(error => console.log(error))
        console.log(itemQuantities)
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
        let address = $("#address").val()
        let full_name = $("#full_name").val()
        let telegram = $("#telegram").val()
        let phone = $("#phone_no").val()
        let city = $("#city").val()

        prod_value[$("#prod_id").val()] = $("#quantity").val()
        
        $('#item-container .item-row').each(function() {
            const item = $(this).find('.item-select').val();
            const quantity = $(this).find('.quantity-input').val();
            prod_value[item] = quantity
            
        });

        formData.append("full_name", full_name)
        formData.append("telegram", telegram)
        formData.append("phone_no", phone)
        formData.append("city", city)
        formData.append("address", address)
        formData.append("prod_value", JSON.stringify(prod_value));
        
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);            
        }
        console.log("after request")
       ajax_request(apiUrl + "order", "POST", getLS("company"),
                     false, formData)
        .then(response => {
            deleteLS("order")
            saveLS("order", response.id)
            window.location.assign(webUrl + "order")
        })
        .catch(error => console.log(error))
       
    });
});
