#!/usr/bin/env python3

from uuid import uuid4
import bcrypt
import os
import random
import string


not_found = {"error": "Data not_found"}
error_data = {"error": "Log in again please"}
internal_error = {"error": "Internal Error occured"}

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

def encrypt(value=None):
    """This method is used to encrypt strings"""
    if value:
        result = bcrypt.hashpw(value.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        return result
    else:
        return bcrypt.hashpw(b"None", bcrypt.gensalt()).decode("utf-8")

def decrypt(user_input=None, stored_hash=None):
    """This method will check if the user input matches the stored hash"""
    if user_input and stored_hash:
        return bcrypt.checkpw(user_input.encode("utf-8"), stored_hash.encode("utf-8"))
    else:
        return False

def taken_value(cls, **kwargs):
    """This method will check if the value is present in the saved
    object
    """
    obj = None
    if kwargs:
        for key, value in kwargs.items():
            if key == "name":
                obj = storage.filter(cls, key, value)
                if obj:
                    return f"{key} already present, change your {key}"
            elif key == "email":
                obj = storage.filter(cls, key, value)
                if obj:
                    return f"{key} already present, change your {key}"
            elif key == "phone_no":
                obj = storage.filter(cls, key, value)
                if obj:
                    return f"Phone number already present, change your phone number"
            elif key == "website":
                obj = storage.filter(cls, key, value)
                if obj:
                    return f"{key} already present, change your {key}"
            elif key == "description":
                obj = storage.filter(cls, key, value)
                if obj:
                    return f"{key} already present, change your {key}"
        return False
    else:
        return f"No value passed"
    
def generate_transaction_number(length=12):
    """Generate a transaction number with random letters and digits."""
    # Define the pool of characters (letters and digits)
    characters = string.ascii_letters + string.digits
    # Generate a random string of specified length from the pool of characters
    transaction_number = ''.join(random.choice(characters) for _ in range(length))
    return transaction_number