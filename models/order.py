#!/usr/bin/env python3
"""
This module will connect Order class to database
"""

from datetime import datetime, timezone
from models.base_model import BaseModel, Base
from models.delivery import Delivery
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy import Float
from sqlalchemy.orm import relationship

class Order(BaseModel, Base):
    """
    Represents an order entity with attributes such as transaction number, customer ID, order date, and total amount.

    Attributes:
        txn_no (str): The transaction number of the order.
        cus_id (str): The ID of the customer placing the order.
        OrderDate (DateTime): The date and time when the order was placed.
        Total_amnt (float): The total amount of the order.
    """
    __tablename__ = "order"
    txn_no = Column(String(100), nullable=False)
    cus_id = Column(String(60), ForeignKey("customer.id"),
                    nullable=False)
    order_date = Column(DateTime, default=datetime.now(timezone.utc),
                       nullable=False)
    total_amnt = Column(Float, default=0.0, nullable=False)
    status = Column(String(100), default="Processing", nullable=False)
    delivery = relationship("Delivery", backref="order",
                            cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)