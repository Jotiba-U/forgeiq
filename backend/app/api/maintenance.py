"""
ForgeIQ — Maintenance Intelligence API
"""
from fastapi import APIRouter
from typing import Optional

router = APIRouter()


@router.get("/records")
async def get_maintenance_records():
    return {
        "records": [
            {
                "id": "mr-001",
                "equipment_name": "Pump P-101",
                "equipment_id": "P-101",
                "failure_type": "Seal Leakage",
                "failure_date": "2026-06-18",
                "severity": "high",
                "root_cause": "Mechanical seal degradation due to misalignment and abrasive particles in process fluid",
                "action_taken": "Seal replaced, alignment corrected, upstream strainer installed",
                "downtime_hours": 12,
                "cost_estimate": 8500,
                "is_recurring": True,
                "status": "resolved",
            },
            {
                "id": "mr-002",
                "equipment_name": "Heat Exchanger HX-50",
                "equipment_id": "HX-50",
                "failure_type": "Tube Leak",
                "failure_date": "2026-05-12",
                "severity": "critical",
                "root_cause": "Chloride stress cracking due to elevated chloride levels in cooling water",
                "action_taken": "Damaged tubes plugged, water chemistry adjusted, monitoring program enhanced",
                "downtime_hours": 48,
                "cost_estimate": 45000,
                "is_recurring": False,
                "status": "monitoring",
            },
            {
                "id": "mr-003",
                "equipment_name": "Turbine T-400",
                "equipment_id": "T-400",
                "failure_type": "Vibration Anomaly",
                "failure_date": "2026-04-20",
                "severity": "medium",
                "root_cause": "Blade fouling due to deposits from fuel impurities",
                "action_taken": "Online washing performed, fuel filtration improved",
                "downtime_hours": 8,
                "cost_estimate": 12000,
                "is_recurring": True,
                "status": "resolved",
            },
            {
                "id": "mr-004",
                "equipment_name": "Pump P-101",
                "equipment_id": "P-101",
                "failure_type": "Bearing Failure",
                "failure_date": "2026-05-15",
                "severity": "high",
                "root_cause": "Bearing overheating due to insufficient lubrication and misalignment",
                "action_taken": "Bearing replaced, lubrication system serviced, alignment corrected",
                "downtime_hours": 16,
                "cost_estimate": 6200,
                "is_recurring": True,
                "status": "resolved",
            },
            {
                "id": "mr-005",
                "equipment_name": "Compressor C-200",
                "equipment_id": "C-200",
                "failure_type": "Valve Failure",
                "failure_date": "2026-03-28",
                "severity": "medium",
                "root_cause": "Suction valve plate cracking from fatigue",
                "action_taken": "Valve plates replaced, operating pressures reviewed",
                "downtime_hours": 24,
                "cost_estimate": 15000,
                "is_recurring": False,
                "status": "resolved",
            },
            {
                "id": "mr-006",
                "equipment_name": "Motor M-310",
                "equipment_id": "M-310",
                "failure_type": "Insulation Degradation",
                "failure_date": "2026-06-01",
                "severity": "medium",
                "root_cause": "Winding insulation deterioration from thermal cycling and age",
                "action_taken": "Motor rewound, VFD ramp parameters adjusted",
                "downtime_hours": 36,
                "cost_estimate": 22000,
                "is_recurring": False,
                "status": "resolved",
            },
        ],
        "total": 6,
    }


@router.get("/analytics")
async def get_maintenance_analytics():
    return {
        "summary": {
            "total_events": 89,
            "total_downtime_hours": 672,
            "total_cost": 245000,
            "avg_mtbf_days": 34,
            "avg_mttr_hours": 18.5,
            "recurring_failures": 12,
            "equipment_at_risk": 3,
        },
        "failure_by_type": [
            {"type": "Mechanical Seal", "count": 18, "percentage": 20.2},
            {"type": "Bearing", "count": 15, "percentage": 16.8},
            {"type": "Corrosion", "count": 14, "percentage": 15.7},
            {"type": "Vibration", "count": 12, "percentage": 13.5},
            {"type": "Electrical", "count": 10, "percentage": 11.2},
            {"type": "Valve", "count": 8, "percentage": 9.0},
            {"type": "Instrumentation", "count": 7, "percentage": 7.9},
            {"type": "Other", "count": 5, "percentage": 5.6},
        ],
        "failure_by_severity": [
            {"severity": "Critical", "count": 5, "color": "#ef4444"},
            {"severity": "High", "count": 18, "color": "#f97316"},
            {"severity": "Medium", "count": 42, "color": "#f59e0b"},
            {"severity": "Low", "count": 24, "color": "#22c55e"},
        ],
        "cost_by_equipment": [
            {"equipment": "HX-50", "cost": 65000},
            {"equipment": "T-400", "cost": 48000},
            {"equipment": "P-101", "cost": 38500},
            {"equipment": "M-310", "cost": 32000},
            {"equipment": "C-200", "cost": 28000},
            {"equipment": "P-102", "cost": 18500},
            {"equipment": "V-201", "cost": 15000},
        ],
        "monthly_failures": [
            {"month": "Jan", "planned": 8, "unplanned": 5},
            {"month": "Feb", "planned": 10, "unplanned": 4},
            {"month": "Mar", "planned": 7, "unplanned": 7},
            {"month": "Apr", "planned": 12, "unplanned": 6},
            {"month": "May", "planned": 9, "unplanned": 8},
            {"month": "Jun", "planned": 11, "unplanned": 3},
        ],
        "equipment_health": [
            {"name": "Pump P-101", "id": "P-101", "health": 45, "status": "warning", "mtbf": 22, "failures_ytd": 4, "last_maintenance": "2026-06-18", "next_maintenance": "2026-07-18", "criticality": "High"},
            {"name": "Compressor C-200", "id": "C-200", "health": 82, "status": "good", "mtbf": 45, "failures_ytd": 1, "last_maintenance": "2026-06-01", "next_maintenance": "2026-09-01", "criticality": "High"},
            {"name": "Boiler B-12", "id": "B-12", "health": 91, "status": "excellent", "mtbf": 120, "failures_ytd": 0, "last_maintenance": "2026-06-10", "next_maintenance": "2026-12-10", "criticality": "Critical"},
            {"name": "Turbine T-400", "id": "T-400", "health": 67, "status": "fair", "mtbf": 35, "failures_ytd": 2, "last_maintenance": "2026-04-20", "next_maintenance": "2026-07-20", "criticality": "Critical"},
            {"name": "Heat Exchanger HX-50", "id": "HX-50", "health": 38, "status": "critical", "mtbf": 18, "failures_ytd": 3, "last_maintenance": "2026-05-12", "next_maintenance": "2026-06-30", "criticality": "High"},
            {"name": "Motor M-310", "id": "M-310", "health": 74, "status": "good", "mtbf": 60, "failures_ytd": 1, "last_maintenance": "2026-06-01", "next_maintenance": "2026-08-01", "criticality": "Medium"},
            {"name": "Valve V-201", "id": "V-201", "health": 85, "status": "good", "mtbf": 90, "failures_ytd": 0, "last_maintenance": "2026-05-15", "next_maintenance": "2026-11-15", "criticality": "Medium"},
            {"name": "Pump P-102", "id": "P-102", "health": 78, "status": "good", "mtbf": 40, "failures_ytd": 1, "last_maintenance": "2026-05-20", "next_maintenance": "2026-08-20", "criticality": "Medium"},
        ],
        "predictions": [
            {
                "equipment": "Pump P-101",
                "prediction": "Seal failure likely within 30 days based on vibration trend and historical pattern",
                "confidence": 0.87,
                "recommended_action": "Schedule preventive seal replacement",
                "risk_level": "high",
            },
            {
                "equipment": "Heat Exchanger HX-50",
                "prediction": "Corrosion rate suggests tube wall thinning will reach critical threshold in 60 days",
                "confidence": 0.82,
                "recommended_action": "Plan tube bundle replacement during next turnaround",
                "risk_level": "critical",
            },
            {
                "equipment": "Turbine T-400",
                "prediction": "Blade fouling pattern indicates performance degradation within 45 days",
                "confidence": 0.79,
                "recommended_action": "Schedule online water wash and fuel system review",
                "risk_level": "medium",
            },
        ],
    }
