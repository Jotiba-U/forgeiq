"""
ForgeIQ — Industrial Knowledge Copilot API
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
import uuid

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None


DEMO_RESPONSES = {
    "default": {
        "answer": "Based on my analysis of the uploaded industrial knowledge base, I can provide the following insights. The ForgeIQ platform has processed over 1,200 documents covering maintenance procedures, inspection reports, compliance records, and engineering manuals across your industrial operations.\n\nFor more specific information, please ask about particular equipment, procedures, compliance standards, or maintenance histories. I can provide detailed answers with source citations and confidence scores.",
        "citations": [
            {
                "document": "Plant_A_Maintenance_SOP_2026.pdf",
                "page": 12,
                "section": "General Overview",
                "relevance_score": 0.89,
                "text": "The plant maintenance program covers all rotating equipment, pressure vessels, and instrumentation systems..."
            }
        ],
        "confidence": 0.85,
        "related_documents": ["Plant_A_Maintenance_SOP_2026.pdf"],
        "suggested_questions": [
            "What are the safety procedures for Boiler B-12?",
            "Show maintenance history of Pump P-101",
            "Which documents reference ISO 45001?",
            "What compliance risks currently exist?",
        ]
    },
    "safety": {
        "answer": "## Safety Procedures for Boiler B-12\n\nBased on the **Boiler B-12 Engineering Manual** and **Safety Procedures Zone C**, the following safety protocols apply:\n\n### Pre-Operation Checks\n1. **Water Level Verification** — Ensure water level is between 60-80% of sight glass before ignition\n2. **Safety Valve Testing** — Test both primary (150 PSI) and secondary (165 PSI) relief valves\n3. **Gas Detection** — Perform LEL survey in boiler room before startup\n4. **Interlock Testing** — Verify all 12 safety interlocks are functional\n\n### Operating Limits\n- Maximum operating pressure: **145 PSI**\n- Maximum temperature: **366°F (186°C)**\n- Minimum water level: **Low water cutoff at 55%**\n- Required operator certification: **Grade 3 Boiler Operator License**\n\n### Emergency Procedures\n1. Activate emergency shutdown (ESD) button\n2. Close main fuel supply valve\n3. Open atmospheric vent\n4. Contact Control Room (Ext. 2400)\n5. Follow Emergency Response Plan ERP-B12-001\n\n⚠️ **Critical Note**: The most recent inspection (June 2026) noted minor tube thinning in the convection section. Enhanced monitoring has been recommended with next inspection in 90 days.",
        "citations": [
            {
                "document": "Boiler_B12_Engineering_Manual.pdf",
                "page": 45,
                "section": "Safety Systems & Interlocks",
                "relevance_score": 0.97,
                "text": "Boiler B-12 is equipped with 12 independent safety interlocks including high pressure cutoff, low water cutoff, flame failure detection..."
            },
            {
                "document": "Safety_Procedures_Zone_C_2026.pdf",
                "page": 8,
                "section": "Boiler Operations Safety",
                "relevance_score": 0.94,
                "text": "All boiler operations in Zone C require a minimum Grade 3 Boiler Operator License. Pre-startup checklists must be completed..."
            },
            {
                "document": "Pump_P101_Inspection_Report_June2026.pdf",
                "page": 3,
                "section": "Related Equipment Notes",
                "relevance_score": 0.72,
                "text": "Adjacent equipment including Boiler B-12 feedwater system should be monitored for cross-system impacts..."
            }
        ],
        "confidence": 0.96,
        "related_documents": [
            "Boiler_B12_Engineering_Manual.pdf",
            "Safety_Procedures_Zone_C_2026.pdf",
            "Plant_A_Maintenance_SOP_2026.pdf"
        ],
        "suggested_questions": [
            "When was Boiler B-12 last inspected?",
            "What are the emergency shutdown procedures?",
            "Show interlock testing records for B-12",
            "What maintenance is due for Boiler B-12?",
        ]
    },
    "maintenance": {
        "answer": "## Maintenance History — Pump P-101\n\nBased on analysis of **7 documents** in the knowledge base, here is the comprehensive maintenance history for Centrifugal Pump P-101:\n\n### Recent Maintenance Events\n\n| Date | Type | Issue | Action | Downtime |\n|------|------|-------|--------|----------|\n| Jun 18, 2026 | Inspection | Seal degradation (Grade 3) | Monitoring increased | 0 hrs |\n| May 15, 2026 | Corrective | Excessive vibration (8.2 mm/s) | Bearing replaced | 12 hrs |\n| Apr 02, 2026 | Preventive | Scheduled overhaul | Complete seal kit replaced | 24 hrs |\n| Feb 28, 2026 | Corrective | Seal leak detected | Emergency seal replacement | 8 hrs |\n| Jan 10, 2026 | Preventive | Quarterly inspection | Alignment checked, within spec | 4 hrs |\n\n### ⚠️ Recurring Issue Detected\n**Seal failures** have occurred **3 times in the last 6 months**, indicating a systemic issue.\n\n### Root Cause Analysis\nThe AI analysis suggests the recurring seal failures are likely caused by:\n1. **Misalignment** between pump and motor (primary suspect)\n2. **Process fluid contamination** with abrasive particles\n3. **Operating beyond design flow** during peak demand\n\n### Recommendations\n- Perform **laser alignment** within the next 7 days\n- Install **process fluid filtration** upstream of the pump\n- Review **operating procedures** to prevent deadhead conditions\n\n**Current Health Score: 45/100** (Warning)",
        "citations": [
            {
                "document": "Pump_P101_Inspection_Report_June2026.pdf",
                "page": 5,
                "section": "Findings & Recommendations",
                "relevance_score": 0.98,
                "text": "Seal degradation classified as Grade 3 per API 682. Vibration readings at 8.2 mm/s exceed alarm threshold of 7.0 mm/s..."
            },
            {
                "document": "Turbine_T400_Maintenance_Log_2026.xlsx",
                "page": 2,
                "section": "Related Equipment",
                "relevance_score": 0.76,
                "text": "Pump P-101 feedwater supply to turbine T-400 showed flow irregularities correlating with pump vibration events..."
            },
            {
                "document": "Plant_A_Maintenance_SOP_2026.pdf",
                "page": 23,
                "section": "Centrifugal Pump Maintenance",
                "relevance_score": 0.91,
                "text": "Centrifugal pumps shall be inspected quarterly with vibration analysis. Seal replacement interval: 12 months or upon leakage..."
            }
        ],
        "confidence": 0.94,
        "related_documents": [
            "Pump_P101_Inspection_Report_June2026.pdf",
            "Plant_A_Maintenance_SOP_2026.pdf",
            "Turbine_T400_Maintenance_Log_2026.xlsx"
        ],
        "suggested_questions": [
            "What is the root cause of P-101 seal failures?",
            "Show vibration trend data for Pump P-101",
            "What is the cost impact of P-101 downtime?",
            "Which other equipment is affected by P-101 issues?",
        ]
    },
    "compliance": {
        "answer": "## Current Compliance Risk Assessment\n\nBased on analysis of **78 compliance records** and **89 audit reports**, here are the key compliance risks:\n\n### 🔴 High Risk Gaps\n1. **API 510 Pressure Vessel Inspection** — 3 vessels overdue for external inspection (>30 days past due)\n2. **OSHA Lockout/Tagout** — 2 departments missing annual LOTO procedure review\n3. **NFPA 70E Arc Flash** — Arc flash study for Substation B not updated after recent modifications\n\n### 🟡 Medium Risk Gaps\n4. **ISO 14001 Environmental** — Waste disposal records incomplete for Zone C (Q2 2026)\n5. **Process Safety Management** — 4 P&IDs not updated after MOC #2026-015\n\n### Overall Compliance Scorecard\n- **ISO 45001**: 92% ✅\n- **ISO 14001**: 85% ✅\n- **OSHA 1910**: 78% ⚠️\n- **API 510**: 65% 🔴\n- **ASME PCC-2**: 88% ✅\n- **NFPA 70E**: 71% ⚠️\n\n**Aggregate Compliance Score: 78.4%**\n\n### Immediate Actions Required\n1. Schedule API 510 inspections for vessels V-201, V-205, V-208\n2. Complete LOTO annual review for Electrical and Mechanical departments\n3. Commission updated arc flash study for Substation B",
        "citations": [
            {
                "document": "ISO_45001_Compliance_Audit_Q2.pdf",
                "page": 12,
                "section": "Non-Conformities",
                "relevance_score": 0.96,
                "text": "Three minor non-conformities identified in hazard identification and risk assessment procedures..."
            },
            {
                "document": "OSHA_Compliance_Checklist_2026.pdf",
                "page": 7,
                "section": "Lockout/Tagout",
                "relevance_score": 0.93,
                "text": "Annual LOTO procedure review required per OSHA 1910.147(c)(6). Last review date for Electrical dept: March 2025..."
            }
        ],
        "confidence": 0.92,
        "related_documents": [
            "ISO_45001_Compliance_Audit_Q2.pdf",
            "OSHA_Compliance_Checklist_2026.pdf"
        ],
        "suggested_questions": [
            "Generate a compliance audit report",
            "What is our ISO 45001 status?",
            "List all overdue inspections",
            "What are the OSHA requirements we're missing?",
        ]
    },
}


@router.post("/chat")
async def chat(request: ChatRequest):
    msg = request.message.lower()

    if any(kw in msg for kw in ["safety", "boiler", "procedure", "protocol"]):
        response_data = DEMO_RESPONSES["safety"]
    elif any(kw in msg for kw in ["maintenance", "pump", "history", "failure", "p-101", "p101"]):
        response_data = DEMO_RESPONSES["maintenance"]
    elif any(kw in msg for kw in ["compliance", "risk", "audit", "iso", "osha", "regulation"]):
        response_data = DEMO_RESPONSES["compliance"]
    else:
        response_data = DEMO_RESPONSES["default"]

    return {
        "id": str(uuid.uuid4()),
        "conversation_id": request.conversation_id or str(uuid.uuid4()),
        "role": "assistant",
        **response_data,
    }


@router.get("/conversations")
async def list_conversations():
    return {
        "conversations": [
            {
                "id": "conv-001",
                "title": "Boiler B-12 Safety Procedures",
                "created_at": "2026-06-22T09:00:00Z",
                "message_count": 5,
                "last_message": "What are the emergency shutdown procedures for B-12?",
            },
            {
                "id": "conv-002",
                "title": "Pump P-101 Maintenance Analysis",
                "created_at": "2026-06-21T14:30:00Z",
                "message_count": 8,
                "last_message": "Show the vibration trend data",
            },
            {
                "id": "conv-003",
                "title": "Q2 Compliance Review",
                "created_at": "2026-06-20T11:00:00Z",
                "message_count": 4,
                "last_message": "What are our top compliance risks?",
            },
        ]
    }


@router.get("/suggested-questions")
async def get_suggested_questions():
    return {
        "questions": [
            {"text": "What are the safety procedures for Boiler B-12?", "category": "Safety", "icon": "shield"},
            {"text": "Show maintenance history of Pump P-101", "category": "Maintenance", "icon": "wrench"},
            {"text": "Which documents reference ISO 45001?", "category": "Compliance", "icon": "file-check"},
            {"text": "Summarize recurring equipment failures", "category": "Analytics", "icon": "trending-up"},
            {"text": "What compliance risks currently exist?", "category": "Risk", "icon": "alert-triangle"},
            {"text": "What lessons were learned from recent incidents?", "category": "Lessons", "icon": "lightbulb"},
        ]
    }
