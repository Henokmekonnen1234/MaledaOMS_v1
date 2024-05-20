#!/usr/bin/env node

from api.v1.views import app_views
from flask import request, jsonify
from api.v1.views.utility import not_found, save_file
from models.inventory import Inventory
from models import storage
from flask_jwt_extended import jwt_required, get_jwt_identity


@app_views.route("/inventory", methods=["POST"], strict_slashes=False)
@jwt_required()
def add_product():
    try:
        