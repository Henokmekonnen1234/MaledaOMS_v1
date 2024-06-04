#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { saveLS, getLS, deleteLS } from "../cookies.js";

$(function() {
    $.when(
        ajax_request(apiUrl + `delivery/${getLS("delivery")}`, "GET", getLS("company")),
        ajax_request(apiUrl + `order`, "GET", getLS("company")),
        ajax_request(apiUrl + `customer`, "GET", getLS("company")),
        ajax_request(apiUrl + `orderitem`, "GET", getLS("company")),
        ajax_request(apiUrl + `inventory`, "GET", getLS("company"))
    ).then((delivery, orders, customers, orderitems, products) => {

        let order = orders.find(order_data => order_data.id === delivery.order_id)
        let customer = customers.find(cust_data => cust_data.id === order.cus_id)
        $(".full_name").text(customer.full_name)
        // $(".products").empty()
        
        $(".total_amnt").text(order.total_amnt)
        $(".status").text(order.status)
        $(".delivery_date").text(delivery.delivery_date)
        $(".delivery_status").text(delivery.delivery_status)
        $(".location").text(delivery.location)

        orderitems.forEach(oi => {
            if (oi.order_id === order.id) {
                const product = products.find(prod => prod.id === oi.prod_id);
                if (product) {
                    let rowDiv = $("<div>").addClass("row"); 
                    let label = $("<div>").addClass("col-lg-3 col-md-4 label").text("Products");
                    let secDiv = $("<div>").addClass("col-lg-9 col-md-8");
                    secDiv.append($("<span>").text(product.product));
                    $(".products").append(rowDiv.append(label, secDiv))
                }
            }
        });

        const formattedDate = new Date(delivery.delivery_date).toISOString().split('T')[0];
        $("#delivery_date").val(formattedDate);
        $("#delivery_status").append($("<option>").attr("value", delivery.delivery_status).attr("selected", true)
                                     .text(delivery.delivery_status))
        $("#location").val(delivery.location)
        
    })

    $(document).on("submit", "#update", function(event) {
        event.preventDefault()
        let formData = new FormData(this);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);            
        }

        ajax_request(apiUrl + `delivery/${getLS("delivery")}`, "PUT", getLS("company"),
                      false, formData)
        .then(response => {
            deleteLS("delivery")
            saveLS("delivery", response.id)
            window.location.href = webUrl + "update/delivery"
        })
        .catch(error => console.error(error))

    })
})