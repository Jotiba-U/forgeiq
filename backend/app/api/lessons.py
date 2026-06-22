"""
ForgeIQ — Lessons Learned & Failure Intelligence API
"""
from fastapi import APIRouter

router = APIRouter()


@router.get("")
async def get_lessons():
    return {
        "lessons": [
            {
                "id": "ll-001",
                "title": "Recurring Seal Failures in Centrifugal Pumps",
                "incident_type": "Equipment Failure",
                "description": "Analysis of 18 seal failure events across 6 centrifugal pumps over the past 24 months reveals a systemic pattern linked to misalignment and process fluid contamination.",
                "root_cause": "Primary: Pump-motor misalignment exceeding 0.002\" tolerance. Secondary: Abrasive particle ingestion from upstream process.",
                "severity": "high",
                "recurrence_count": 18,
                "affected_equipment": ["Pump P-101", "Pump P-102", "Pump P-205"],
                "affected_locations": ["Plant A - Zone B", "Plant B - Zone A"],
                "corrective_actions": [
                    "Implemented laser alignment program for all centrifugal pumps",
                    "Installed upstream strainers on all pump suction lines",
                    "Upgraded to silicon carbide seal faces for high-wear applications",
                ],
                "preventive_actions": [
                    "Quarterly alignment checks using laser alignment tools",
                    "Monthly process fluid sampling for particle analysis",
                    "Annual seal condition assessment program",
                ],
                "pattern_id": "PAT-001",
                "business_impact": {
                    "total_downtime_hours": 216,
                    "total_cost": 185000,
                    "production_loss": 320000,
                    "safety_incidents": 0,
                },
                "created_at": "2026-06-20T10:00:00Z",
            },
            {
                "id": "ll-002",
                "title": "Corrosion-Induced Failures in Heat Exchangers",
                "incident_type": "Material Degradation",
                "description": "Pattern of internal corrosion in shell-and-tube heat exchangers traced to elevated chloride levels in cooling water system during summer months.",
                "root_cause": "Chloride concentration spikes above 200 ppm during peak cooling demand, exceeding the 150 ppm limit for carbon steel tubes.",
                "severity": "critical",
                "recurrence_count": 4,
                "affected_equipment": ["Heat Exchanger HX-50", "Heat Exchanger HX-52"],
                "affected_locations": ["Plant A - Zone C"],
                "corrective_actions": [
                    "Installed chloride monitoring system on cooling water supply",
                    "Implemented automatic blowdown control on cooling tower",
                    "Replaced carbon steel tubes with duplex stainless steel in HX-50",
                ],
                "preventive_actions": [
                    "Daily chloride level monitoring during summer months",
                    "Cooling tower water treatment chemical optimization",
                    "Annual tube thickness measurements using UT inspection",
                ],
                "pattern_id": "PAT-002",
                "business_impact": {
                    "total_downtime_hours": 192,
                    "total_cost": 280000,
                    "production_loss": 450000,
                    "safety_incidents": 0,
                },
                "created_at": "2026-06-15T14:30:00Z",
            },
            {
                "id": "ll-003",
                "title": "Electrical Safety Near-Miss Events at Substations",
                "incident_type": "Safety Near-Miss",
                "description": "Three near-miss events involving arc flash hazards at Substations A and B over the past 12 months. All events occurred during switching operations.",
                "root_cause": "Outdated arc flash labels, inadequate PPE selection, and lack of energized work permits during routine switching.",
                "severity": "critical",
                "recurrence_count": 3,
                "affected_equipment": ["Substation A", "Substation B"],
                "affected_locations": ["Plant A - Electrical", "Plant B - Electrical"],
                "corrective_actions": [
                    "Updated all arc flash labels at Substations A and B",
                    "Procured arc-rated PPE meeting NFPA 70E Category 3 requirements",
                    "Implemented energized electrical work permit program",
                ],
                "preventive_actions": [
                    "Annual arc flash study updates after any electrical modifications",
                    "Quarterly arc flash safety training for electrical personnel",
                    "Monthly inspection of arc-rated PPE",
                ],
                "pattern_id": "PAT-003",
                "business_impact": {
                    "total_downtime_hours": 24,
                    "total_cost": 45000,
                    "production_loss": 0,
                    "safety_incidents": 3,
                },
                "created_at": "2026-06-10T09:15:00Z",
            },
            {
                "id": "ll-004",
                "title": "Instrument Calibration Drift in Safety Systems",
                "incident_type": "Instrumentation",
                "description": "Analysis reveals a pattern of calibration drift in safety-critical pressure transmitters, particularly those exposed to high-vibration environments.",
                "root_cause": "Vibration-induced sensor drift compounded by extended calibration intervals beyond manufacturer recommendations.",
                "severity": "high",
                "recurrence_count": 7,
                "affected_equipment": ["PT-101", "PT-205", "PT-310", "PT-412"],
                "affected_locations": ["Plant A - Zone A", "Plant A - Zone B"],
                "corrective_actions": [
                    "Reduced calibration interval from 12 months to 6 months for high-vibration installations",
                    "Installed vibration dampening mounts on affected transmitters",
                    "Implemented online calibration verification using redundant sensors",
                ],
                "preventive_actions": [
                    "Vibration survey before instrument installation",
                    "Quarterly drift trend analysis for all safety-critical instruments",
                    "Annual review of calibration intervals based on drift data",
                ],
                "pattern_id": "PAT-004",
                "business_impact": {
                    "total_downtime_hours": 56,
                    "total_cost": 67000,
                    "production_loss": 120000,
                    "safety_incidents": 0,
                },
                "created_at": "2026-06-05T11:45:00Z",
            },
        ],
        "total": 4,
    }


@router.get("/patterns")
async def get_patterns():
    return {
        "patterns": [
            {
                "id": "PAT-001",
                "name": "Recurring Seal Failures",
                "category": "Mechanical",
                "frequency": 18,
                "severity": "high",
                "equipment_affected": 3,
                "trend": "decreasing",
                "confidence": 0.94,
                "first_detected": "2024-08-15",
                "last_occurrence": "2026-06-18",
            },
            {
                "id": "PAT-002",
                "name": "Seasonal Corrosion Pattern",
                "category": "Material",
                "frequency": 4,
                "severity": "critical",
                "equipment_affected": 2,
                "trend": "stable",
                "confidence": 0.89,
                "first_detected": "2025-07-20",
                "last_occurrence": "2026-05-12",
            },
            {
                "id": "PAT-003",
                "name": "Arc Flash Near-Miss",
                "category": "Safety",
                "frequency": 3,
                "severity": "critical",
                "equipment_affected": 2,
                "trend": "decreasing",
                "confidence": 0.91,
                "first_detected": "2025-09-05",
                "last_occurrence": "2026-04-18",
            },
            {
                "id": "PAT-004",
                "name": "Instrument Calibration Drift",
                "category": "Instrumentation",
                "frequency": 7,
                "severity": "high",
                "equipment_affected": 4,
                "trend": "stable",
                "confidence": 0.86,
                "first_detected": "2025-03-10",
                "last_occurrence": "2026-05-22",
            },
        ],
    }


@router.get("/recommendations")
async def get_recommendations():
    return {
        "recommendations": [
            {
                "id": "rec-001",
                "title": "Implement Predictive Seal Monitoring Program",
                "description": "Deploy vibration-based seal health monitoring on all centrifugal pumps to detect seal degradation before failure. Expected to reduce unplanned seal failures by 70%.",
                "priority": "high",
                "category": "Predictive Maintenance",
                "estimated_savings": 130000,
                "implementation_cost": 45000,
                "roi_percentage": 189,
                "affected_equipment": ["P-101", "P-102", "P-205"],
                "status": "recommended",
            },
            {
                "id": "rec-002",
                "title": "Upgrade Cooling Water Treatment Program",
                "description": "Install real-time chloride monitoring and automated chemical dosing to prevent corrosion events in heat exchangers during peak summer demand.",
                "priority": "critical",
                "category": "Process Improvement",
                "estimated_savings": 280000,
                "implementation_cost": 75000,
                "roi_percentage": 273,
                "affected_equipment": ["HX-50", "HX-52"],
                "status": "approved",
            },
            {
                "id": "rec-003",
                "title": "Arc Flash Safety Enhancement Program",
                "description": "Comprehensive arc flash safety program including annual study updates, enhanced PPE procurement, and quarterly training.",
                "priority": "critical",
                "category": "Safety",
                "estimated_savings": 0,
                "implementation_cost": 85000,
                "roi_percentage": 0,
                "affected_equipment": ["Substation A", "Substation B"],
                "status": "in_progress",
            },
            {
                "id": "rec-004",
                "title": "Smart Calibration Management System",
                "description": "Implement data-driven calibration interval optimization based on historical drift patterns and environmental conditions.",
                "priority": "medium",
                "category": "Reliability",
                "estimated_savings": 95000,
                "implementation_cost": 35000,
                "roi_percentage": 171,
                "affected_equipment": ["PT-101", "PT-205", "PT-310", "PT-412"],
                "status": "recommended",
            },
        ],
    }


@router.get("/alerts")
async def get_alerts():
    return {
        "alerts": [
            {
                "id": "alert-001",
                "type": "failure_prediction",
                "severity": "high",
                "title": "Pump P-101 Seal Failure Imminent",
                "description": "Vibration trend analysis and historical pattern matching indicate a high probability (87%) of seal failure within the next 30 days.",
                "equipment": "Pump P-101",
                "created_at": "2026-06-22T08:00:00Z",
                "acknowledged": False,
            },
            {
                "id": "alert-002",
                "type": "compliance_risk",
                "severity": "critical",
                "title": "API 510 Inspection Overdue - 3 Vessels",
                "description": "Pressure vessels V-201, V-205, and V-208 are more than 30 days past their required API 510 external inspection dates.",
                "equipment": "V-201, V-205, V-208",
                "created_at": "2026-06-21T10:00:00Z",
                "acknowledged": False,
            },
            {
                "id": "alert-003",
                "type": "pattern_detected",
                "severity": "medium",
                "title": "Corrosion Rate Acceleration Detected",
                "description": "Summer cooling water chloride levels are trending upward. Historical pattern suggests increased corrosion risk for HX-50 and HX-52.",
                "equipment": "HX-50, HX-52",
                "created_at": "2026-06-20T14:30:00Z",
                "acknowledged": True,
            },
            {
                "id": "alert-004",
                "type": "maintenance_due",
                "severity": "medium",
                "title": "Turbine T-400 Maintenance Approaching",
                "description": "Scheduled maintenance for Turbine T-400 is due in 28 days. Previous fouling pattern suggests early wash may be beneficial.",
                "equipment": "Turbine T-400",
                "created_at": "2026-06-19T09:00:00Z",
                "acknowledged": True,
            },
        ],
    }
