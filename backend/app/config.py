"""
ForgeIQ - Industrial Knowledge Intelligence Platform
Configuration Settings
"""
from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "ForgeIQ"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    SECRET_KEY: str = "forgeiq-hackathon-secret-key-2026"

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/forgeiq"
    DATABASE_SYNC_URL: str = "postgresql://postgres:postgres@localhost:5432/forgeiq"

    # ChromaDB
    CHROMA_PERSIST_DIR: str = "./chroma_data"
    CHROMA_COLLECTION_NAME: str = "forgeiq_documents"

    # Google Gemini
    GOOGLE_API_KEY: Optional[str] = None

    # File Upload
    UPLOAD_DIR: str = "./uploads"
    MAX_FILE_SIZE_MB: int = 50

    # CORS
    FRONTEND_URL: str = "http://localhost:3000"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
