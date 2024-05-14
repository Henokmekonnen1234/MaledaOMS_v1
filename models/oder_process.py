#!/usr/bin/env python3
"""
This module will connect OrderProcess class with database
"""

from datetime import datetime
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, DateTime, ForeignKey


class OrderProcess(BaseModel, Base):
    """
    Represents the processing status of an order.

    Attributes:
        order_id (str): The ID of the order being processed.
        process_date (DateTime): The date and time when the processing status was updated.
        process_status (str): The status of the order processing.
    """
    __tablename__ = "order_process"
    order_id = Column(String(60), ForeignKey("order.id"), nullable=False)
    process_date = Column(DateTime, default=datetime.utcnow(),
                          nullable=True)
    process_status = Column(String(60), nullable=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
