#!/usr/bin/env node

from api.v1.views import app_views
from flask import request, jsonify
from api.v1.views.utility import not_found, save_file, error_data
from models.inventory import Inventory
from models import storage
from flask_jwt_extended import jwt_required, get_jwt_identity


@app_views.route("/inventory", methods=["POST"], strict_slashes=False)
@jwt_required()
def add_product():
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 404
        invent_data = request.form.to_dict()
        if invent_data:
            invent_data["company_id"] = comp_id
            if 'image' in request.files and request.files['image']:
                invent_data['image'] = save_file(request.files['image'])
            inventory = Inventory(**invent_data)
            return jsonify({"inventory": inventory.to_dict()})
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
            return jsonify(not_found), 404
        inventory = [value.to_dict() for value in\
                          storage.all(Inventory).values()]
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
            return jsonify(not_found), 404
        if not id:
            return jsonify(not_found), 404
        inventory = storage.get(Inventory, id)
        if inventory:
            return jsonify(inventory.to_dict())
        else:
            return jsonify(not_found), 404
    except Exception as e:
        return jsonify(error_data), 505