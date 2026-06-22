"""Document & DocumentChunk models"""
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, BigInteger, Text, DateTime, Float, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship
from app.database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    filename = Column(String(500), nullable=False)
    original_filename = Column(String(500))
    file_type = Column(String(50))
    file_size = Column(BigInteger)
    category = Column(String(100))  # SOP, Maintenance Report, Audit, Inspection, etc.
    status = Column(String(50), default="processing")
    page_count = Column(Integer)
    upload_date = Column(DateTime, default=datetime.utcnow)
    processed_date = Column(DateTime)
    summary = Column(Text)
    tags = Column(ARRAY(String))
    metadata_ = Column("metadata", JSON, default={})
    classification_confidence = Column(Float)

    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")

    created_at = Column(DateTime, default=datetime.utcnow)


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id", ondelete="CASCADE"))
    chunk_index = Column(Integer)
    content = Column(Text, nullable=False)
    page_number = Column(Integer)
    section_title = Column(String(500))
    embedding_id = Column(String(200))
    metadata_ = Column("metadata", JSON, default={})

    document = relationship("Document", back_populates="chunks")

    created_at = Column(DateTime, default=datetime.utcnow)
