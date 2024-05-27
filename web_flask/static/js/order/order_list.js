#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { getLS, saveLS, deleteLS } from "../cookies.js";

$(function() {
    let order_pro = [];
    let products = [];
    let customers = [];

    // Fetch order processes
    ajax_request(apiUrl + "orderprocess", "GET", getLS("company"))
        .then(response => {
            order_pro = response;
        })
        .catch(error => console.log(error));

    // Fetch inventory products
    ajax_request(apiUrl + "inventory", "GET", getLS("company"))
        .then(response => {
            products = response;
        })
        .catch(error => console.log(error));

    // Fetch customers
    ajax_request(apiUrl + "customer", "GET", getLS("company"))
        .then(response => {
            customers = response;
        })
        .catch(error => console.log(error));

    // Fetch orders
    ajax_request(apiUrl + "order", "GET", getLS("company"))
        .then(orders => {
            orders.forEach(order => {
                // Get customer details
                let customer = customers.find(cust => cust.id === order.cus_id);

                // Create a table row
                let row = $('<tr></tr>');

                // Create table data cells
                let txnCell = $('<td></td>').text(order.txn_no);
                let customerCell = $('<td></td>').text(customer ? customer.full_name : 'N/A');
                let statusCell = $('<td></td>').text(order.status);
                let processCell = $('<td></td>').text(order_pro.find(pro => pro.order_id === order.id)?.process_status || 'N/A');
                let updateCell = $('<td></td>').html('<a href="#" class="btn btn-primary btn-sm"><i class="bi bi-upload"></i></a>');

                // Create product dropdown cell
                let productCell = $('<td></td>');
                let productDropdown = $('<div class="dropdown"></div>');
                let dropdownButton = $('<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Products</button>');
                let dropdownMenu = $('<ul class="dropdown-menu"></ul>');

                // Fetch product details for each order item
                ajax_request(apiUrl + `orderitem`, "GET", getLS("company"))
                    .then(orderProducts => {
                        orderProducts.forEach(orderProd => {
                            
                            if (order.id === orderProd.order_id) {
                                let product = products.find(prod => prod.id === orderProd.prod_id);
                                let dropdownItem = $(`
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            <img src="../../static/img/upload/${product.image}" class="img-fluid rounded-start image" alt="${product.product}" width="50">
                                            Someshit buyed 
                                        </a>
                                    </li>
                                `);
                                dropdownMenu.append(dropdownItem);
                            }
                        });
                    })
                    .catch(error => console.log(error));

                productDropdown.append(dropdownButton, dropdownMenu);
                productCell.append(productDropdown);

                // Append cells to row
                row.append(txnCell, customerCell, productCell, statusCell, processCell, updateCell);

                // Append row to table
                $('#order-list').append(row);
            });
        })
        .catch(error => console.log(error));
});
