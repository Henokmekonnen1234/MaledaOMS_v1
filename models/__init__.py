#!/usr/bin/python3
"""
This file will initialize the models package
"""
from models.engine.db_storage import DBStorage
storage = DBStorage()
storage.reload()