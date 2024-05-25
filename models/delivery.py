#!/usr/bin/env python3
"""
This connect Delivery class with the database
"""

from datetime import datetime
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, DateTime, ForeignKey


class Delivery(BaseModel, Base):

    __tablename__ = "delivery"
    order_id = Column(String(60), ForeignKey("order.id"), nullable=False)
    delivery_date = Column(DateTime, default=datetime.utcnow(),
                           nullable=True)
    delivery_status = Column(String(60), default="Pending", nullable=True)
    location = Column(String(60), nullable=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)