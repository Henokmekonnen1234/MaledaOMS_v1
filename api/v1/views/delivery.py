#!/usr/bin/env node

from api.v1.views import app_views
from api.v1.views.utility import not_found, error_data
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.delivery import Delivery
from models import storage


@app_views.route("/delivery", methods=["GET"], strict_slashes=False)
@jwt_required()
def delivery_list():
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        delivery_list = [value.to_dict()
                         for value in storage.all(Delivery).values()]
        if not delivery_list:
            return jsonify(not_found), 404
        return jsonify(delivery_list)
    except Exception as e:
        print(e)
        return jsonify(not_found), 505


@app_views.route("/delivery/<id>", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_delivery_id(id :str):
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        if not id:
            return jsonify(not_found), 404
        delivery = storage.get(Delivery, id)
        if not delivery:
            return jsonify(not_found), 404
        return jsonify(delivery.to_dict())
    except Exception as e:
        return jsonify(error_data), 505


@app_views.route("/delivery/<id>", methods=["PUT"], strict_slashes=False)
@jwt_required()
def update_delivery_id(id: str):
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        if not id:
            return jsonify(not_found), 404
        delivery = storage.get(Delivery, id)
        if not delivery:
            return jsonify(not_found), 404
        update_delivery = request.form.to_dict()
        if not update_delivery:
            return jsonify(not_found), 404
        for key, value in update_delivery.items():
            setattr(delivery, key, value)
        delivery.save()
        return jsonify(delivery.to_dict())
    except Exception as e:
        return jsonify(error_data), 505