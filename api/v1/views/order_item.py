#!/usr/bin/env python3

from flask import request, jsonify
from api.v1.views import app_views
from api.v1.views.utility import not_found, error_data
from models import storage
from models.order_item import OrderItem
from flask_jwt_extended import jwt_required, get_jwt_identity


@app_views.route("/orderitem", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_order_product():
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        order_item = [value.to_dict()
                      for value in storage.all(OrderItem).values()]
        if order_item:
            return jsonify(order_item)
        else:
            return jsonify(not_found), 404
    except Exception as e:
        return jsonify(e), 505
    

# @app_views.route("/orderitem/<id>", methods=["GET"], strict_slashes=False)
# @jwt_required()
# def get_ordder_product(id: str):
#     try:
#         comp_id = get_jwt_identity()
#         if not comp_id:
#             return jsonify(not_found), 401
#         order_item = storage.filter(OrderItem, "order_id", id)

#         if order_item:
#             return jsonify(order_item)
#         else:
#             return jsonify(not_found), 404
#     except Exception as e:
#         return jsonify(e), 505