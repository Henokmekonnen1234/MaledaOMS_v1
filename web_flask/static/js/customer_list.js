#!/usr/bin/env node

import { ajax_request } from "./requests.js"
import { apiUrl } from "./constants.js"
import { getLS } from "./cookies.js"

document.addEventListener("DOMContentLoaded", function() {
        ajax_request(apiUrl + "customer", "GET", getLS("company"),
                      "application/json")
        .then(response => {
            const customer = response.customer
            var tbody = document.querySelector("#customer-list") 
            tbody.empty()
            customer.forEach(value => {
                let tr = $("<tr>")
                tr.append($("<td>").text(value.full_name))
                tr.append($("<td>").text(value.email))
                tr.append($("<td>").text(value.addres))
                tr.append($("<td>").text(value.phone_no))
                tr.append($("<td>").text(value.city))
                tbody.append(tr)
            });
            console.log(response.customer)
        })
        .catch(error => {
            console.log(error)
        })
    })