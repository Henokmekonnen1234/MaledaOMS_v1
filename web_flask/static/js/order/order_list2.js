#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { getLS, saveLS, deleteLS } from "../cookies.js";

$(function() {
    let order_table = $('#example');  // Ensure this ID matches your table in the HTML
    let order_pro = [];
    let products = [];

    // Clear the table
    order_table.find('tbody').empty();

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
        if (!Array.isArray(orders)) {
            console.error("Orders is not an array:", orders);
            return;
        }

        // Collect all promises for fetching order items
        let orderItemPromises = orders.map(async order => {
            try {
                const orderProducts = await ajax_request(apiUrl + `orderitem`, "GET", getLS("company"));
                let customer = customers.find(cust => cust.id === order.cus_id);

                // Create a table row
                let row = $('<tr></tr>');

                // Create table data cells
                let txnCell = $('<td></td>').text(order.txn_no);
                let customerCell = $('<td></td>').text(customer.full_name);
                let statusCell = $('<td></td>').text(order.status);
                let processCell = $('<td></td>').text(order_pro.find(pro => pro.order_id === order.id)?.process_status || 'N/A');
                let updateCell = $('<td></td>').append(
                    $('<a>')
                        .addClass("order_info btn btn-primary btn-sm")
                        .attr("href", "#")
                        .attr("id", `${order.id}`)
                        .append($('<i>').addClass("bi bi-info-circle")),
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

                orderProducts.forEach(orderProd => {
                    if (order.id === orderProd.order_id) {
                        let product = products.find(prod => prod.id === orderProd.prod_id);
                        if (product) {
                            let dropdownItem = $(`
                                    <div class="col-lg-12 col-md-12">
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
                order_table.find('tbody').append(row);
            } catch (error) {
                return console.log(error);
            }
        });

        // Wait for all order item promises to complete
        Promise.all(orderItemPromises).then(() => {
            // Initialize DataTable after all rows are appended
            order_table.DataTable({
                retrieve: true,
                paging: true,
                searching: true,
                buttons: [
                    'csv', 'excel', 'pdf', 'print'
                ],
                responsive: true
            });
        });
    }).catch(error => console.log(error));

    // Event delegation for dynamically added elements
    $(document).on("click", ".order_info", function(event) {
        event.preventDefault();
        deleteLS("order");
        saveLS("order", $(this).attr("id"));
        window.location.href = webUrl + "order";
        console.log("clicked");
    });
});
