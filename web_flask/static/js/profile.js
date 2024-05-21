#!/usr/bin/env node

import { ajax_request } from "./requests.js";
import { apiUrl, webUrl } from "./constants.js";
import { getLS, deleteLS } from "./cookies.js";

$(function(){
    ajax_request(apiUrl + "company", "GET", getLS("company"),
             "application/json",  JSON.stringify({}))
.then(response => {
    $(".username").text(response.name)
    $(".description").text(response.description)
    $(".address").text(response.address)
    $(".phone_no").text(response.phone_no)
    $(".email").text(response.email)

    $(".username").val(response.name)
    $(".description").val(response.description)
    $(".address").val(response.address)
    $(".phone_no").val(response.phone_no)
    $(".email").val(response.email)
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
    window.location.href = webUrl + "login"
    console.log(error)
})

    $("#login").on("click", function(event) {
        event.preventDefault()
        deleteLS("company")
        window.location.href = webUrl + "login"
    })
})
