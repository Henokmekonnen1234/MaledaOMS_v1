#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { saveLS, getLS, deleteLS } from "../cookies.js";
import { formatDate } from "../date_format.js";

$(function() {
    let delivery_table = $("#example");

     $.when(
            ajax_request(apiUrl + `order`, "GET", getLS("company")),
            ajax_request(apiUrl + `customer`, "GET", getLS("company")),
            ajax_request(apiUrl + "delivery", "GET", getLS("company"))
        ).then((orderResponse, custResponse, delResponse) => {
            const orders = orderResponse;
            const customers = custResponse;
            const deliveries = delResponse;

            delivery_table.find("tbody").empty();

        deliveries.forEach(delivery => {
            const row = $("<tr>");
            let order = orders.find(order_data => order_data.id === delivery.order_id);
            let customer = customers.find(customer_data => customer_data.id === order.cus_id);
            row.append($("<td>").append(customer.full_name));
            row.append($("<td>").append(delivery.delivery_status));
            row.append($("<td>").append(delivery.location));
            row.append($("<td>").append(formatDate(delivery.delivery_date)));
            row.append($('<td>').append(
                $('<a>')
                    .addClass("order_info btn btn-primary btn-sm")
                    .attr("href", "#")
                    .attr("id", `${delivery.order_id}`)
                    .append($('<i>').addClass("bi bi-info-circle")),
                $('<a>')
                    .addClass("update_deliv btn btn-primary btn-sm")
                    .attr("href", "#")
                    .attr("id", `${delivery.id}`)
                    .append($('<i>').addClass("bi bi-upload")),
                $('<a>')
                    .addClass("delete_product btn btn-danger btn-sm")
                    .attr("href", "#")
                    .attr("id", `${delivery.id}`)
                    .append($('<i>').addClass("bi bi-trash"))
            ));
            delivery_table.find("tbody").append(row);
        });

        $('#example').DataTable({
            destroy: true, // Destroy existing DataTable before creating a new one
            paging: true,
            searching: true,
            buttons: [
                'csv', 'excel', 'pdf', 'print'
            ],
            responsive: true
        });
    

}).catch(error => console.error(error));


    $(document).on("click", ".filter-option", function(event) {
        event.preventDefault();
        const filter = $(this).data("filter");

        $.when(
            ajax_request(apiUrl + `order`, "GET", getLS("company")),
            ajax_request(apiUrl + `customer`, "GET", getLS("company")),
            ajax_request(apiUrl + "delivery", "GET", getLS("company"))
        ).then((orderResponse, custResponse, delResponse) => {
            const orders = orderResponse;
            const customers = custResponse;
            let deliveries = delResponse;

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            const currentDay = currentDate.getDate();
            console.log(filter)
            if (filter) {
                deliveries = deliveries.filter(delivery => {
                    const deliveryDate = new Date(delivery.delivery_date);
                    switch (filter) {
                        case "today":
                            return deliveryDate.getDate() === currentDay;
                        case "month":
                            return deliveryDate.getMonth() === currentMonth;
                        case "year":
                            return deliveryDate.getFullYear() === currentYear;
                        default:
                            return true;
                    }
                });
            }
            console.log(delivery_table.find("tbody").empty())
            delivery_table.find("tbody").hide();

            deliveries.forEach(delivery => {
                const row = $("<tr>");
                let order = orders.find(order_data => order_data.id === delivery.order_id);
                let customer = customers.find(customer_data => customer_data.id === order.cus_id);
                row.append($("<td>").append(customer.full_name));
                row.append($("<td>").append(delivery.delivery_status));
                row.append($("<td>").append(delivery.location));
                row.append($("<td>").append(formatDate(delivery.delivery_date)));
                row.append($('<td>').append(
                    $('<a>')
                        .addClass("order_info btn btn-primary btn-sm")
                        .attr("href", "#")
                        .attr("id", `${delivery.order_id}`)
                        .append($('<i>').addClass("bi bi-info-circle")),
                    $('<a>')
                        .addClass("update_deliv btn btn-primary btn-sm")
                        .attr("href", "#")
                        .attr("id", `${delivery.id}`)
                        .append($('<i>').addClass("bi bi-upload")),
                    $('<a>')
                        .addClass("delete_product btn btn-danger btn-sm")
                        .attr("href", "#")
                        .attr("id", `${delivery.id}`)
                        .append($('<i>').addClass("bi bi-trash"))
                ));
                delivery_table.find("tbody").append(row);
            });
    
            $('#example').DataTable({
                destroy: true, // Destroy existing DataTable before creating a new one
                paging: true,
                searching: true,
                buttons: [
                    'csv', 'excel', 'pdf', 'print'
                ],
                responsive: true
            });

        }).catch(error => console.error(error));
    });

    $(document).on("click", ".order_info", function(event) {
        event.preventDefault();
        deleteLS("order");
        saveLS("order", $(this).attr("id"));
        window.location.href = webUrl + "order";
    });

    $(document).on("click", ".update_deliv", function(event) {
        event.preventDefault();
        deleteLS("delivery");
        saveLS("delivery", $(this).attr("id"));
        window.location.href = webUrl + "update/delivery";
    });
});
