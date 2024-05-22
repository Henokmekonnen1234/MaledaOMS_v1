#!/usr/bin/env node

from api.v1.views import app_views
from flask import request, jsonify
from api.v1.views.utility import not_found, save_file, error_data
from api.v1.views.utility import delete_file
from models.inventory import Inventory
from models import storage
from flask_jwt_extended import jwt_required, get_jwt_identity
import os


@app_views.route("/inventory", methods=["POST"], strict_slashes=False)
@jwt_required()
def add_product():
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        invent_data = request.form.to_dict()
        if invent_data:
            invent_data["company_id"] = comp_id
            if 'image' in request.files and request.files['image']:
                invent_data['image'] = save_file(request.files['image'])
            inventory = Inventory(**invent_data)
            inventory.save()
            print(inventory)
            return jsonify(inventory.to_dict())
        else:
            return jsonify(not_found), 404
    except Exception as e:
        return jsonify(error_data), 505


@app_views.route("/inventory", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_products():
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        inventory = [value.to_dict() for value in\
                     storage.all(Inventory).values()
                     if value.company_id == comp_id]
        if inventory:
            return jsonify(inventory)
        else:
            return jsonify(not_found), 404
    except Exception as e:
        return jsonify(error_data), 505


@app_views.route("/inventory/<id>", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_product_id(id: str):
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        if not id:
            return jsonify(not_found), 404
        inventory = storage.get(Inventory, id)
        if inventory:
            return jsonify(inventory.to_dict())
        else:
            return jsonify(not_found), 404
    except Exception as e:
        print(e)
        return jsonify(error_data), 505


@app_views.route("inventory/<id>", methods=["PUT"], strict_slashes=False)
@jwt_required()
def update_product(id: str):
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        if not id:
            return jsonify(not_found), 404
        inventory = storage.get(Inventory, id)
        invent_data = request.form.to_dict()
        if 'image' in request.files and request.files['image']:
                invent_data['image'] = save_file(request.files['image'])
                image_file = os.path.basename(inventory.image)
                if image_file:
                    delete_file(image_file)
        for key, value in invent_data.items():
            if key == "__class__" or key == "id" or  key ==\
                    "created_date" or key == "updated_date":
                pass
            else:
                setattr(inventory, key, value)
        inventory.save()
        return jsonify(inventory.to_dict())
    except Exception as e:
        return jsonify(error_data), 505


@app_views.route("/inventory/<id>", methods=["DELETE"], strict_slashes=False)
@jwt_required()
def delete_product(id: str):
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        if not id:
            return jsonify(not_found), 404
        inventory = storage.get(Inventory, id)
        if inventory:
            image_file = os.path.basename(inventory.image)
            if image_file:
                delete_file(image_file)
            storage.delete(inventory)
            storage.save()
            return jsonify({"success": "Deleted"})
        else:
            return jsonify(not_found), 404
    except Exception as e:
        return jsonify(error_data), 505