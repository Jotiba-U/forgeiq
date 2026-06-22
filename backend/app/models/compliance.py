"""Compliance Record model"""
import uuid
from datetime import datetime, date
from sqlalchemy import Column, String, Text, DateTime, Date, Float, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from app.database import Base


class ComplianceRecord(Base):
    __tablename__ = "compliance_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id"))
    regulation = Column(String(500))
    requirement = Column(Text)
    status = Column(String(50))  # compliant, non_compliant, partial, missing
    evidence_document_ids = Column(ARRAY(UUID(as_uuid=True)))
    gap_description = Column(Text)
    risk_level = Column(String(50))
    due_date = Column(Date)
    category = Column(String(200))
    metadata_ = Column("metadata", JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)
