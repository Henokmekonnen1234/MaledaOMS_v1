#!/usr/bin/env python3

from uuid import uuid4
import os

not_found = {"error": "not_found"}

UPLOAD_FOLDER = "/home/drogo/MaledaOMS_v1/web_flask/static/img/upload"

def get_unique_filename(filename):
    """This method will generate a new name for the file"""
    file_extension = os.path.splitext(filename)[1]
    unique_filename = str(uuid4()) + file_extension
    return unique_filename

def save_file(file):
    """This method will save the file and return the path"""
    if file:
        file_name = get_unique_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, file_name)
        file.save(file_path)
        return f"{file_name}"
    else:
        return None

def delete_file(file):
    """This method will delete the file"""
    file_path = os.path.join(UPLOAD_FOLDER, file)
    if os.path.exists(file_path):
        os.remove(file_path)