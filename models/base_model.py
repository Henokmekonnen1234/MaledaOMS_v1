#!/usr/bin/env python3
"""
This modelue will do all task
"""

from datetime import datetime
import models
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from uuid import uuid4

time = "%Y-%m-%dT%H:%M:%S.%f"
Base = declarative_base()


class BaseModel:
    """This class is the base for all aother classes contain method for
       saving and changing to dictionary file

    Attributes:
        id (str): indentifying each object uniquely
        created_date (datetime): store created date of object
        update_date (datetime): store update date of object
    """

    id = Column(String(60), primary_key=True, nullable=False,
                unique=True)
    created_date = Column(DateTime, default=datetime.utcnow,
                          nullable=False)
    updated_date = Column(DateTime, default=datetime.utcnow,
                          nullable=False)

    def __init__(self, *args, **kwargs):
        """this method will initialize the basemodel"""
        if "id" not in kwargs.keys() and "updated_date"\
                not in kwargs.keys() and "__class__"  not in\
                 kwargs.keys():
            self.id = str(uuid4())
            self.created_date = datetime.utcnow()
            self.updated_date = self.created_date
            for key, value in kwargs.items():
                if "created_date" == key or "updated_date" == key:
                    value = datetime.strptime(value, time)
                setattr(self, key, value)
        elif kwargs:
            del kwargs["__class__"]
            for key, value in kwargs.items():
                if "created_date" == key or "updated_date" == key:
                    value = datetime.strptime(value, time)
                setattr(self, key, value)

    def save(self):
        """This will send the object to be saved"""
        self.updated_date = datetime.utcnow()
        models.storage.new(self)
        models.storage.save()

    def to_dict(self):
        """This method will change class instance to dictionary"""
        to_dict = self.__dict__.copy()
        to_dict["__class__"] = self.__class__.__name__
        if "created_date" in to_dict and\
                type(to_dict.get("created_date")) is not str:
            to_dict["created_date"] = to_dict["created_date"]\
                                            .strftime(time)
        if "updated_date" in to_dict and\
                type(to_dict.get("updated_date")) is not str:
            to_dict["updated_date"] = to_dict["updated_date"]\
                                            .strftime(time)
        if to_dict.get("_sa_instance_state"):
            del to_dict["_sa_instance_state"]
        #if "password" in to_dict:
            #del to_dict["password"]
        return to_dict

    def __str__(self):
        """This method will be used to represent the class in string
        format
        """
        return f"[{self.__class__.__name__}] ({self.id}) {self.__dict__}"

    def delete(self):
        """This method will delete the class"""
        models.storage.delete(self)
