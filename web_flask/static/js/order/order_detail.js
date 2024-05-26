#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { getLS } from "../cookies.js";

$(function() {
    ajax_request(apiUrl + `order/${getLS("order")}`, "GET", getLS("company"))
    .then(response => {
        const order = response.order
        const order_prod = response.order_prod
        const order_proces = response.order_proces
        const delivery = response.delivery
        ajax_request(apiUrl + `customer/${order.cus_id}`, "GET", getLS("company"))
        .then(response => {
            $(".customer").text()             
        })
    })
})