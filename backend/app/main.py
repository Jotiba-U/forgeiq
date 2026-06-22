"""
ForgeIQ — Industrial Knowledge Intelligence Platform
Main FastAPI Application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.api import documents, copilot, knowledge_graph, maintenance, compliance, lessons, dashboard


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print(f"[ForgeIQ] {settings.APP_NAME} v{settings.APP_VERSION} starting...")
    yield
    # Shutdown
    print(f"[ForgeIQ] {settings.APP_NAME} shutting down...")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Industrial Knowledge Intelligence Platform — AI-Powered Operational Intelligence",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(copilot.router, prefix="/api/copilot", tags=["Copilot"])
app.include_router(knowledge_graph.router, prefix="/api/knowledge-graph", tags=["Knowledge Graph"])
app.include_router(maintenance.router, prefix="/api/maintenance", tags=["Maintenance"])
app.include_router(compliance.router, prefix="/api/compliance", tags=["Compliance"])
app.include_router(lessons.router, prefix="/api/lessons", tags=["Lessons Learned"])


@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }
