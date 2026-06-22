"""
ForgeIQ — Knowledge Graph API
"""
from fastapi import APIRouter
from typing import Optional

router = APIRouter()


@router.get("")
async def get_knowledge_graph():
    """Return full knowledge graph data for visualization"""
    nodes = [
        # Equipment
        {"id": "pump-p101", "label": "Pump P-101", "type": "Equipment", "group": "equipment", "properties": {"health": 45, "location": "Plant A - Zone B", "criticality": "High"}},
        {"id": "pump-p102", "label": "Pump P-102", "type": "Equipment", "group": "equipment", "properties": {"health": 78, "location": "Plant A - Zone B", "criticality": "Medium"}},
        {"id": "boiler-b12", "label": "Boiler B-12", "type": "Equipment", "group": "equipment", "properties": {"health": 91, "location": "Plant A - Zone C", "criticality": "Critical"}},
        {"id": "turbine-t400", "label": "Turbine T-400", "type": "Equipment", "group": "equipment", "properties": {"health": 67, "location": "Plant A - Zone A", "criticality": "Critical"}},
        {"id": "hx-50", "label": "Heat Exchanger HX-50", "type": "Equipment", "group": "equipment", "properties": {"health": 38, "location": "Plant A - Zone C", "criticality": "High"}},
        {"id": "compressor-c200", "label": "Compressor C-200", "type": "Equipment", "group": "equipment", "properties": {"health": 82, "location": "Plant B - Zone A", "criticality": "High"}},
        {"id": "motor-m310", "label": "Motor M-310", "type": "Equipment", "group": "equipment", "properties": {"health": 74, "location": "Plant A - Zone B", "criticality": "Medium"}},
        {"id": "valve-v201", "label": "Valve V-201", "type": "Equipment", "group": "equipment", "properties": {"health": 85, "location": "Plant A - Zone C", "criticality": "Medium"}},

        # Locations
        {"id": "plant-a", "label": "Plant A", "type": "Location", "group": "location", "properties": {"area": "North Complex"}},
        {"id": "plant-b", "label": "Plant B", "type": "Location", "group": "location", "properties": {"area": "South Complex"}},
        {"id": "zone-a", "label": "Zone A", "type": "Location", "group": "location", "properties": {"area": "Power Generation"}},
        {"id": "zone-b", "label": "Zone B", "type": "Location", "group": "location", "properties": {"area": "Pumping Station"}},
        {"id": "zone-c", "label": "Zone C", "type": "Location", "group": "location", "properties": {"area": "Process Area"}},

        # Failures
        {"id": "seal-leak", "label": "Seal Leakage", "type": "Failure", "group": "failure", "properties": {"frequency": 3, "severity": "High"}},
        {"id": "bearing-wear", "label": "Bearing Wear", "type": "Failure", "group": "failure", "properties": {"frequency": 2, "severity": "Medium"}},
        {"id": "corrosion", "label": "Internal Corrosion", "type": "Failure", "group": "failure", "properties": {"frequency": 4, "severity": "High"}},
        {"id": "vibration", "label": "Excessive Vibration", "type": "Failure", "group": "failure", "properties": {"frequency": 5, "severity": "Medium"}},
        {"id": "tube-leak", "label": "Tube Leak", "type": "Failure", "group": "failure", "properties": {"frequency": 1, "severity": "High"}},

        # Regulations
        {"id": "iso-45001", "label": "ISO 45001", "type": "Regulation", "group": "regulation", "properties": {"status": "Compliant", "score": 92}},
        {"id": "iso-14001", "label": "ISO 14001", "type": "Regulation", "group": "regulation", "properties": {"status": "Compliant", "score": 85}},
        {"id": "osha-1910", "label": "OSHA 1910", "type": "Regulation", "group": "regulation", "properties": {"status": "Partial", "score": 78}},
        {"id": "api-510", "label": "API 510", "type": "Regulation", "group": "regulation", "properties": {"status": "At Risk", "score": 65}},
        {"id": "nfpa-70e", "label": "NFPA 70E", "type": "Regulation", "group": "regulation", "properties": {"status": "Partial", "score": 71}},

        # Personnel
        {"id": "john-chen", "label": "John Chen", "type": "Personnel", "group": "personnel", "properties": {"role": "Maintenance Supervisor", "department": "Mechanical"}},
        {"id": "sarah-kim", "label": "Sarah Kim", "type": "Personnel", "group": "personnel", "properties": {"role": "Safety Engineer", "department": "HSE"}},
        {"id": "mike-torres", "label": "Mike Torres", "type": "Personnel", "group": "personnel", "properties": {"role": "Operations Manager", "department": "Operations"}},

        # Procedures
        {"id": "sop-maint-001", "label": "SOP-MAINT-001", "type": "Procedure", "group": "procedure", "properties": {"title": "Centrifugal Pump Maintenance", "revision": "Rev 5"}},
        {"id": "sop-safety-002", "label": "SOP-SAFE-002", "type": "Procedure", "group": "procedure", "properties": {"title": "Boiler Safety Procedures", "revision": "Rev 3"}},
        {"id": "erp-b12-001", "label": "ERP-B12-001", "type": "Procedure", "group": "procedure", "properties": {"title": "Boiler B-12 Emergency Response", "revision": "Rev 2"}},

        # Materials
        {"id": "seal-kit", "label": "Mechanical Seal Kit", "type": "Material", "group": "material", "properties": {"part_number": "SK-P101-A", "stock": 4}},
        {"id": "bearing-6205", "label": "Bearing 6205-2RS", "type": "Material", "group": "material", "properties": {"part_number": "BRG-6205", "stock": 12}},
    ]

    edges = [
        # Equipment → Location
        {"source": "pump-p101", "target": "zone-b", "label": "located_in", "type": "located_in"},
        {"source": "pump-p102", "target": "zone-b", "label": "located_in", "type": "located_in"},
        {"source": "boiler-b12", "target": "zone-c", "label": "located_in", "type": "located_in"},
        {"source": "turbine-t400", "target": "zone-a", "label": "located_in", "type": "located_in"},
        {"source": "hx-50", "target": "zone-c", "label": "located_in", "type": "located_in"},
        {"source": "compressor-c200", "target": "plant-b", "label": "located_in", "type": "located_in"},
        {"source": "motor-m310", "target": "zone-b", "label": "located_in", "type": "located_in"},
        {"source": "valve-v201", "target": "zone-c", "label": "located_in", "type": "located_in"},

        # Zone → Plant
        {"source": "zone-a", "target": "plant-a", "label": "part_of", "type": "part_of"},
        {"source": "zone-b", "target": "plant-a", "label": "part_of", "type": "part_of"},
        {"source": "zone-c", "target": "plant-a", "label": "part_of", "type": "part_of"},

        # Equipment → Failure
        {"source": "pump-p101", "target": "seal-leak", "label": "affected_by", "type": "affected_by"},
        {"source": "pump-p101", "target": "bearing-wear", "label": "affected_by", "type": "affected_by"},
        {"source": "pump-p101", "target": "vibration", "label": "affected_by", "type": "affected_by"},
        {"source": "hx-50", "target": "corrosion", "label": "affected_by", "type": "affected_by"},
        {"source": "hx-50", "target": "tube-leak", "label": "affected_by", "type": "affected_by"},
        {"source": "turbine-t400", "target": "vibration", "label": "affected_by", "type": "affected_by"},
        {"source": "compressor-c200", "target": "vibration", "label": "affected_by", "type": "affected_by"},

        # Equipment → Regulation
        {"source": "boiler-b12", "target": "iso-45001", "label": "governed_by", "type": "governed_by"},
        {"source": "boiler-b12", "target": "osha-1910", "label": "governed_by", "type": "governed_by"},
        {"source": "valve-v201", "target": "api-510", "label": "governed_by", "type": "governed_by"},
        {"source": "hx-50", "target": "api-510", "label": "governed_by", "type": "governed_by"},

        # Equipment → Personnel
        {"source": "pump-p101", "target": "john-chen", "label": "maintained_by", "type": "maintained_by"},
        {"source": "boiler-b12", "target": "sarah-kim", "label": "inspected_by", "type": "inspected_by"},
        {"source": "turbine-t400", "target": "mike-torres", "label": "managed_by", "type": "managed_by"},

        # Equipment → Procedure
        {"source": "pump-p101", "target": "sop-maint-001", "label": "follows", "type": "follows"},
        {"source": "boiler-b12", "target": "sop-safety-002", "label": "follows", "type": "follows"},
        {"source": "boiler-b12", "target": "erp-b12-001", "label": "follows", "type": "follows"},

        # Equipment → Material
        {"source": "pump-p101", "target": "seal-kit", "label": "requires", "type": "requires"},
        {"source": "pump-p101", "target": "bearing-6205", "label": "requires", "type": "requires"},

        # Procedure → Regulation
        {"source": "sop-safety-002", "target": "iso-45001", "label": "references", "type": "references"},
        {"source": "sop-safety-002", "target": "osha-1910", "label": "references", "type": "references"},
        {"source": "erp-b12-001", "target": "nfpa-70e", "label": "references", "type": "references"},

        # Failure → Failure (causal)
        {"source": "vibration", "target": "bearing-wear", "label": "leads_to", "type": "leads_to"},
        {"source": "corrosion", "target": "tube-leak", "label": "leads_to", "type": "leads_to"},

        # Motor drives Pump
        {"source": "motor-m310", "target": "pump-p101", "label": "drives", "type": "drives"},

        # Pump feeds Boiler
        {"source": "pump-p101", "target": "boiler-b12", "label": "feeds", "type": "feeds"},
        {"source": "hx-50", "target": "turbine-t400", "label": "feeds", "type": "feeds"},
    ]

    return {
        "nodes": nodes,
        "edges": edges,
        "stats": {
            "total_entities": len(nodes),
            "total_relationships": len(edges),
            "entity_types": {
                "Equipment": 8,
                "Location": 5,
                "Failure": 5,
                "Regulation": 5,
                "Personnel": 3,
                "Procedure": 3,
                "Material": 2,
            },
            "relationship_types": {
                "located_in": 8,
                "part_of": 3,
                "affected_by": 7,
                "governed_by": 4,
                "maintained_by": 3,
                "follows": 3,
                "requires": 2,
                "references": 3,
                "leads_to": 2,
                "feeds": 2,
                "drives": 1,
            }
        }
    }


@router.get("/entities")
async def list_entities(entity_type: Optional[str] = None):
    graph = await get_knowledge_graph()
    nodes = graph["nodes"]
    if entity_type:
        nodes = [n for n in nodes if n["type"].lower() == entity_type.lower()]
    return {"entities": nodes, "total": len(nodes)}


@router.get("/entities/{entity_id}")
async def get_entity(entity_id: str):
    graph = await get_knowledge_graph()
    entity = next((n for n in graph["nodes"] if n["id"] == entity_id), None)
    if not entity:
        return {"error": "Entity not found"}

    # Find relationships
    relationships = []
    for e in graph["edges"]:
        if e["source"] == entity_id or e["target"] == entity_id:
            relationships.append(e)

    return {"entity": entity, "relationships": relationships}
