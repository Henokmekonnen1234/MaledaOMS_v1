#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { getLS, saveLS, deleteLS } from "../cookies.js";

$(function() {

    ajax_request(apiUrl + `customer/${getLS('customer')}`,  "GET",
                 getLS("company"))
    .then( response => {
        $(".full_name").text(response.customer.full_name)
        $(".telegram").text(response.customer.telegram)
        $(".address_cust").text(response.customer.address)
        $(".phone_no_cust").text(response.customer.phone_no)
        $(".city").text(response.customer.city)

        $(".full_name").val(response.customer.full_name)
        $(".telegram").val(response.customer.telegram)
        $(".address_cust").val(response.customer.address)
        $(".phone_no_cust").val(response.customer.phone_no)
        $("#city").val(response.customer.city)        
    })
    .catch(error => console.log(error))

    $(".reg-customer").on("submit", function(event) {
        event.preventDefault()
        const formData = new FormData(this);
        let method = "";
        let api = "";
        if ($(".reg-customer").attr("id") === "update") {
            method = "PUT"
            api = apiUrl + `customer/${getLS("customer")}`
        } else {
            method = "POST"
            api = apiUrl + "customer"
        }
        ajax_request(api, method, getLS("company"), false,
                      formData)
        .then(response => {
            deleteLS("customer")
            saveLS("customer", response.customer.id)
            window.location.href = webUrl + "profile/customer"
        })
        .catch(error => {
            console.error(error)
        })
    })
})

