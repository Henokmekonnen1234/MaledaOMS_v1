#!/usr/bin/env python3
"""
This module connects OrderItem class with database
"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer,  ForeignKey
from sqlalchemy import Float


class OrderItem(BaseModel, Base):
    """
    Represents an item within an order, linking a product from inventory to an order.

    Attributes:
        order_id (str): The ID of the order this item belongs to.
        prod_id (str): The ID of the product in inventory associated with this item.
        quantity (int): The quantity of the product ordered.
        price (float): The price of the product at the time of ordering.
    """
    __tablename__ = "order_item"
    order_id = Column(String(60), ForeignKey("order.id"),
                      nullable=False)
    prod_id = Column(String(60), ForeignKey("inventory.id"),
                     nullable=False)
    quantity = Column(Integer, nullable=True)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)