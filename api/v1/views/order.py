#!/usr/bin/env python3

from api.v1.views import app_views
from api.v1.views.utility import not_found, error_data
from api.v1.views.utility import generate_transaction_number
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import storage
from models.delivery import Delivery
from models.inventory import Inventory
from models.order_item import OrderItem
from models.oder_process import OrderProcess
from models.order import Order
import json


@app_views.route("/order", methods=["POST"], strict_slashes=False)
@jwt_required()
def get_order():
    try:
        order_data = request.form.to_dict()
        prod_value = json.loads(order_data["prod_value"])
        order_data["txn_no"] = generate_transaction_number()
        delivery_add = {"location": order_data["address"]}
        del order_data["prod_value"]
        del order_data["address"]
        order_data["total_amnt"] = 0.0
        for key, value in prod_value.items():
            inventory = storage.get(Inventory, key)
            prod_value[key] = int(value)
            order_data["total_amnt"] += (inventory.price * prod_value[key])
            inventory.quantity -= prod_value[key]
            inventory.save()
        order = Order(**order_data)
        order.save()
        order_prod = []
        for key, value in prod_value.items():
            order_item = {}
            order_item["order_id"] = order.id
            order_item["prod_id"] = key
            order_item["quantity"] = value
            order_i = OrderItem(**order_item)
            order_i.save()
            order_prod.append(order_i.to_dict())
        order_p = {"order_id": order.id}
        order_pro = OrderProcess(**order_p)
        delivery_add = {"order_id": order.id}
        delivery = Delivery(**delivery_add)
        order_pro.save()
        delivery.save()
        return jsonify(order.to_dict())
    except Exception as e:
        return jsonify(e)