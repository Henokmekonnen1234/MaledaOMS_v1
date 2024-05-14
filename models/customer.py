#!/usr/bin/env python3
"""
This module will connect customer class with database
"""

from sqlalchemy import Column, String, ForeignKey
from models.order import Order
from sqlalchemy.orm import relationship
from models.base_model import Base, BaseModel


class Customer(BaseModel, Base):
    """
    Represents a customer entity with attributes such as full name, contact information, and associated company ID.
    
    Attributes:
        full_name (str): The full name of the customer.
        telegram (str): The Telegram username of the customer (if available).
        phone_no (str): The phone number of the customer.
        address (str): The address of the customer.
        city (str): The city where the customer resides.
        company_id (str): The ID of the associated company.
    """
    __tablename__ = "customer"
    full_name = Column(String(100), nullable=False)
    telegram = Column(String(100), nullable=True)
    phone_no = Column(String(50), nullable=True)
    address = Column(String(100), nullable=True)
    city = Column(String(50), nullable=True)
    company_id = Column(String(60), ForeignKey("company.id"),
                        nullable=False)
    order = relationship("Order", backref="customer",
                         cascade="all, delete, delete-orphan")
    
    def __init__(self, *arg, **kwargs):
        super().__init__(*arg, **kwargs)