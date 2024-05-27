#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { getLS, saveLS, deleteLS } from "../cookies.js";

$(function() {
    let order_table = $('#order-list');
    let order_pro = [];
    let products = [];

    // Clear the table
    order_table.empty();

    // Fetch all necessary data
    $.when(
        ajax_request(apiUrl + "orderprocess", "GET", getLS("company")),
        ajax_request(apiUrl + "inventory", "GET", getLS("company")),
        ajax_request(apiUrl + "customer", "GET", getLS("company")),
        ajax_request(apiUrl + "order", "GET", getLS("company"))
    ).then((orderProcessResponse, inventoryResponse, customerResponse, orderResponse) => {
        order_pro = orderProcessResponse;
        products = inventoryResponse;
        let customers = customerResponse;
        let orders = orderResponse;

        // Debugging: Log the orders variable
        console.log("Orders:", orders);

        // Check if orders is an array
        if (Array.isArray(orders)) {
            // Loop through each order and populate the table
            orders.forEach(order => {
                let customer = customers.find(cust => cust.id === order.cus_id);

                // Create a table row
                let row = $('<tr></tr>');

                // Create table data cells
                let txnCell = $('<td></td>').text(order.txn_no);
                let customerCell = $('<td></td>').text(customer ? customer.full_name : 'N/A');
                let statusCell = $('<td></td>').text(order.status);
                let processCell = $('<td></td>').text(order_pro.find(pro => pro.order_id === order.id)?.process_status || 'N/A');
                let updateCell = $('<td></td>').append(
                    $('<a>')
                        .addClass("update_prod btn btn-primary btn-sm")
                        .attr("href", "#")
                        .attr("id", `${order.id}`)
                        .append($('<i>').addClass("bi bi-upload")),
                    $('<a>')
                        .addClass("delete_product btn btn-danger btn-sm")
                        .attr("href", "#")
                        .attr("id", `${order.id}`)
                        .append($('<i>').addClass("bi bi-trash"))
                );

                // Create product dropdown cell
                let productCell = $('<td></td>');

                // Fetch product details for each order item
                ajax_request(apiUrl + `orderitem`, "GET", getLS("company"))
                    .then(orderProducts => {
                        orderProducts.forEach(orderProd => {
                            if (order.id === orderProd.order_id) {
                                let product = products.find(prod => prod.id === orderProd.prod_id);
                                if (product) {
                                    let dropdownItem = $(`
                                        <div class="col-lg-10 col-md-7">
                                            <img src="../../static/img/upload/${product.image}" class="img-fluid rounded-start" alt="${product.product}" width="15" height="20">
                                            ${product.product} 
                                        </div>
                                    `);
                                    productCell.append(dropdownItem);
                                }
                            }
                        });

                        // Append cells to row and then row to table
                        row.append(txnCell, customerCell, productCell, statusCell, processCell, updateCell);
                        order_table.append(row);
                    })
                    .catch(error => console.log(error));
            });
        } else {
            console.error("Orders is not an array:", orders);
        }
    }).catch(error => console.log(error));

    // Event delegation for dynamically added elements
    $(document).on("click", ".update_prod", function(event) {
        event.preventDefault();
        deleteLS("order");
        saveLS("order", $(this).attr("id"));
        window.location.href = webUrl + "order";
        console.log("clicked");
    });
});
