"use client";

import { useState } from "react";
import { Upload, FileText, Search, Filter, Eye, Trash2, Download, CheckCircle2, Clock, AlertCircle, File, FileSpreadsheet, X } from "lucide-react";

const DOCUMENTS = [
  { id: "d1", filename: "Plant_A_Maintenance_SOP_2026.pdf", category: "SOP", status: "processed", file_size: 2450000, page_count: 48, summary: "Standard Operating Procedures for Plant A maintenance activities including preventive maintenance schedules, safety protocols, and equipment handling guidelines.", tags: ["maintenance", "SOP", "Plant A", "safety"], confidence: 0.96, upload_date: "2026-06-15", chunks: 52, entities: 34 },
  { id: "d2", filename: "Pump_P101_Inspection_Report_June2026.pdf", category: "Inspection Report", status: "processed", file_size: 1800000, page_count: 24, summary: "Comprehensive inspection report for Centrifugal Pump P-101 identifying seal degradation, bearing wear, and vibration anomalies.", tags: ["inspection", "Pump P-101", "seal", "vibration"], confidence: 0.94, upload_date: "2026-06-18", chunks: 28, entities: 18 },
  { id: "d3", filename: "ISO_45001_Compliance_Audit_Q2.pdf", category: "Audit Report", status: "processed", file_size: 3200000, page_count: 67, summary: "Q2 2026 compliance audit report against ISO 45001 occupational health and safety standards. Overall compliance at 92%.", tags: ["audit", "ISO 45001", "compliance", "Q2 2026"], confidence: 0.98, upload_date: "2026-06-20", chunks: 78, entities: 45 },
  { id: "d4", filename: "Incident_Report_HX50_Leak_May2026.pdf", category: "Incident Report", status: "processed", file_size: 1200000, page_count: 15, summary: "Incident report documenting the tube leak in Heat Exchanger HX-50 on May 12, 2026. Root cause: chloride stress cracking.", tags: ["incident", "HX-50", "corrosion", "leak"], confidence: 0.95, upload_date: "2026-06-12", chunks: 18, entities: 22 },
  { id: "d5", filename: "Boiler_B12_Engineering_Manual.pdf", category: "Engineering Manual", status: "processed", file_size: 8500000, page_count: 156, summary: "Complete engineering manual for Industrial Boiler B-12 including design specifications, operating parameters, and troubleshooting.", tags: ["engineering", "Boiler B-12", "manual", "specifications"], confidence: 0.97, upload_date: "2026-06-08", chunks: 198, entities: 87 },
  { id: "d6", filename: "Safety_Procedures_Zone_C_2026.pdf", category: "SOP", status: "processed", file_size: 1900000, page_count: 32, summary: "Safety procedures for Zone C operations including hazardous material handling, emergency response protocols, and PPE requirements.", tags: ["safety", "Zone C", "procedures", "PPE"], confidence: 0.93, upload_date: "2026-06-05", chunks: 38, entities: 29 },
  { id: "d7", filename: "Turbine_T400_Maintenance_Log_2026.xlsx", category: "Maintenance Report", status: "processed", file_size: 450000, page_count: 5, summary: "Maintenance activity log for Gas Turbine T-400 series covering January to June 2026.", tags: ["maintenance", "Turbine T-400", "log"], confidence: 0.91, upload_date: "2026-06-21", chunks: 12, entities: 15 },
  { id: "d8", filename: "OSHA_Compliance_Checklist_2026.pdf", category: "Compliance Record", status: "processed", file_size: 980000, page_count: 18, summary: "Annual OSHA compliance checklist covering machine guarding, lockout/tagout, fall protection, and electrical safety.", tags: ["OSHA", "compliance", "checklist", "safety"], confidence: 0.96, upload_date: "2026-06-10", chunks: 22, entities: 31 },
];

const CATEGORIES = ["All", "SOP", "Inspection Report", "Audit Report", "Incident Report", "Engineering Manual", "Maintenance Report", "Compliance Record"];

function formatSize(bytes: number) {
  if (bytes >= 1000000) return (bytes / 1000000).toFixed(1) + " MB";
  return (bytes / 1000).toFixed(0) + " KB";
}

function getCategoryColor(cat: string): string {
  const colors: Record<string, string> = {
    "SOP": "#3b82f6", "Inspection Report": "#10b981", "Audit Report": "#8b5cf6",
    "Incident Report": "#ef4444", "Engineering Manual": "#06b6d4", "Maintenance Report": "#f59e0b",
    "Compliance Record": "#f97316",
  };
  return colors[cat] || "#6b7280";
}

function getCategoryIcon(cat: string) {
  if (cat === "Maintenance Report") return "🔧";
  if (cat === "Inspection Report") return "🔍";
  if (cat === "Audit Report") return "📋";
  if (cat === "Incident Report") return "⚠️";
  if (cat === "Engineering Manual") return "📐";
  if (cat === "SOP") return "📘";
  if (cat === "Compliance Record") return "✅";
  return "📄";
}

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDoc, setSelectedDoc] = useState<typeof DOCUMENTS[0] | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const filtered = DOCUMENTS.filter(d => {
    const matchCat = activeCategory === "All" || d.category === activeCategory;
    const matchSearch = !search || d.filename.toLowerCase().includes(search.toLowerCase()) || d.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Document Intelligence</h1>
            <p className="page-subtitle">Upload, classify, and analyze industrial documents with AI-powered processing</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="badge badge-success"><CheckCircle2 size={12} /> {DOCUMENTS.length} Processed</span>
          </div>
        </div>
      </div>

      <div className="page-body">
        {/* Upload Zone */}
        <div
          className={`upload-zone ${isDragging ? "upload-zone-active" : ""}`}
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={e => { e.preventDefault(); setIsDragging(false); }}
        >
          <div className="upload-icon">
            <Upload size={28} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
            Drop files here or click to upload
          </div>
          <div style={{ fontSize: 13, color: "var(--text-tertiary)", marginBottom: 16 }}>
            Supports PDF, XLSX, DOCX, TXT, and scanned images. Max 50MB per file.
          </div>
          <button className="btn btn-primary">
            <Upload size={14} />
            Select Files
          </button>
        </div>

        {/* Search & Filter */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 24, marginBottom: 16 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
            <input
              className="search-input"
              placeholder="Search documents by name, content, or tags..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="tabs-list" style={{ marginBottom: 16, overflowX: "auto" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`tab-trigger ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat} {cat === "All" ? `(${DOCUMENTS.length})` : `(${DOCUMENTS.filter(d => d.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Document List */}
        <div className="card">
          <div style={{ padding: 0 }}>
            {filtered.map((doc, i) => (
              <div key={doc.id} className="doc-item" style={{ cursor: "pointer" }} onClick={() => setSelectedDoc(doc)}>
                <div className="doc-icon" style={{ background: `${getCategoryColor(doc.category)}18`, fontSize: 20 }}>
                  {getCategoryIcon(doc.category)}
                </div>
                <div className="doc-info">
                  <div className="doc-name">{doc.filename}</div>
                  <div className="doc-meta">
                    <span style={{ color: getCategoryColor(doc.category), fontWeight: 600 }}>{doc.category}</span>
                    <span>{doc.page_count} pages</span>
                    <span>{formatSize(doc.file_size)}</span>
                    <span>{doc.upload_date}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{doc.chunks} chunks</div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{doc.entities} entities</div>
                  </div>
                  <span className="badge badge-success" style={{ fontSize: 10 }}>
                    <CheckCircle2 size={10} /> {(doc.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Detail Modal */}
        {selectedDoc && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 32,
          }} onClick={() => setSelectedDoc(null)}>
            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border-secondary)", borderRadius: 16,
              maxWidth: 640, width: "100%", maxHeight: "80vh", overflow: "auto",
            }} onClick={e => e.stopPropagation()}>
              <div style={{ padding: 24, borderBottom: "1px solid var(--border-primary)", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{selectedDoc.filename}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <span className="badge badge-info">{selectedDoc.category}</span>
                    <span className="badge badge-success">Processed</span>
                  </div>
                </div>
                <button onClick={() => setSelectedDoc(null)} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer" }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>AI Summary</div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>{selectedDoc.summary}</p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
                  <div style={{ background: "var(--bg-tertiary)", borderRadius: 8, padding: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>{selectedDoc.page_count}</div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Pages</div>
                  </div>
                  <div style={{ background: "var(--bg-tertiary)", borderRadius: 8, padding: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "var(--accent-blue)" }}>{selectedDoc.chunks}</div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Chunks</div>
                  </div>
                  <div style={{ background: "var(--bg-tertiary)", borderRadius: 8, padding: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "var(--accent-cyan)" }}>{selectedDoc.entities}</div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Entities</div>
                  </div>
                </div>

                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Tags</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {selectedDoc.tags.map((tag, i) => (
                    <span key={i} className="badge badge-neutral">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
