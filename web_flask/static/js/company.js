#!/usr/bin/env node

import { ajax_request } from "./requests.js";
import { apiUrl, webUrl } from "./constants.js";
import { getLS } from "./cookies.js";

$(document).ready(function() {
    $(".update-company").submit(function(event) {
        event.preventDefault()

        const form = document.querySelector('.update-company');
        const formData = new FormData(form);
        const image = document.getElementById("image")
        if (image && image.files && image.files.length > 0) {
            formData.append("image", image.files[0]);
        }

        ajax_request(apiUrl + "company", "PUT", getLS("company"), false,
        formData)
        .then(response => {
            window.location.assign(webUrl + "/")
        })
        .catch(error => {
            console.log(error)
        })
    })
})