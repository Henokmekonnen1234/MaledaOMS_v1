#!/usr/bin/env node

import { apiUrl, webUrl } from "../constants.js";
import { ajax_request } from "../requests.js";
import { getLS, saveLS, deleteLS } from "../cookies.js";

$(function() {
    $(".create-prod").on("submit", function(event) {
        event.preventDefault()
        const formData = new FormData(this);
        const image = document.getElementById("image")
        if (image && image.files && image.files.length > 0) {
            formData.append("image", image.files[0]);
        }
        ajax_request(apiUrl + "inventory", "POST", getLS("company"),
                      false, formData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    })
})