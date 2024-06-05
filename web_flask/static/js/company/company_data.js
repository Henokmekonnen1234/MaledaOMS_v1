#!/usr/bin/env node

$(function() {
    var data_table = $("#example")
    data_table.find("tbody").empty()    
    let row = $("<tr>")
            row.append($("<th>").text("#2457"))
            row.append($("<td>").text("Brandon Jacob"))
            row.append($("<td>").text("At praesentium minu"))
            row.append($("<td>").text("$64"))
            row.append($("<td>").text("Approved"))
        data_table.find("tbody").append(row)
        console.log("appended done")

        $('#example').DataTable({
                destroy: true, // Destroy existing DataTable before creating a new one
                paging: true,
                
                buttons: [
                    'csv', 'excel', 'pdf', 'print'
                ],
                responsive: true
            });
})