#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { getLS } from "../cookies.js";
import { formatDate } from "../date_format.js"

$(function() {
    let data_table = $("#example")
    let data_table2 = $("#example1")
    let revSum = 0;
    let custSum = 0;
    let productCounts = {};
    let count;

    const chartDom = document.querySelector("#trafficChart");
    const myChart = echarts.init(chartDom);
    const initialOption = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
            orient: 'horizontal', // or 'vertical' based on your layout
            top: '5%', // Adjust as needed
            left: 'center', // Adjust as needed
            padding: [3, 3, 3, 3], // Add padding around the legend
        },
        series: [{
          name: 'Product sold',
          type: 'pie',
          radius: ['40%', '60%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'bottom',
            fontSize: 15 // Adjust the font size of labels
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '10',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: [] // Initial empty data
        }]
    };
    myChart.setOption(initialOption);

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
                    row.append($("<td>").text(`${product.price} BR`))
                    row.append($("<td>").text(order.status))
                    data_table.find("tbody").append(row)

                }
            })
            revSum += order.total_amnt     
        })
        customers.forEach(value => custSum++)
        $(".revenue_value").text(`${revSum}BR`)
        $(".customer").text(custSum)

        orderitems.forEach(oi => {
            products.forEach(product =>{
                if (oi.prod_id === product.id) {
                    if (productCounts[product.product]) {
                        productCounts[product.product] += oi.quantity;
                    } else {
                        productCounts[product.product] = oi.quantity;
                    }
                }

            })
        })

        if (products) {
            data_table2.find("tbody").empty()
        }
       
        let sortedItem = Object.entries(productCounts)
                .sort(([, valueA], [, valueB]) => valueB - valueA)
                .slice(0, 5);

                sortedItem.forEach(([key, value]) => {
                let product = products.find(item => item.product === key)
                let row = $("<tr>")
                row.append($("<th>").attr("scope", "row").append($("<img>").attr("src", `../static/img/upload/${product.image}`)))
                row.append($("<td>").text(product.product))
                row.append($("<td>").text(`${product.price} BR`))
                row.append($("<td>").text(value))
                row.append($("<td>").text(`${value * product.price} BR`))
                data_table2.find("tbody").append(row)
            })


        data_table.DataTable({
            destroy: true, 
            paging: true,
            searching: true,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
            responsive: true
        });

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
        myChart.setOption({
            series: [{
                data: chartData
            }]
        });
        console.log(productCounts)

    })
    .catch(error => console.error(error));
});
