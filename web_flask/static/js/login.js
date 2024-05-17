#!/usr/bin/env node

import { ajax_request } from "./requests.js";
import { apiUrl, webUrl } from "./constants.js";
import { saveLS,deleteLS } from "./cookies.js";

$(document).ready(() => {
    $('#login-form').submit((event) => {
        event.preventDefault()

        const email = $("#email").val()
        const password = $("#password").val()
        const data = {
            email,
            password
        }
        var url = apiUrl + "login"
        console.log(url)
        ajax_request(url, "POST", null, 'application/json',  JSON.stringify(data))
        .then(response => {
            deleteLS("company")
            saveLS("company", response.token)
            window.location.assign(webUrl)
        })
        .catch(error => {
            console.log(error)
        })
    }

    );
});