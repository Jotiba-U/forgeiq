"""Lessons Learned model"""
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from app.database import Base


class LessonLearned(Base):
    __tablename__ = "lessons_learned"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(500))
    incident_type = Column(String(200))
    description = Column(Text)
    root_cause = Column(Text)
    corrective_actions = Column(ARRAY(String))
    preventive_actions = Column(ARRAY(String))
    affected_equipment = Column(ARRAY(String))
    affected_locations = Column(ARRAY(String))
    severity = Column(String(50))
    recurrence_count = Column(Integer, default=1)
    source_document_ids = Column(ARRAY(UUID(as_uuid=True)))
    pattern_id = Column(String(200))
    recommendations = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
