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
    ).then((orders, customers, orderitems, products) => {
        
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
    

        $('#example').DataTable({
                destroy: true, // Destroy existing DataTable before creating a new one
                paging: true,
                searchable: true,
                buttons: [
                    'csv', 'excel', 'pdf', 'print'
                ],
                responsive: true
            });

    })

    
})
