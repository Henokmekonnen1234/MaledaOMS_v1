#!/usr/bin/env node

import { ajax_request } from "./requests.js";
import { apiUrl, webUrl } from "./constants.js";
import { getLS } from "./cookies.js";

$(document).ready(function(){
    ajax_request(apiUrl + "company", "GET", getLS("company"),
             "application/json",  JSON.stringify({}))
.then(response => {
    $(".username").text(response.name)
    $(".description").text(response.description)
    $(".address").text(response.address)
    $(".phone_no").text(response.phone_no)
    $(".email").text(response.email)
    $("#name").val(response.name)
    $("#description").val(response.description)
    $("#address").val(response.address)
    $("#email").val(response.email);
    $("#phone_no").val(response.phone_no);
    if (response.image){
        $(".image").attr("src", "../static/img/upload/" + response.image)
    }
    console.log(response)
})
.catch(error => {
    const mainElement = document.querySelector('main');

    const newDivElement = document.createElement('div');
    newDivElement.textContent = 'Login again';

    mainElement.innerHTML = '';
    mainElement.appendChild(newDivElement);
    const loginLink = document.createElement('a');
    loginLink.classList.add('dropdown-item', 'd-flex', 'align-items-center');
    loginLink.href = `${webUrl}login`;
    loginLink.innerHTML = `
        <i class="bi bi-box-arrow-right"></i>
        <span>Login</span>
    `;
    // Set the link directly in the header
    document.getElementById('login').innerHTML = '';
    document.getElementById('login').appendChild(loginLink);
    console.log(error)
})
})
