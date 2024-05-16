#!/usr/bin/env node

import { ajax_request } from "./requests.js";
import { apiUrl, webUrl } from "./constants.js";
import { getLS } from "./cookies.js";

$(function() {

    $(".reg-customer").on("submit", function(event) {
        event.preventDefault()
        const formData = new FormData(this);
        const custData = {}
        for (let entry of formData.entries()) {
            custData[entry[0]] = entry[1]
        }
        //"application/json"
        console.log(custData)
        ajax_request(apiUrl + "customer", "POST", getLS("company"), false,
                      formData)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error(error)
        })
    })

    
})

