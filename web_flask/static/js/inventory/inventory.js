#!/usr/bin/env node

import { apiUrl, webUrl } from "../constants.js";
import { ajax_request } from "../requests.js";
import { getLS, saveLS, deleteLS } from "../cookies.js";

$(function() {

    ajax_request(apiUrl + `inventory/${getLS('product')}`, "GET",
                  getLS("company"),
                  )
    .then(response => {
        $(".product").text(response.product)
        $(".quantity").text(response.quantity)
        $(".price").text(response.price)
        $(".catagory").text(response.catagory)
        $(".image_updt").attr("src", `../../static/img/upload/${response.image}`)

        $(".product_updt").val(response.product)
        $(".quantity_updt").val(response.quantity)
        $(".catagory_updt").val(response.catagory)
        $("#price").val(response.price)
    })
    .catch(error => console.log(error))

    $(".create-prod").on("submit", function(event) {
        event.preventDefault()
        let api = ""
        let method = ""
        if ($(".create-prod").attr("id") === "update") {
            api = `${apiUrl}inventory/${getLS("product")}`
            method = "PUT"
        } else {
            api = apiUrl + "inventory"
            method = "POST"
        }
        const formData = new FormData(this);
        const image = document.getElementById("image")
        if (image && image.files && image.files.length > 0) {
            formData.append("image", image.files[0]);
        }
        ajax_request(api, method, getLS("company"),
                      false, formData)
        .then(response => {
            deleteLS("product")
            saveLS("product", response.id)
            window.location.href = webUrl + "update/product"
        })
        .catch(error => console.log(error))
    })
})