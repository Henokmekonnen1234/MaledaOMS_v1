#!/usr/bin/env python3
"""Flask blueprint"""

from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.company import *
from api.v1.views.customer import *
from api.v1.views.inventory import *
from api.v1.views.order import *
from api.v1.views.order_item import *
from api.v1.views.order_process import *
from api.v1.views.delivery import *