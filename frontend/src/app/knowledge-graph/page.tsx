"use client";

import { useState, useCallback, useMemo } from "react";
import { Network, Search, Filter, ZoomIn, ZoomOut, Maximize2, Info, X } from "lucide-react";

// Graph Data
const NODES = [
  { id: "pump-p101", label: "Pump P-101", type: "Equipment", health: 45 },
  { id: "pump-p102", label: "Pump P-102", type: "Equipment", health: 78 },
  { id: "boiler-b12", label: "Boiler B-12", type: "Equipment", health: 91 },
  { id: "turbine-t400", label: "Turbine T-400", type: "Equipment", health: 67 },
  { id: "hx-50", label: "HX-50", type: "Equipment", health: 38 },
  { id: "compressor-c200", label: "Compressor C-200", type: "Equipment", health: 82 },
  { id: "motor-m310", label: "Motor M-310", type: "Equipment", health: 74 },
  { id: "valve-v201", label: "Valve V-201", type: "Equipment", health: 85 },
  { id: "plant-a", label: "Plant A", type: "Location" },
  { id: "plant-b", label: "Plant B", type: "Location" },
  { id: "zone-a", label: "Zone A", type: "Location" },
  { id: "zone-b", label: "Zone B", type: "Location" },
  { id: "zone-c", label: "Zone C", type: "Location" },
  { id: "seal-leak", label: "Seal Leakage", type: "Failure" },
  { id: "bearing-wear", label: "Bearing Wear", type: "Failure" },
  { id: "corrosion", label: "Corrosion", type: "Failure" },
  { id: "vibration", label: "Vibration", type: "Failure" },
  { id: "tube-leak", label: "Tube Leak", type: "Failure" },
  { id: "iso-45001", label: "ISO 45001", type: "Regulation" },
  { id: "iso-14001", label: "ISO 14001", type: "Regulation" },
  { id: "osha-1910", label: "OSHA 1910", type: "Regulation" },
  { id: "api-510", label: "API 510", type: "Regulation" },
  { id: "nfpa-70e", label: "NFPA 70E", type: "Regulation" },
  { id: "john-chen", label: "John Chen", type: "Personnel" },
  { id: "sarah-kim", label: "Sarah Kim", type: "Personnel" },
  { id: "mike-torres", label: "Mike Torres", type: "Personnel" },
  { id: "sop-maint-001", label: "SOP-MAINT-001", type: "Procedure" },
  { id: "sop-safety-002", label: "SOP-SAFE-002", type: "Procedure" },
  { id: "erp-b12-001", label: "ERP-B12-001", type: "Procedure" },
  { id: "seal-kit", label: "Seal Kit", type: "Material" },
  { id: "bearing-6205", label: "Bearing 6205", type: "Material" },
];

const EDGES = [
  { source: "pump-p101", target: "zone-b", label: "located_in" },
  { source: "pump-p102", target: "zone-b", label: "located_in" },
  { source: "boiler-b12", target: "zone-c", label: "located_in" },
  { source: "turbine-t400", target: "zone-a", label: "located_in" },
  { source: "hx-50", target: "zone-c", label: "located_in" },
  { source: "compressor-c200", target: "plant-b", label: "located_in" },
  { source: "motor-m310", target: "zone-b", label: "located_in" },
  { source: "zone-a", target: "plant-a", label: "part_of" },
  { source: "zone-b", target: "plant-a", label: "part_of" },
  { source: "zone-c", target: "plant-a", label: "part_of" },
  { source: "pump-p101", target: "seal-leak", label: "affected_by" },
  { source: "pump-p101", target: "bearing-wear", label: "affected_by" },
  { source: "pump-p101", target: "vibration", label: "affected_by" },
  { source: "hx-50", target: "corrosion", label: "affected_by" },
  { source: "hx-50", target: "tube-leak", label: "affected_by" },
  { source: "turbine-t400", target: "vibration", label: "affected_by" },
  { source: "boiler-b12", target: "iso-45001", label: "governed_by" },
  { source: "boiler-b12", target: "osha-1910", label: "governed_by" },
  { source: "valve-v201", target: "api-510", label: "governed_by" },
  { source: "hx-50", target: "api-510", label: "governed_by" },
  { source: "pump-p101", target: "john-chen", label: "maintained_by" },
  { source: "boiler-b12", target: "sarah-kim", label: "inspected_by" },
  { source: "turbine-t400", target: "mike-torres", label: "managed_by" },
  { source: "pump-p101", target: "sop-maint-001", label: "follows" },
  { source: "boiler-b12", target: "sop-safety-002", label: "follows" },
  { source: "boiler-b12", target: "erp-b12-001", label: "follows" },
  { source: "pump-p101", target: "seal-kit", label: "requires" },
  { source: "pump-p101", target: "bearing-6205", label: "requires" },
  { source: "sop-safety-002", target: "iso-45001", label: "references" },
  { source: "erp-b12-001", target: "nfpa-70e", label: "references" },
  { source: "vibration", target: "bearing-wear", label: "leads_to" },
  { source: "corrosion", target: "tube-leak", label: "leads_to" },
  { source: "motor-m310", target: "pump-p101", label: "drives" },
  { source: "pump-p101", target: "boiler-b12", label: "feeds" },
  { source: "hx-50", target: "turbine-t400", label: "feeds" },
];

const TYPE_COLORS: Record<string, string> = {
  Equipment: "#3b82f6",
  Location: "#10b981",
  Failure: "#ef4444",
  Regulation: "#8b5cf6",
  Personnel: "#f59e0b",
  Procedure: "#06b6d4",
  Material: "#f97316",
};

const TYPE_ICONS: Record<string, string> = {
  Equipment: "⚙️",
  Location: "📍",
  Failure: "⚡",
  Regulation: "📋",
  Personnel: "👤",
  Procedure: "📘",
  Material: "🔩",
};

// Simple force-directed layout calculation (pre-computed positions for demo)
function getNodePositions(nodes: typeof NODES, width: number, height: number) {
  const positions: Record<string, { x: number; y: number }> = {};
  const typeGroups: Record<string, typeof NODES> = {};

  nodes.forEach(n => {
    if (!typeGroups[n.type]) typeGroups[n.type] = [];
    typeGroups[n.type].push(n);
  });

  const types = Object.keys(typeGroups);
  const centerX = width / 2;
  const centerY = height / 2;

  types.forEach((type, ti) => {
    const angle = (ti / types.length) * 2 * Math.PI - Math.PI / 2;
    const radius = Math.min(width, height) * 0.32;
    const groupCx = centerX + Math.cos(angle) * radius;
    const groupCy = centerY + Math.sin(angle) * radius;

    typeGroups[type].forEach((node, ni) => {
      const subAngle = (ni / typeGroups[type].length) * 2 * Math.PI;
      const subRadius = 40 + typeGroups[type].length * 10;
      positions[node.id] = {
        x: groupCx + Math.cos(subAngle) * subRadius,
        y: groupCy + Math.sin(subAngle) * subRadius,
      };
    });
  });

  return positions;
}

export default function KnowledgeGraphPage() {
  const [selectedNode, setSelectedNode] = useState<typeof NODES[0] | null>(null);
  const [activeTypes, setActiveTypes] = useState<string[]>(Object.keys(TYPE_COLORS));
  const [search, setSearch] = useState("");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const W = 1100;
  const H = 650;
  const positions = useMemo(() => getNodePositions(NODES, W, H), []);

  const filteredNodes = NODES.filter(n => activeTypes.includes(n.type) && (!search || n.label.toLowerCase().includes(search.toLowerCase())));
  const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
  const filteredEdges = EDGES.filter(e => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target));

  const connectedTo = (nodeId: string) => {
    const connected = new Set<string>();
    EDGES.forEach(e => {
      if (e.source === nodeId) connected.add(e.target);
      if (e.target === nodeId) connected.add(e.source);
    });
    return connected;
  };

  const highlighted = hoveredNode ? connectedTo(hoveredNode) : null;

  const nodeRelationships = selectedNode
    ? EDGES.filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
    : [];

  const toggleType = (type: string) => {
    setActiveTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const typeStats = Object.entries(TYPE_COLORS).map(([type, color]) => ({
    type, color, count: NODES.filter(n => n.type === type).length,
  }));

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Network size={22} style={{ color: "var(--accent-blue)" }} />
              Knowledge Graph Intelligence
            </h1>
            <p className="page-subtitle">Interactive entity-relationship graph extracted from industrial documents</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="badge badge-info">{NODES.length} Entities</span>
            <span className="badge badge-neutral">{EDGES.length} Relationships</span>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div style={{ display: "flex", gap: 16 }}>
          {/* Graph Area */}
          <div style={{ flex: 1 }}>
            {/* Search */}
            <div style={{ position: "relative", marginBottom: 12 }}>
              <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
              <input className="search-input" placeholder="Search entities..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            {/* SVG Graph */}
            <div className="graph-container">
              <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{ background: "var(--bg-card)" }}>
                {/* Grid pattern */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Edges */}
                {filteredEdges.map((edge, i) => {
                  const s = positions[edge.source];
                  const t = positions[edge.target];
                  if (!s || !t) return null;
                  const isHighlighted = hoveredNode && (edge.source === hoveredNode || edge.target === hoveredNode);
                  const isDimmed = hoveredNode && !isHighlighted;
                  return (
                    <g key={i}>
                      <line
                        x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                        stroke={isHighlighted ? "#3b82f6" : "#334155"}
                        strokeWidth={isHighlighted ? 2 : 1}
                        strokeOpacity={isDimmed ? 0.15 : isHighlighted ? 0.9 : 0.4}
                      />
                      {isHighlighted && (
                        <text
                          x={(s.x + t.x) / 2} y={(s.y + t.y) / 2 - 6}
                          textAnchor="middle" fontSize={9} fill="#94a3b8"
                          style={{ pointerEvents: "none" }}
                        >
                          {edge.label}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Nodes */}
                {filteredNodes.map((node) => {
                  const pos = positions[node.id];
                  if (!pos) return null;
                  const isHovered = hoveredNode === node.id;
                  const isConnected = highlighted?.has(node.id);
                  const isDimmed = hoveredNode && !isHovered && !isConnected;
                  const r = isHovered ? 24 : 18;
                  const color = TYPE_COLORS[node.type] || "#6b7280";

                  return (
                    <g
                      key={node.id}
                      style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                      opacity={isDimmed ? 0.2 : 1}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => setSelectedNode(node)}
                    >
                      {/* Glow */}
                      {isHovered && (
                        <circle cx={pos.x} cy={pos.y} r={r + 8} fill={color} opacity={0.15} />
                      )}
                      {/* Node circle */}
                      <circle cx={pos.x} cy={pos.y} r={r} fill="#0f1629" stroke={color} strokeWidth={isHovered ? 3 : 2} />
                      {/* Icon */}
                      <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize={isHovered ? 16 : 14} style={{ pointerEvents: "none" }}>
                        {TYPE_ICONS[node.type]}
                      </text>
                      {/* Label */}
                      <text x={pos.x} y={pos.y + r + 14} textAnchor="middle" fontSize={9} fill="#94a3b8" fontWeight={isHovered ? 700 : 500} style={{ pointerEvents: "none" }}>
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="graph-legend">
                {typeStats.map(ts => (
                  <button
                    key={ts.type}
                    className="graph-legend-item"
                    style={{ cursor: "pointer", opacity: activeTypes.includes(ts.type) ? 1 : 0.3, border: "none", background: "none", padding: 0, fontFamily: "Inter" }}
                    onClick={() => toggleType(ts.type)}
                  >
                    <div className="graph-legend-dot" style={{ background: ts.color }} />
                    <span>{ts.type} ({ts.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div style={{ width: 300, flexShrink: 0 }}>
            {selectedNode ? (
              <div className="card">
                <div className="card-header">
                  <span className="card-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span>{TYPE_ICONS[selectedNode.type]}</span>
                    {selectedNode.label}
                  </span>
                  <button onClick={() => setSelectedNode(null)} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer" }}>
                    <X size={16} />
                  </button>
                </div>
                <div className="card-body">
                  <div style={{ marginBottom: 12 }}>
                    <span className="badge" style={{ background: `${TYPE_COLORS[selectedNode.type]}20`, color: TYPE_COLORS[selectedNode.type], border: `1px solid ${TYPE_COLORS[selectedNode.type]}30` }}>
                      {selectedNode.type}
                    </span>
                  </div>

                  {"health" in selectedNode && selectedNode.health !== undefined && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Health Score</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="health-bar" style={{ flex: 1 }}>
                          <div className="health-bar-fill" style={{ width: `${selectedNode.health}%`, background: selectedNode.health >= 80 ? "#22c55e" : selectedNode.health >= 60 ? "#f59e0b" : "#ef4444" }} />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 800, color: selectedNode.health >= 80 ? "#22c55e" : selectedNode.health >= 60 ? "#f59e0b" : "#ef4444" }}>
                          {selectedNode.health}%
                        </span>
                      </div>
                    </div>
                  )}

                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>
                    Relationships ({nodeRelationships.length})
                  </div>
                  {nodeRelationships.map((rel, i) => {
                    const other = rel.source === selectedNode.id ? rel.target : rel.source;
                    const otherNode = NODES.find(n => n.id === other);
                    const direction = rel.source === selectedNode.id ? "→" : "←";
                    return (
                      <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid var(--border-primary)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: "var(--text-tertiary)" }}>{direction}</span>
                        <span style={{ color: "var(--accent-blue)", fontWeight: 600 }}>{rel.label}</span>
                        <span style={{ color: "var(--text-secondary)" }}>{otherNode?.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-header">
                  <span className="card-title">Graph Statistics</span>
                </div>
                <div className="card-body">
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)" }}>{NODES.length}</div>
                    <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Total Entities</div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: "var(--accent-blue)" }}>{EDGES.length}</div>
                    <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Total Relationships</div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8, marginTop: 20 }}>
                    By Type
                  </div>
                  {typeStats.map(ts => (
                    <div key={ts.type} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border-primary)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: ts.color }} />
                        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{ts.type}</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{ts.count}</span>
                    </div>
                  ))}
                  <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 16, lineHeight: 1.5 }}>
                    Click any node to see its details and relationships. Hover to highlight connections. Use the legend to filter entity types.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
