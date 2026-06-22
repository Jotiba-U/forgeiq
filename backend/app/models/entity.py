"""Entity & Relationship models for Knowledge Graph"""
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, DateTime, Float, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from app.database import Base


class Entity(Base):
    __tablename__ = "entities"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(500), nullable=False)
    entity_type = Column(String(100), nullable=False)
    properties = Column(JSON, default={})
    document_ids = Column(ARRAY(UUID(as_uuid=True)))
    mention_count = Column(Integer, default=1)
    first_seen = Column(DateTime, default=datetime.utcnow)
    last_seen = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)


class Relationship(Base):
    __tablename__ = "relationships"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source_entity_id = Column(UUID(as_uuid=True), ForeignKey("entities.id"))
    target_entity_id = Column(UUID(as_uuid=True), ForeignKey("entities.id"))
    relationship_type = Column(String(200))
    properties = Column(JSON, default={})
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id"))
    confidence = Column(Float, default=0.8)
    created_at = Column(DateTime, default=datetime.utcnow)
