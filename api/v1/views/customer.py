#!/usr/bin/env python3

from api.v1.views import app_views
from flask import request, jsonify 
from api.v1.views.utility import not_found, error_data, internal_error
from models import storage
from models.customer import Customer
from flask_jwt_extended  import create_access_token, get_jwt_identity, jwt_required


@app_views.route("/customer", methods=["POST"], strict_slashes=False)
@jwt_required()
def reg_customer():
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 404
        if not id:
            return jsonify(not_found), 404
        cust_data = request.form.to_dict()
        print(cust_data)
        if not comp_id:
            return jsonify(not_found), 401
        if not cust_data:
            return jsonify(error_data), 404
        cust_data["company_id"] = comp_id
        customer = Customer(**cust_data)
        customer.save()
        return jsonify({"customer": customer.to_dict()})
    except Exception as e:
        print(e)
        return jsonify(internal_error), 404


@app_views.route("/customer", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_customer():
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        customer = [
            value.to_dict() for _, value in storage.all(Customer).items()\
            if value.company_id == comp_id
            ]
        
        return jsonify({"customer": customer})

    except Exception as e:
        print(e)
        return jsonify(internal_error), 404


@app_views.route("/customer/<id>", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_customer_id(id: str):
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        if not id:
            return jsonify(not_found), 401
        customer = storage.get(Customer, id)
        if customer and customer.company_id == comp_id:
            return jsonify({"customer": customer.to_dict()})
        else:   
            return jsonify(not_found), 401

    except Exception as e:
        print(e)
        return jsonify(internal_error), 404

@app_views.route("/customer/<id>", methods=["PUT"], strict_slashes=False)
@jwt_required()
def update_customer(id: str):
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        if not id:
            return jsonify(not_found), 404
        update_value = request.form.to_dict()
        if not update_value:
            return jsonify(not_found), 404
        customer = storage.get(Customer, id)
        if customer and customer.company_id == comp_id:
            for key, value in update_value.items():
                setattr(customer, key, value)
            customer.save()
            return jsonify({"customer": customer.to_dict()})
        else:
            return jsonify(not_found), 401
    except Exception as e:
        print(e)
        return jsonify(not_found), 404


@app_views.route("/customer/<id>", methods=["DELETE"], strict_slashes=False)
@jwt_required()
def delete_customer(id: str):
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        if not id:
            return jsonify(not_found), 404
        customer = storage.get(Customer, id)
        if not customer:
            return jsonify(not_found), 401
        else:
            storage.delete(customer)
            storage.save()
            return jsonify({"success": "Customer deleted"})
    except Exception as e:
        return jsonify(not_found), 505
