#!/usr/bin/env node

import { ajax_request } from "../requests.js";
import { apiUrl, webUrl } from "../constants.js";
import { saveLS, getLS, deleteLS } from "../cookies.js";

$('#add-item').on('click', function() {
    // Create a new row
    const newRow = $('<div>').addClass('row g-3 item-row');

    // Create the Item column
    const itemCol = $('<div>').addClass('col-md-5');
    const itemLabel = $('<label>').attr('for', 'inputState').addClass('form-label').text('Item');
    const itemSelect = $('<select>').addClass('form-select');
    const option1 = $('<option>').text('Choose...').attr('selected', true);
    const option2 = $('<option>').text('...');
    itemSelect.append(option1).append(option2);
    itemCol.append(itemLabel).append(itemSelect);
    newRow.append(itemCol);

    // Create the Quantity column
    const quantityCol = $('<div>').addClass('col-md-5');
    const quantityLabel = $('<label>').attr('for', 'inputState').addClass('form-label').text('Quantity');
    const quantityInput = $('<input>').attr('type', 'number').addClass('form-control');
    quantityCol.append(quantityLabel).append(quantityInput);
    newRow.append(quantityCol);

    // Create the Remove button column
    const removeCol = $('<div>').addClass('col-md-2 d-flex align-items-end');
    const removeButton = $('<button>')
        .attr('type', 'button')
        .addClass('btn btn-danger btn-remove')
        .append($('<i>').addClass('bi bi-trash'));
    removeCol.append(removeButton);
    newRow.append(removeCol);

    // Append the new row to the container
    $('#item-container').append(newRow);
});

// Handle the remove button click event
$(document).on('click', '.btn-remove', function() {
    $(this).closest('.item-row').remove();
});
