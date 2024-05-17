#!/usr/bin/env node

import { ajax_request } from "../requests.js"
import { apiUrl, webUrl } from "../constants.js"
import { getLS, saveLS, deleteLS } from "../cookies.js"

document.addEventListener("DOMContentLoaded", function() {
        ajax_request(apiUrl + "customer", "GET", getLS("company"),
                      "application/json")
        .then(response => {
            const customer = response.customer
            var tbody = $("#customer-list") 
            tbody.empty()
            customer.forEach(value => {
                let tr = $("<tr>")
                tr.append($("<td>").text(value.full_name))
                tr.append($("<td>").text(value.telegram))
                tr.append($("<td>").text(value.address))
                tr.append($("<td>").text(value.phone_no))
                tr.append($("<td>").text(value.city))
                tr.append($("<td>").addClass("customer_profile").append($("<a>")
                    .addClass("btn btn-primary btn-sm")
                    .attr("href", "{{ url_for('customer_profile') }}")
                    .attr("id", `${value.id}`)
                    .append($("<i>").addClass("bi bi-upload"))))
                tbody.append(tr)
            });
            console.log(response.customer)
            
            $('#example').DataTable({
                // Enable paging
                paging: true,
                // Enable searching
                searching: true,
                // Enable data export buttons
                buttons: [
                    'csv', 'excel', 'pdf', 'print'
                ],
                // Enable responsive extension
                responsive: true
            });
        
            $(".customer_profile").on("click", "a", function(event) {
                event.preventDefault()
                deleteLS("customer")
                saveLS("customer", $(this).attr("id"))
                window.location.href = webUrl + "profile/customer"
            })

        })
        .catch(error => {
            console.log(error)
        })
    })