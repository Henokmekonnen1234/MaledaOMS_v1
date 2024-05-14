#!/usr/env/bin python3
"""
This module will connect with database through sqlalchemy
"""

from models.base_model import BaseModel, Base
from models.customer import Customer
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class Company(BaseModel, Base):
    """
    Represents a company entity with attributes such as name, contact information, and description.

    Attributes:
        name (str): The name of the company.
        email (str): The email address of the company.
        phone_no (str): The phone number of the company.
        address (str): The address of the company.
        description (str): A description of the company.
        customer (relationship): A relationship with the Customer class, indicating customers associated with this company.
    """
    __tablename__ = "company"
    image = Column(String(100), nullable=True)
    name = Column(String(50), unique=True, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    phone_no = Column(String(20), unique=True, nullable=False)
    address = Column(String(100), nullable=True)
    description = Column(String(1000),nullable=True)
    customer = relationship("Customer", backref="company",
                            cascade="all, delete, delete-orphan")
    
    def __init__(self, *arg, **kwargs):
        super().__init__(*arg, **kwargs)