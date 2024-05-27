#!/usr/bin/env python3

from api.v1.views import app_views
from api.v1.views.utility import not_found, error_data
from flask import request, jsonify
from models import storage
from models.order_process import OrderProcess
from flask_jwt_extended import jwt_required, get_jwt_identity


@app_views.route("/orderprocess", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_order_process():
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        order_proc = [value.to_dict()
                      for value in storage.all(OrderProcess).values()]
        if order_proc:
            return jsonify(order_proc)
        else:
            return jsonify(not_found), 404
    except Exception as e:
        return jsonify(error_data), 505