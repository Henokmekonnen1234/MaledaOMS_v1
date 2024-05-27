#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { getLS, saveLS, deleteLS } from "../cookies.js";

$(function() {
    ajax_request(apiUrl + "order", "GET", getLS("company"))
    .then(orders => {
        orders.forEach(order => {
            
        });
    })
    .catch(error => console.log(error))
})