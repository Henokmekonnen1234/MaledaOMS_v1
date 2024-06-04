#!/usr/bin/env python3
"""
This python file will fetch the html, css and js
"""

from flask import Flask, render_template
from flask_cors import CORS
from uuid import uuid4
from dotenv import load_dotenv
from os import environ

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = str(uuid4())
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/")
def dashboard():
    """This method will fetch dashboard page"""
    return render_template("./company/dashboard.html", cache_id= uuid4())

@app.route("/register/customer")
def create_customer():
    """This method will fetch html page for customer creation"""
    return render_template("./customer/create_customer.html", cache_id= uuid4())

@app.route("/create/order")
def create_order():
    """This method will fetch create_order html page"""
    return render_template("./order/create_order.html", cache_id= uuid4())


@app.route("/order")
def order_page():
    """This method will fetch create_order html page"""
    return render_template("./order/order_page.html", cache_id= uuid4())


@app.route("/update/order")
def update_order():
    """This method will fetch create_order html page"""
    return render_template("./order/update_order.html", cache_id= uuid4())


@app.route("/list/order")
def order_list():
    """This method will fetch create_order html page"""
    return render_template("./order/order_list.html", cache_id= uuid4())


@app.route("/create/product")
def create_product():
    """This method will fetch create_product html page"""
    return render_template("./inventory/create_product.html", cache_id= uuid4())


@app.route("/update/product")
def update_product():
    """This will fetch the profile page"""
    return render_template("./inventory/update_product.html", cache_id= uuid4())


@app.route("/list/product")
def product_list():
    """This will fetch the profile page"""
    return render_template("./inventory/product_list.html", cache_id= uuid4())

@app.route("/register/company")
def create_company():
    """This will fetch the company_register page"""
    return render_template("./company/company_register.html", cache_id= uuid4())


@app.route("/login")
def login():
    """This will fetch the login page"""
    return render_template("login.html", cache_id= uuid4())


@app.route("/profile")
def profile():
    """This will fetch the profile page"""
    return render_template("./company/profile.html", cache_id= uuid4())


@app.route("/list/customer")
def customer_list():
    """This will fetch the profile page"""
    return render_template("./customer/customer_list.html", cache_id= uuid4())


@app.route("/profile/customer")
def customer_update():
    """This will fetch the profile page"""
    return render_template("./customer/customer_profile.html", cache_id= uuid4())


@app.route("/list/delivery")
def delivery_list():
    """This will fetch the profile page"""
    return render_template("./delivery/delivery_list.html", cache_id= uuid4())


@app.route("/update/delivery")
def update_delivery():
    """This will fetch the profile page"""
    return render_template("./delivery/update_delivery.html", cache_id= uuid4())


@app.route("/list/today-delivery")
def delivery_today_list():
    """This will fetch the profile page"""
    return render_template("./delivery/delivery_today_list.html", cache_id= uuid4())


if __name__ == "__main__":
    host = environ.get("API_HOST1")
    port = environ.get("API_PORT1")
    app.run(host=host, port=port, debug=True)