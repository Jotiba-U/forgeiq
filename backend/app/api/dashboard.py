"""
ForgeIQ — Executive Intelligence Dashboard API
Rich demo data for hackathon presentation
"""
from fastapi import APIRouter
from datetime import datetime, timedelta
import random

router = APIRouter()


@router.get("/overview")
async def get_dashboard_overview():
    return {
        "kpis": {
            "total_documents": 1247,
            "documents_processed": 1189,
            "processing_rate": 95.3,
            "knowledge_coverage": 87.6,
            "compliance_score": 78.4,
            "risk_score": 23.7,
            "ai_queries_answered": 3842,
            "avg_response_time": 2.3,
            "active_alerts": 12,
            "lessons_learned": 156,
            "equipment_monitored": 342,
            "entities_discovered": 2847,
            "relationships_mapped": 5623,
            "knowledge_graph_nodes": 2847,
            "knowledge_graph_edges": 5623,
        },
        "document_categories": [
            {"name": "SOPs", "count": 234, "color": "#3b82f6"},
            {"name": "Maintenance Reports", "count": 312, "color": "#f59e0b"},
            {"name": "Inspection Reports", "count": 187, "color": "#10b981"},
            {"name": "Audit Reports", "count": 89, "color": "#8b5cf6"},
            {"name": "Incident Reports", "count": 134, "color": "#ef4444"},
            {"name": "Engineering Manuals", "count": 156, "color": "#06b6d4"},
            {"name": "Compliance Records", "count": 78, "color": "#f97316"},
            {"name": "Other", "count": 57, "color": "#6b7280"},
        ],
        "monthly_ingestion": [
            {"month": "Jan", "documents": 89, "queries": 234},
            {"month": "Feb", "documents": 112, "queries": 312},
            {"month": "Mar", "documents": 98, "queries": 287},
            {"month": "Apr", "documents": 134, "queries": 398},
            {"month": "May", "documents": 156, "queries": 456},
            {"month": "Jun", "documents": 178, "queries": 523},
            {"month": "Jul", "documents": 145, "queries": 489},
            {"month": "Aug", "documents": 167, "queries": 534},
            {"month": "Sep", "documents": 189, "queries": 578},
            {"month": "Oct", "documents": 201, "queries": 612},
            {"month": "Nov", "documents": 223, "queries": 645},
            {"month": "Dec", "documents": 198, "queries": 598},
        ],
        "compliance_breakdown": [
            {"regulation": "ISO 45001", "score": 92, "status": "compliant"},
            {"regulation": "ISO 14001", "score": 85, "status": "compliant"},
            {"regulation": "OSHA 1910", "score": 78, "status": "partial"},
            {"regulation": "API 510", "score": 65, "status": "at_risk"},
            {"regulation": "ASME PCC-2", "score": 88, "status": "compliant"},
            {"regulation": "NFPA 70E", "score": 71, "status": "partial"},
        ],
        "risk_distribution": [
            {"category": "Equipment Failure", "level": "high", "count": 8, "trend": "increasing"},
            {"category": "Compliance Gap", "level": "medium", "count": 15, "trend": "stable"},
            {"category": "Safety Incident", "level": "high", "count": 3, "trend": "decreasing"},
            {"category": "Documentation Gap", "level": "low", "count": 23, "trend": "decreasing"},
            {"category": "Maintenance Overdue", "level": "medium", "count": 11, "trend": "increasing"},
        ],
        "recent_activity": [
            {"type": "document_uploaded", "title": "Q2 Maintenance Report - Plant A", "timestamp": "2026-06-22T12:30:00Z", "user": "John Chen"},
            {"type": "alert_triggered", "title": "Recurring failure detected: Pump P-101 seal leakage", "timestamp": "2026-06-22T11:45:00Z", "severity": "high"},
            {"type": "compliance_update", "title": "ISO 45001 audit evidence updated", "timestamp": "2026-06-22T10:20:00Z", "user": "Sarah Kim"},
            {"type": "ai_query", "title": "Query: Safety procedures for Boiler B-12", "timestamp": "2026-06-22T09:15:00Z", "user": "Mike Torres"},
            {"type": "lesson_learned", "title": "New pattern detected: Valve corrosion in Zone C", "timestamp": "2026-06-22T08:30:00Z", "severity": "medium"},
            {"type": "document_processed", "title": "Engineering Manual - Turbine T-400 Series", "timestamp": "2026-06-21T16:45:00Z", "user": "System"},
            {"type": "graph_updated", "title": "12 new entities extracted from inspection reports", "timestamp": "2026-06-21T15:20:00Z", "user": "System"},
        ],
        "equipment_health": [
            {"name": "Pump P-101", "health": 45, "status": "warning", "last_maintenance": "2026-05-15"},
            {"name": "Compressor C-200", "health": 82, "status": "good", "last_maintenance": "2026-06-01"},
            {"name": "Boiler B-12", "health": 91, "status": "excellent", "last_maintenance": "2026-06-10"},
            {"name": "Turbine T-400", "health": 67, "status": "fair", "last_maintenance": "2026-04-20"},
            {"name": "Heat Exchanger HX-50", "health": 38, "status": "critical", "last_maintenance": "2026-03-05"},
            {"name": "Motor M-310", "health": 74, "status": "good", "last_maintenance": "2026-05-28"},
        ],
        "failure_trends": [
            {"month": "Jan", "mechanical": 12, "electrical": 8, "corrosion": 5, "seal": 7},
            {"month": "Feb", "mechanical": 10, "electrical": 9, "corrosion": 6, "seal": 5},
            {"month": "Mar", "mechanical": 15, "electrical": 7, "corrosion": 8, "seal": 9},
            {"month": "Apr", "mechanical": 11, "electrical": 12, "corrosion": 7, "seal": 6},
            {"month": "May", "mechanical": 14, "electrical": 10, "corrosion": 9, "seal": 8},
            {"month": "Jun", "mechanical": 9, "electrical": 11, "corrosion": 6, "seal": 10},
        ],
    }


@router.get("/analytics")
async def get_analytics():
    return {
        "query_analytics": {
            "total_queries": 3842,
            "avg_confidence": 0.87,
            "avg_response_time_ms": 2300,
            "queries_with_citations": 3456,
            "citation_rate": 89.9,
        },
        "knowledge_metrics": {
            "total_chunks": 45230,
            "avg_chunk_size": 412,
            "embedding_coverage": 98.2,
            "unique_topics": 234,
        },
        "agent_performance": [
            {"agent": "Ingestion Agent", "tasks_completed": 1189, "avg_time": "4.2s", "success_rate": 98.7},
            {"agent": "Copilot Agent", "tasks_completed": 3842, "avg_time": "2.3s", "success_rate": 96.4},
            {"agent": "Knowledge Graph Agent", "tasks_completed": 1189, "avg_time": "6.8s", "success_rate": 94.2},
            {"agent": "Compliance Agent", "tasks_completed": 456, "avg_time": "5.1s", "success_rate": 97.1},
            {"agent": "Lessons Learned Agent", "tasks_completed": 312, "avg_time": "3.9s", "success_rate": 95.8},
        ],
    }
