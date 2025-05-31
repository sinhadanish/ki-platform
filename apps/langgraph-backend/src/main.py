"""
Ki Relationship Intelligence Platform - LangGraph Backend
Main FastAPI application entry point
"""

import os
import structlog
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from src.api.routes import conversation, relationships, insights, health
from src.core.config import get_settings
from src.core.database import init_db
from src.core.redis import init_redis


logger = structlog.get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan management"""
    logger.info("Starting Ki LangGraph Backend...")
    
    # Initialize database
    await init_db()
    
    # Initialize Redis
    await init_redis()
    
    logger.info("Ki Backend started successfully")
    yield
    
    logger.info("Shutting down Ki Backend...")


def create_app() -> FastAPI:
    """Create and configure FastAPI application"""
    settings = get_settings()
    
    app = FastAPI(
        title="Ki Relationship Intelligence API",
        description="LangGraph-powered AI backend for relationship coaching",
        version="0.1.0",
        lifespan=lifespan,
    )
    
    # Security middleware
    app.add_middleware(
        TrustedHostMiddleware, 
        allowed_hosts=settings.ALLOWED_HOSTS
    )
    
    # CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Include routers
    app.include_router(health.router, prefix="/health", tags=["health"])
    app.include_router(conversation.router, prefix="/api/v1/conversation", tags=["conversation"])
    app.include_router(relationships.router, prefix="/api/v1/relationships", tags=["relationships"])
    app.include_router(insights.router, prefix="/api/v1/insights", tags=["insights"])
    
    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn
    
    settings = get_settings()
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info",
    )