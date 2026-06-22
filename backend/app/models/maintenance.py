"""Maintenance Record model"""
import uuid
from datetime import datetime, date
from sqlalchemy import Column, String, Integer, Text, DateTime, Date, Float, Boolean, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base


class MaintenanceRecord(Base):
    __tablename__ = "maintenance_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id"))
    equipment_name = Column(String(500))
    equipment_id = Column(String(200))
    failure_type = Column(String(200))
    failure_date = Column(Date)
    severity = Column(String(50))
    root_cause = Column(Text)
    action_taken = Column(Text)
    downtime_hours = Column(Float)
    cost_estimate = Column(Float)
    is_recurring = Column(Boolean, default=False)
    status = Column(String(50), default="resolved")
    metadata_ = Column("metadata", JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)
