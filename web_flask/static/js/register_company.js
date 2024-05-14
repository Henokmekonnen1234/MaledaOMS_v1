#!/usr/bin/env node

import { ajax_request } from "./requests.js";
import { apiUrl, webUrl } from "./constants.js";

$(document).ready(() => {
    $(".company-reg").submit(function(event) {
        event.preventDefault();

        const name = $("#name").val()
        const email = $("#email").val()
        const password = $("#password").val()
        const phone_no = $("#phone_no").val()
        const formData = {
            name,
            email,
            password,
            phone_no
        }
        console.log(formData)
        ajax_request(apiUrl + "company", "POST", null, "application/json", JSON.stringify(formData))
            .then(response => {
                window.location.href = webUrl + "login"
            })
            .catch(error => {
                console.log(error)
            })
});
})
