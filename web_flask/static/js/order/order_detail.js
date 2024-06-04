#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { getLS } from "../cookies.js";
import { formatDate } from "../date_format.js";

$(function() {
    ajax_request(apiUrl + `order/${getLS("order")}`, "GET", getLS("company"))
    .then(response => {
        const order = response.order
        const order_prod = response.order_prod
        const order_proces = response.order_proces
        const delivery = response.delivery
        if (order.order_date) {
            $(".order_date").text(formatDate(order.order_date))
        }
        
        $(".process_date").text(formatDate(order_proces.process_date))
        $(".txn_no").text(order.txn_no)
        $(".status").text(order.status)
        $(".total_amt").text(order.total_amnt)
        $(".order_process").text(order_proces.process_status)
        $(".delivery_status").text(delivery.delivery_status)
        $(".delivery_date").text(formatDate(delivery.delivery_date))
        $(".location").text(delivery.location)
        ajax_request(apiUrl + `customer/${order.cus_id}`, "GET", getLS("company"))
        .then(response1 => {
            $(".customer").text(response1.full_name)             
        })
        .catch(error => console.log(error))
        // if (order_prod) {
            
        //     $(".products").empty()
        // }
        order_prod.forEach(value => {
            ajax_request(apiUrl + `inventory/${value.prod_id}`, "GET", getLS("company"))
            .then(response2 => {
                let prodDiv = $('.product-template').clone().removeClass('d-none product-template');
                prodDiv.find('.product').text(response2.product);
                prodDiv.find('.quantity').text(value.quantity);
                prodDiv.find('.price').text(response2.price);
                prodDiv.find('.total_price').text(value.quantity * response2.price);
                prodDiv.find('.image').attr('src', `../../static/img/upload/${response2.image}`);
        
                $('.products').append(prodDiv);
                console.log(response2)
            })
            .catch(error => console.log(error))
        });
    })

    
})