#!/usr/bin/env node

import { ajax_request } from "../requests.js"
import { apiUrl, webUrl } from "../constants.js"
import { getLS, saveLS, deleteLS } from "../cookies.js"

$(function() {
        ajax_request(apiUrl + "inventory", "GET", getLS("company"),
                      "application/json")
        .then(response => {
            var tbody = $("#customer-list") 
            tbody.empty()
            response.forEach(value => {
                let tr = $("<tr>")
                tr.append($("<td>").append($("<img>").addClass("table-img")
                                    .attr("src", `../../static/img/upload/${value.image}`)))
                tr.append($("<td>").text(value.product))
                tr.append($("<td>").text(value.quantity))
                tr.append($("<td>").text(`${value.price} BR`))
                tr.append($("<td>").text(value.catagory))
                tr.append($("<td>").append($("<a>")
                    .addClass("product_updt")
                    .addClass("btn btn-primary btn-sm")
                    .attr("href", "{{ url_for('update_product') }}")
                    .attr("id", `${value.id}`)
                    .append($("<i>").addClass("bi bi-upload")),
                    $("<a>").addClass("delete_product")
                    .addClass("btn btn-danger btn-sm")
                    .attr("href", "{{ url_for('update_product') }}")
                    .attr("id", `${value.id}`)
                    .append($("<i>").addClass("bi bi-trash"))))
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
        
            $(".product_updt").on("click", function(event) {
                event.preventDefault()
                deleteLS("product")
                saveLS("product", $(this).attr("id"))
                window.location.href = webUrl + "update/product"
            })

            $(".delete_product").on("click", function(event) {
                event.preventDefault()
                let product = $(this).attr("id")
                ajax_request(apiUrl + `inventory/${product}`, "DELETE",
                     getLS("company"))
                     .then(response =>{
                        deleteLS("product")
                        console.log(response.success)
                        window.location.href = webUrl + "list/product"
                    })
                     .catch(error => console.error(error))
            })

        })
        .catch(error => {
            console.log(error)
        })
    })