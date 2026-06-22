"""
ForgeIQ — Documents API
"""
from fastapi import APIRouter, UploadFile, File, Form
from typing import List, Optional
import uuid

router = APIRouter()

# Demo documents data
DEMO_DOCUMENTS = [
    {
        "id": "d1a2b3c4-5678-9012-abcd-ef1234567890",
        "filename": "Plant_A_Maintenance_SOP_2026.pdf",
        "original_filename": "Plant_A_Maintenance_SOP_2026.pdf",
        "file_type": "pdf",
        "file_size": 2450000,
        "category": "SOP",
        "status": "processed",
        "page_count": 48,
        "summary": "Standard Operating Procedures for Plant A maintenance activities including preventive maintenance schedules, safety protocols, and equipment handling guidelines for all rotating equipment.",
        "tags": ["maintenance", "SOP", "Plant A", "safety", "rotating equipment"],
        "classification_confidence": 0.96,
        "upload_date": "2026-06-15T09:30:00Z",
        "processed_date": "2026-06-15T09:34:00Z",
        "chunks_count": 52,
        "entities_extracted": 34,
    },
    {
        "id": "d2b3c4d5-6789-0123-bcde-f12345678901",
        "filename": "Pump_P101_Inspection_Report_June2026.pdf",
        "original_filename": "Pump_P101_Inspection_Report_June2026.pdf",
        "file_type": "pdf",
        "file_size": 1800000,
        "category": "Inspection Report",
        "status": "processed",
        "page_count": 24,
        "summary": "Comprehensive inspection report for Centrifugal Pump P-101 identifying seal degradation, bearing wear, and vibration anomalies. Recommends immediate seal replacement and bearing monitoring.",
        "tags": ["inspection", "Pump P-101", "seal", "bearing", "vibration"],
        "classification_confidence": 0.94,
        "upload_date": "2026-06-18T14:20:00Z",
        "processed_date": "2026-06-18T14:23:00Z",
        "chunks_count": 28,
        "entities_extracted": 18,
    },
    {
        "id": "d3c4d5e6-7890-1234-cdef-123456789012",
        "filename": "ISO_45001_Compliance_Audit_Q2.pdf",
        "original_filename": "ISO_45001_Compliance_Audit_Q2.pdf",
        "file_type": "pdf",
        "file_size": 3200000,
        "category": "Audit Report",
        "status": "processed",
        "page_count": 67,
        "summary": "Q2 2026 compliance audit report against ISO 45001 occupational health and safety standards. Overall compliance at 92% with 3 minor non-conformities identified in hazard identification procedures.",
        "tags": ["audit", "ISO 45001", "compliance", "safety", "Q2 2026"],
        "classification_confidence": 0.98,
        "upload_date": "2026-06-20T10:00:00Z",
        "processed_date": "2026-06-20T10:06:00Z",
        "chunks_count": 78,
        "entities_extracted": 45,
    },
    {
        "id": "d4d5e6f7-8901-2345-def0-234567890123",
        "filename": "Incident_Report_HX50_Leak_May2026.pdf",
        "original_filename": "Incident_Report_HX50_Leak_May2026.pdf",
        "file_type": "pdf",
        "file_size": 1200000,
        "category": "Incident Report",
        "status": "processed",
        "page_count": 15,
        "summary": "Incident report documenting the tube leak in Heat Exchanger HX-50 on May 12, 2026. Root cause identified as internal corrosion due to chloride stress cracking. No personnel injuries reported.",
        "tags": ["incident", "Heat Exchanger HX-50", "corrosion", "leak", "tube failure"],
        "classification_confidence": 0.95,
        "upload_date": "2026-06-12T08:45:00Z",
        "processed_date": "2026-06-12T08:47:00Z",
        "chunks_count": 18,
        "entities_extracted": 22,
    },
    {
        "id": "d5e6f7a8-9012-3456-ef01-345678901234",
        "filename": "Boiler_B12_Engineering_Manual.pdf",
        "original_filename": "Boiler_B12_Engineering_Manual.pdf",
        "file_type": "pdf",
        "file_size": 8500000,
        "category": "Engineering Manual",
        "status": "processed",
        "page_count": 156,
        "summary": "Complete engineering manual for Industrial Boiler B-12 including design specifications, operating parameters, safety interlocks, maintenance schedules, and troubleshooting guides.",
        "tags": ["engineering", "Boiler B-12", "manual", "specifications", "safety"],
        "classification_confidence": 0.97,
        "upload_date": "2026-06-08T11:30:00Z",
        "processed_date": "2026-06-08T11:38:00Z",
        "chunks_count": 198,
        "entities_extracted": 87,
    },
    {
        "id": "d6f7a8b9-0123-4567-f012-456789012345",
        "filename": "Safety_Procedures_Zone_C_2026.pdf",
        "original_filename": "Safety_Procedures_Zone_C_2026.pdf",
        "file_type": "pdf",
        "file_size": 1900000,
        "category": "SOP",
        "status": "processed",
        "page_count": 32,
        "summary": "Safety procedures for Zone C operations including hazardous material handling, emergency response protocols, PPE requirements, and confined space entry procedures.",
        "tags": ["safety", "Zone C", "procedures", "hazardous materials", "PPE"],
        "classification_confidence": 0.93,
        "upload_date": "2026-06-05T13:15:00Z",
        "processed_date": "2026-06-05T13:18:00Z",
        "chunks_count": 38,
        "entities_extracted": 29,
    },
    {
        "id": "d7a8b9c0-1234-5678-0123-567890123456",
        "filename": "Turbine_T400_Maintenance_Log_2026.xlsx",
        "original_filename": "Turbine_T400_Maintenance_Log_2026.xlsx",
        "file_type": "xlsx",
        "file_size": 450000,
        "category": "Maintenance Report",
        "status": "processed",
        "page_count": 5,
        "summary": "Maintenance activity log for Gas Turbine T-400 series covering January to June 2026. Includes 23 maintenance events, 4 unplanned shutdowns, and trending vibration data.",
        "tags": ["maintenance", "Turbine T-400", "log", "vibration", "shutdown"],
        "classification_confidence": 0.91,
        "upload_date": "2026-06-21T15:00:00Z",
        "processed_date": "2026-06-21T15:02:00Z",
        "chunks_count": 12,
        "entities_extracted": 15,
    },
    {
        "id": "d8b9c0d1-2345-6789-1234-678901234567",
        "filename": "OSHA_Compliance_Checklist_2026.pdf",
        "original_filename": "OSHA_Compliance_Checklist_2026.pdf",
        "file_type": "pdf",
        "file_size": 980000,
        "category": "Compliance Record",
        "status": "processed",
        "page_count": 18,
        "summary": "Annual OSHA compliance checklist covering machine guarding, lockout/tagout, fall protection, electrical safety, and hazard communication requirements. 85% completion rate noted.",
        "tags": ["OSHA", "compliance", "checklist", "safety", "2026"],
        "classification_confidence": 0.96,
        "upload_date": "2026-06-10T09:00:00Z",
        "processed_date": "2026-06-10T09:02:00Z",
        "chunks_count": 22,
        "entities_extracted": 31,
    },
]


@router.get("")
async def list_documents(
    category: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
):
    docs = DEMO_DOCUMENTS
    if category:
        docs = [d for d in docs if d["category"].lower() == category.lower()]
    if status:
        docs = [d for d in docs if d["status"] == status]
    if search:
        docs = [d for d in docs if search.lower() in d["filename"].lower() or search.lower() in d.get("summary", "").lower()]
    return {"documents": docs, "total": len(docs)}


@router.get("/{document_id}")
async def get_document(document_id: str):
    for doc in DEMO_DOCUMENTS:
        if doc["id"] == document_id:
            return doc
    return {"error": "Document not found"}


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    new_doc = {
        "id": str(uuid.uuid4()),
        "filename": file.filename,
        "original_filename": file.filename,
        "file_type": file.filename.split(".")[-1] if "." in file.filename else "unknown",
        "file_size": 0,
        "category": "Processing...",
        "status": "processing",
        "page_count": 0,
        "summary": "Document is being processed by ForgeIQ AI agents...",
        "tags": [],
        "classification_confidence": 0.0,
        "upload_date": "2026-06-22T14:30:00Z",
        "processed_date": None,
    }
    return {"message": "Document uploaded successfully", "document": new_doc}


@router.get("/{document_id}/chunks")
async def get_document_chunks(document_id: str):
    return {
        "document_id": document_id,
        "chunks": [
            {
                "id": str(uuid.uuid4()),
                "chunk_index": i,
                "content": f"Sample chunk content {i} from document. This represents a section of the processed document that has been chunked for RAG retrieval.",
                "page_number": i + 1,
                "section_title": f"Section {i + 1}",
            }
            for i in range(5)
        ],
    }
