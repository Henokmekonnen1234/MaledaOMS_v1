#!/usr/bin/env python3

from api.v1.views import app_views
from api.v1.views.utility import not_found, error_data
from api.v1.views.utility import generate_transaction_number
from datetime import datetime, timezone
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import storage
from models.customer import Customer
from models.delivery import Delivery
from models.inventory import Inventory
from models.order_item import OrderItem
from models.order_process import OrderProcess
from models.order import Order
import json


@app_views.route("/order", methods=["POST"], strict_slashes=False)
@jwt_required()
def create_order():
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401

        order_data = request.form.to_dict()
        if not order_data:
            return jsonify(not_found), 404

        cust_keys = ["full_name", "telegram", "phone_no", "city", "address"]
        cust_data = {key: order_data.pop(key) for key in cust_keys}
        cust_data["company_id"] = comp_id
        customer = Customer(**cust_data)
        customer.save()

        prod_value = json.loads(order_data.pop("prod_value"))
        order_data["cus_id"] = customer.id
        order_data["txn_no"] = generate_transaction_number()
        order_data["company_id"] = comp_id
        order_data["total_amnt"] = 0.0

        for key, value in prod_value.items():
            inventory = storage.get(Inventory, key)
            quantity = int(value)
            prod_value[key] = quantity
            order_data["total_amnt"] += inventory.price * quantity
            inventory.quantity -= quantity
            inventory.save()

        order = Order(**order_data)
        order.save()

        order_items = []
        for key, value in prod_value.items():
            order_item_data = {"order_id": order.id, "prod_id": key, "quantity": value}
            order_item = OrderItem(**order_item_data)
            order_item.save()
            order_items.append(order_item.to_dict())

        order_process = OrderProcess(order_id=order.id)
        delivery = Delivery(order_id=order.id, location=cust_data["address"])
        order_process.save()
        delivery.save()

        return jsonify(order.to_dict())

    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify(error_data), 505



@app_views.route("/order/<id>", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_order_id(id: str = ""):
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        if not id:
            return jsonify(not_found), 404
        order = storage.get(Order, id)
        if not order:
            return jsonify(not_found), 404
        if order.company_id == comp_id:
            order_proces = storage.filter(OrderProcess, "order_id", order.id)
            order_item = storage.filter_all(OrderItem, "order_id", order.id)
            order_prod = []
            for value in storage.all(OrderItem).values():
                if order.id == value.order_id:
                    order_prod.append(value.to_dict())
            delivery = storage.filter(Delivery, "order_id", order.id)
            return jsonify(
                {
                    "order": order.to_dict(),
                    "order_prod": order_prod,
                    "order_proces": order_proces.to_dict(),
                    "delivery": delivery.to_dict()
                }
            )
        else:
            return jsonify(not_found), 404
    except Exception as e:
        return jsonify(error_data), 505


@app_views.route("/order", methods=["GET"], strict_slashes=False)
@jwt_required()
def get_order():
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        order = [value.to_dict()
                 for value in storage.all(Order).values()
                 if value.company_id == comp_id]
        if order:
            return jsonify(order)
        else:
            return jsonify(not_found), 404
    except Exception as e:
        return jsonify(error_data), 505


@app_views.route("/order/<id>", methods=["PUT"], strict_slashes=False)
@jwt_required()
def update_order_id(id: str):
    try:
        comp_id = get_jwt_identity()
        if not comp_id:
            return jsonify(not_found), 401
        if not id:
            return jsonify(not_found), 404

        order = storage.get(Order, id)
        if not order:
            return jsonify(not_found), 404

        update_order = request.form.to_dict()
        if "prod_value" not in update_order:
            return jsonify({"error": "Product values not provided"}), 400

        order_prod = json.loads(update_order.pop("prod_value"))

        if "process_status" in update_order:
            process = storage.filter(OrderProcess, "order_id", order.id)
            if process:
                setattr(process, "process_status", update_order.pop("process_status"))
                setattr(process, "process_date", datetime.now(timezone.utc))
                process.save()

        for key, value in update_order.items():
            setattr(order, key, value)
        order.save()

        order.total_amnt = 0
        order_prod_dict = {key: value for key, value in order_prod.items()}
        existing_order_products = storage.filter_all(OrderItem, "order_id", id)

        for product in existing_order_products:
            if product.prod_id not in order_prod_dict:
                inventory = storage.get(Inventory, product.prod_id)
                inventory.quantity += product.quantity
                inventory.save()
                storage.delete(product)
                storage.save()

        for product in existing_order_products:
            if product.prod_id in order_prod_dict:
                inventory = storage.get(Inventory, product.prod_id)
                if product.quantity != int(order_prod_dict[product.prod_id]):
                    inventory.quantity += product.quantity
                    inventory.quantity -= int(order_prod_dict[product.prod_id])
                    inventory.save()
                    product.quantity = int(order_prod_dict[product.prod_id])
                    product.save()
                order.total_amnt += (inventory.price * int(order_prod_dict[product.prod_id]))
                print(order.total_amnt)
                order.save()
                order_prod_dict.pop(product.prod_id)

        for prod_id, quantity in order_prod_dict.items():
            order_item_data = {"order_id": order.id, "prod_id": prod_id, "quantity": int(quantity)}
            new_order_item = OrderItem(**order_item_data)
            new_order_item.save()
            inventory = storage.get(Inventory, prod_id)
            inventory.quantity -= int(quantity)
            order.total_amnt += (inventory.price * int(quantity))
            print(order.total_amnt)
            order.save()
            inventory.save()

        return jsonify(order.to_dict())

    except Exception as e:
        print(e)
        return jsonify(error_data), 505