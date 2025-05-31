"""
Configuration management for Ki LangGraph backend
"""

import os
from functools import lru_cache
from typing import List

from pydantic import BaseSettings, validator


class Settings(BaseSettings):
    """Application settings"""
    
    # App settings
    DEBUG: bool = False
    ENVIRONMENT: str = "development"
    SECRET_KEY: str = "your-secret-key-change-in-production"
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/ki_db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # AI Model settings
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    DEFAULT_MODEL: str = "gpt-4"
    
    # Security
    ALLOWED_HOSTS: List[str] = ["localhost", "127.0.0.1", "0.0.0.0"]
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",  # Marketing site
        "http://localhost:3001",  # Ki app
        "http://localhost:3002",  # Admin
    ]
    
    # LangGraph settings
    LANGGRAPH_CHECKPOINTER: str = "redis"  # redis, memory, or postgres
    MAX_CONVERSATION_TURNS: int = 50
    CONVERSATION_TIMEOUT: int = 1800  # 30 minutes
    
    # Relationship intelligence settings
    PATTERN_RECOGNITION_THRESHOLD: float = 0.7
    EMOTIONAL_STATE_CONFIDENCE_THRESHOLD: float = 0.6
    RELATIONSHIP_MEMORY_DAYS: int = 365
    
    @validator("CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v):
        if isinstance(v, str):
            return [i.strip() for i in v.split(",")]
        return v
    
    @validator("ALLOWED_HOSTS", pre=True)
    def assemble_allowed_hosts(cls, v):
        if isinstance(v, str):
            return [i.strip() for i in v.split(",")]
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Get cached application settings"""
    return Settings()