#!/usr/bin/env node

$(function() {
    var tbody = $("#customer-list")
            tbody.empty()
    let row = $("<tr>")
            row.append($("<th>").text("#2457"))
            row.append($("<td>").text("Brandon Jacob"))
            row.append($("<td>").text("At praesentium minu"))
            row.append($("<td>").text("$64"))
            row.append($("<td>").text("Approved"))
        tbody.append(row)
        console.log("appended done")
})