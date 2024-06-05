#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { getLS } from "../cookies.js";
import { formatDate } from "../date_format.js"

$(function() {
    var data_table = $("#example")
    data_table.find("tbody").empty()
    $.when(
        ajax_request(apiUrl + `order`, "GET", getLS("company")),
        ajax_request(apiUrl + `customer`, "GET", getLS("company")),
        ajax_request(apiUrl + "orderitem", "GET", getLS("company")),
        ajax_request(apiUrl + "inventory", "GET", getLS("company"))
    ).then((orderResponse, customers, orderitems, products) => {
        let currentDate = new Date()
        let orders = orderResponse.filter(order => {
            const order_data = new Date(order.order_date)
            return currentDate.getMonth() === order_data.getMonth()
             })

        orders.forEach(order =>{
            orderitems.forEach(orderitem => {
                if (order.id === orderitem.order_id) {
                    let customer = customers.find(cust_data => cust_data.id === order.cus_id)
                    let product = products.find(item => item.id === orderitem.prod_id)
                    let row = $("<tr>")
                    row.append($("<th>").text(order.txn_no))
                    row.append($("<td>").text(customer.full_name))
                    row.append($("<td>").text(product.product))
                    row.append($("<td>").text(product.price))
                    row.append($("<td>").text(order.status))
                    data_table.find("tbody").append(row)
                }
            })
                    
        })
    
        data_table.DataTable({
            destroy: true, 
            paging: true,
            searching: true,
            lengthMenu: [[10, 25, 50, -1], [5, 10, 25, 50, "All"]],
            responsive: true
        });

    })
    .catch(error => console.error(error))

    
})
