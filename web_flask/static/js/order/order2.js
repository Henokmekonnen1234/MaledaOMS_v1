$(function() {
    let conunt = 0;   
$('#add-item').on('click', function() {
    // Create a new row
    const newRow = $('<div>').addClass('row g-3 item-row');
    conunt = conunt + 1
    // Create the Item column
    const itemCol = $('<div>').addClass('col-md-5');
    const itemLabel = $('<label>').attr('for', `proud_id_${conunt}`).addClass('form-label').text('Item');
    const itemSelect = $('<select>').addClass('form-select').attr("id", `proud_id_${conunt}`);
    const option1 = $('<option>').text('Choose...').attr('selected', true);
    const option2 = $('<option>').text('abado').attr('value', 'abado');
    const option3 = $('<option>').text('cloth').attr('value', 'cloth');
    const option4 = $('<option>').text('baby pow').attr('value', 'baby pow');
    const option5 = $('<option>').text('food').attr('value', 'food');
    itemSelect.append(option1).append(option2).append(option3).append(option4).append(option5);
    itemCol.append(itemLabel).append(itemSelect);
    newRow.append(itemCol);

    // Create the Quantity column
    const quantityCol = $('<div>').addClass('col-md-5');
    const quantityLabel = $('<label>').attr('for',  `quantity_${conunt}`).addClass('form-label').text('Quantity');
    const quantityInput = $('<input>').attr('type', 'number').addClass('form-control').attr("id", `quantity_${conunt}`);
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


$('#order-form').on('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    //
    // formData.append('cust_id', $('#cust_id').val());
    // formData.append('address', $('#address').val());
    
    // $('#item-container').each(function() {
    //     formData.append('item[]', $(this).val());
    // });

    // $('.quantity-input').each(function() {
    //     formData.append('quantity[]', $(this).val());
    // });
    formData.append('prod_quantity', $("#item-container").serializeArray());
    $('#item-container').each(function() {
    //     const prodId = $(this).find('select.item-select').val();
    //     const quantity = $(this).find('input.quantity-input').val();
    //     formData.append('item' + conunt, prodId);
    //     formData.append('quantity' + conunt, quantity);
        //conunt = conunt + 1
        console.log(this)
     });
    // Display form data for debugging
    console.log("pressed")
    console.log( formData.cust_id)
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

});
})