#!/usr/bin/env python3
"""
This module will connect Inventory class with database
"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey


class Inventory(BaseModel, Base):
    """
    Represents an inventory entity with attributes such as product, category, and quantity.

    Attributes:
        product (str): The name of the product in inventory.
        category (str): The category of the product (optional).
        quantity (int): The quantity of the product in inventory.
    """
    __tablename__ = "inventory"
    product = Column(String(50), nullable=False)
    catagory = Column(String(100), nullable=True)
    quantity = Column(Integer, nullable=False)
    comp_id = Column(String(60), ForeignKey("company.id"),
                     nullable=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)