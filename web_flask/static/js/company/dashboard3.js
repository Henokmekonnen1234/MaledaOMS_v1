#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { getLS } from "../cookies.js";
import { formatDate } from "../date_format.js"

$(function() {
    let data_table = $("#example")
    let revSum = 0;
    let custSum = 0;
    let productCounts = {}; // Object to store product counts

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
        $(".sales_value").text(orders.length)
             
        orders.forEach(order => {
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
            revSum += order.total_amnt     
        })

        
        customers.forEach(value => custSum++)
        $(".revenue_value").text(orders.length)
        $(".customer").text(custSum)

        data_table.DataTable({
            destroy: true, 
            paging: true,
            searching: true,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
            responsive: true
        });

        // Convert productCounts object to array format for the chart
        let chartData = Object.keys(productCounts).map(key => {
            return {
                value: productCounts[key],
                name: key
            };
        });

        // Update the chart with the new data
        echarts.init(document.querySelector("#trafficChart")).setOption({
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [{
                name: 'Product Orders',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: chartData
            }]
        });
    })
    .catch(error => console.error(error))
});
