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
#http://127.0.0.1:5000


@app.route("/")
def dashboard():
    """This method will fetch dashboard page"""
    return render_template("dashboard.html", cache_id= uuid4())

@app.route("/register/customer")
def create_customer():
    """This method will fetch html page for customer creation"""
    return render_template("create_customer.html", cache_id= uuid4())

@app.route("/create/order")
def create_order():
    """This method will fetch create_order html page"""
    return render_template("create_order.html", cache_id= uuid4())

@app.route("/create/product")
def create_product():
    """This method will fetch create_product html page"""
    return render_template("create_product.html", cache_id= uuid4())

@app.route("/register/company")
def create_company():
    """This will fetch the company_register page"""
    return render_template("company_register.html", cache_id= uuid4())


@app.route("/login")
def login():
    """This will fetch the login page"""
    return render_template("login.html", cache_id= uuid4())


@app.route("/profile")
def profile():
    """This will fetch the profile page"""
    return render_template("profile.html", cache_id= uuid4())


if __name__ == "__main__":
    host = environ.get("API_HOST1")
    port = environ.get("API_PORT1")
    app.run(host=host, port=port, debug=True)