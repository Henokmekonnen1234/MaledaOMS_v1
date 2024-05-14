#!/usr/bin/env python3

from models import storage
from api.v1.views import app_views
from api.v1.views.utility import not_found
from flask import Flask, make_response, jsonify
from uuid import uuid4
from flask_cors import CORS
from os import environ
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager

load_dotenv()

app = Flask(__name__)
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
app.config["SECRET_KEY"] = str(uuid4())
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/api/v1/*/": {"origins": "*"}})
jwt = JWTManager(app)

@app.teardown_appcontext
def close_db(error):
    storage.close()


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify(not_found), 404)


if __name__ == "__main__":
    host = environ.get("API_HOST")
    port = environ.get("API_PORT")
    app.run(host=host, port=port, debug=True)