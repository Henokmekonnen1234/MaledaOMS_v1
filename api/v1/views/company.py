#!/usr/bin/env python3

from api.v1.views import app_views
from flask import request, jsonify, current_app, abort 
from api.v1.views.utility import not_found, save_file, delete_file
from models import storage
from  models.company import Company
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import json

@app_views.route("/company", methods=["POST"], strict_slashes=False)
def create_company():
    try:
        comp_dict = request.get_json()
        # name = request.form.get("name")
        # email =  request.form.get("email")
        # password = request.form.get("password")
        # phone_no = request.form.get("phone_no")
        # comp_dict = {
        #     "name": name,
        #     "email": email,
        #     "password": password,
        #     "phone_no": phone_no
        # }
        print(comp_dict)
        print(type(comp_dict))
        if not comp_dict:
            return jsonify(not_found), 404
        else:
            instance = Company(**comp_dict)
            instance.save()
            print(instance.to_dict())
            return jsonify(instance.to_dict())
    except Exception as e:
        print(e)
        return jsonify(not_found), 404
    

@app_views.route("/company", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_company():
    try:
        comp_id = get_jwt_identity()
        company = storage.get(Company, comp_id)
        return jsonify(company.to_dict())
    except Exception as e:
        print(e)
        return jsonify(not_found), 404


@app_views.route("/company", methods=["PUT"], strict_slashes=False)
@jwt_required()
def update_company(id: str = None):
    try:
        comp_id = get_jwt_identity()
        company = storage.get(Company, comp_id)
        print("company ", company)
        if company:
            up_data = request.form.to_dict()
            if 'image' in request.files and request.files['image']:
                up_data['image'] = save_file(request.files['image'])
            for key, value in up_data.items():
                if key == "__class__" or key == "id" or  key ==\
                    "created_date" or key == "updated_date":
                    pass
                else:
                    setattr(company, key, value)
            company.save()
            return jsonify(company.to_dict())
        else:
            print(" data from", up_data)
            return jsonify(not_found), 404
    except Exception as e:
        print(e)
        return jsonify(not_found), 404


@app_views.route("/company/<id>", methods=["DELETE"], strict_slashes=False)
@jwt_required()
def delete_company(id: str=None):
    company = storage.get(Company, id)
    if company:
        storage.delete(company)
        storage.save()
        return jsonify("Successfully deleted")
    else:
        return jsonify(not_found), 404


@app_views.route("/login", methods=["POST"], strict_slashes=False)
def login():
    
    get_value = request.get_json()
    value = storage.filter(Company, "email", get_value["email"])
    if value:
        return jsonify(
            {
                "company": value.to_dict(),
                "token": create_access_token(identity=value.id)
            }
        )
    else:
        return jsonify(not_found), 401