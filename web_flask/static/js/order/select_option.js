#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl } from "../constants.js";
import { getLS } from "../cookies.js";

$(function() {

    const item_quan = {}

    ajax_request(apiUrl + "customer", "GET", getLS("company"))
    .then(response => {
        const select = $("#cus_id")
        response.forEach(values => {
            select.append($("<option>").attr("value", values.id).text(values.full_name))
        })
    })
    .catch(error => console.log(error))

    ajax_request(apiUrl + "inventory", "GET", getLS("company"))
    .then(response => {
        const select = $(".item-select")
        response.forEach(value => {
            select.append($("<option>").attr("value", value.id).text(value.product))
            item_quan[value.id] = value.quantity
        })
    })
    .catch(error => console.log(error))
    console.log(item_quan)
    $(document).on('change', '.item-select', function() {
        const selectedItem = $(this).val();
        const quantityInput = $(this).closest('.item-row').find('.quantity-input');
        
        if (item_quan[selectedItem]) {
            quantityInput.attr('min',1);
            quantityInput.attr('max', item_quan[selectedItem]);
        } else {
            quantityInput.removeAttr('min');
            quantityInput.removeAttr('max');
        }
    });
});