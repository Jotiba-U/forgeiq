"use client";

import { useState } from "react";
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Clock, FileText, TrendingUp, TrendingDown, Minus, Download } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const regulations = [
  { id: "iso-45001", name: "ISO 45001:2018", desc: "Occupational Health & Safety", score: 92, status: "compliant", total: 48, met: 44, gaps: 4, lastAudit: "Jun 20, 2026", nextAudit: "Dec 20, 2026", trend: "improving" },
  { id: "iso-14001", name: "ISO 14001:2015", desc: "Environmental Management", score: 85, status: "compliant", total: 42, met: 36, gaps: 6, lastAudit: "May 15, 2026", nextAudit: "Nov 15, 2026", trend: "stable" },
  { id: "osha-1910", name: "OSHA 1910", desc: "General Industry Standards", score: 78, status: "partial", total: 65, met: 51, gaps: 14, lastAudit: "Apr 10, 2026", nextAudit: "Oct 10, 2026", trend: "declining" },
  { id: "api-510", name: "API 510", desc: "Pressure Vessel Inspection", score: 65, status: "at_risk", total: 35, met: 23, gaps: 12, lastAudit: "Mar 20, 2026", nextAudit: "Sep 20, 2026", trend: "declining" },
  { id: "asme-pcc2", name: "ASME PCC-2", desc: "Repair of Pressure Equipment", score: 88, status: "compliant", total: 28, met: 25, gaps: 3, lastAudit: "Jun 01, 2026", nextAudit: "Dec 01, 2026", trend: "improving" },
  { id: "nfpa-70e", name: "NFPA 70E", desc: "Electrical Safety", score: 71, status: "partial", total: 27, met: 19, gaps: 8, lastAudit: "May 01, 2026", nextAudit: "Nov 01, 2026", trend: "stable" },
];

const gaps = [
  { id: "gap-001", regulation: "API 510", requirement: "External visual inspection of pressure vessels V-201, V-205, V-208", risk: "high", description: "Three pressure vessels are overdue for external inspection by more than 30 days", daysOverdue: 31, action: "Schedule immediate inspection with certified API 510 inspector", cost: 15000, responsible: "John Chen" },
  { id: "gap-002", regulation: "OSHA 1910", requirement: "Annual LOTO procedure review per OSHA 1910.147(c)(6)", risk: "high", description: "Electrical and Mechanical departments have not completed annual LOTO procedure review", daysOverdue: 99, action: "Schedule immediate LOTO procedure review for both departments", cost: 5000, responsible: "Sarah Kim" },
  { id: "gap-003", regulation: "NFPA 70E", requirement: "Arc flash hazard analysis update after modifications", risk: "high", description: "Arc flash study for Substation B not updated after MOC #2026-008 modifications", daysOverdue: 52, action: "Commission updated arc flash study from qualified engineer", cost: 25000, responsible: "Mike Torres" },
  { id: "gap-004", regulation: "ISO 14001", requirement: "Hazardous waste disposal documentation", risk: "medium", description: "Waste disposal records for Zone C incomplete for Q2 2026. Missing manifests for 3 shipments.", daysOverdue: 0, action: "Locate and file missing waste manifests. Contact waste hauler for copies.", cost: 2000, responsible: "Sarah Kim" },
  { id: "gap-005", regulation: "OSHA 1910", requirement: "P&ID updates after Management of Change", risk: "medium", description: "4 P&IDs not updated after MOC #2026-015 for Zone B piping modifications", daysOverdue: 0, action: "Update P&IDs to reflect field changes", cost: 8000, responsible: "Mike Torres" },
  { id: "gap-006", regulation: "ISO 45001", requirement: "Hazard identification and risk assessment procedures", risk: "low", description: "3 minor non-conformities. Risk assessments for 2 new chemical processes pending.", daysOverdue: 0, action: "Complete risk assessments and update hazard register", cost: 3000, responsible: "Sarah Kim" },
];

const radarData = regulations.map(r => ({ regulation: r.name.split(" ")[0] + " " + (r.name.split(" ")[1] || ""), score: r.score, fullMark: 100 }));

function getStatusBadge(status: string) {
  switch (status) {
    case "compliant": return <span className="badge badge-success"><CheckCircle2 size={11} /> Compliant</span>;
    case "partial": return <span className="badge badge-warning"><AlertTriangle size={11} /> Partial</span>;
    case "at_risk": return <span className="badge badge-danger"><XCircle size={11} /> At Risk</span>;
    default: return <span className="badge badge-neutral">{status}</span>;
  }
}

function getTrendIcon(trend: string) {
  if (trend === "improving") return <span style={{ color: "#22c55e", display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}><TrendingUp size={12} /> Improving</span>;
  if (trend === "declining") return <span style={{ color: "#ef4444", display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}><TrendingDown size={12} /> Declining</span>;
  return <span style={{ color: "#f59e0b", display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}><Minus size={12} /> Stable</span>;
}

export default function CompliancePage() {
  const [tab, setTab] = useState<"overview" | "gaps" | "report">("overview");

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ShieldCheck size={22} style={{ color: "var(--accent-purple)" }} />
              Compliance Intelligence
            </h1>
            <p className="page-subtitle">AI-powered regulatory compliance monitoring, gap analysis, and audit readiness</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary btn-sm"><Download size={14} /> Export Audit Report</button>
          </div>
        </div>
      </div>

      <div className="page-body">
        {/* Score Cards */}
        <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div className="kpi-card animate-in">
            <div style={{ fontSize: 42, fontWeight: 800, background: "linear-gradient(135deg, #f59e0b, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>78.4%</div>
            <div className="kpi-label">Overall Compliance Score</div>
            <div className="kpi-trend down"><TrendingDown size={14} /> -1.2% this month</div>
          </div>
          <div className="kpi-card animate-in stagger-1">
            <div className="kpi-value" style={{ color: "#22c55e" }}>156</div>
            <div className="kpi-label">Requirements Met</div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>of 245 total</div>
          </div>
          <div className="kpi-card animate-in stagger-2">
            <div className="kpi-value" style={{ color: "#ef4444" }}>6</div>
            <div className="kpi-label">Active Gaps</div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>3 high risk</div>
          </div>
          <div className="kpi-card animate-in stagger-3">
            <div className="kpi-value" style={{ color: "#f59e0b" }}>72%</div>
            <div className="kpi-label">Audit Readiness</div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>Needs improvement</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-list" style={{ marginTop: 20, marginBottom: 16 }}>
          <button className={`tab-trigger ${tab === "overview" ? "active" : ""}`} onClick={() => setTab("overview")}>Regulation Overview</button>
          <button className={`tab-trigger ${tab === "gaps" ? "active" : ""}`} onClick={() => setTab("gaps")}>Compliance Gaps (6)</button>
          <button className={`tab-trigger ${tab === "report" ? "active" : ""}`} onClick={() => setTab("report")}>Audit Report</button>
        </div>

        {tab === "overview" && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              {regulations.map((reg, i) => (
                <div key={reg.id} className="reg-card animate-in" style={{ marginBottom: 10, animationDelay: `${i * 0.05}s` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{reg.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 2 }}>{reg.desc}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {getStatusBadge(reg.status)}
                      <div style={{ fontSize: 28, fontWeight: 800, color: reg.score >= 85 ? "#22c55e" : reg.score >= 70 ? "#f59e0b" : "#ef4444" }}>{reg.score}%</div>
                    </div>
                  </div>
                  <div className="health-bar" style={{ marginBottom: 10 }}>
                    <div className="health-bar-fill" style={{ width: `${reg.score}%`, background: reg.score >= 85 ? "#22c55e" : reg.score >= 70 ? "#f59e0b" : "#ef4444" }} />
                  </div>
                  <div style={{ display: "flex", gap: 20, fontSize: 11, color: "var(--text-tertiary)" }}>
                    <span><strong style={{ color: "var(--text-secondary)" }}>{reg.met}</strong> / {reg.total} requirements met</span>
                    <span>{reg.gaps} gaps</span>
                    <span>Last audit: {reg.lastAudit}</span>
                    <span>Next: {reg.nextAudit}</span>
                    <span style={{ marginLeft: "auto" }}>{getTrendIcon(reg.trend)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ width: 360, flexShrink: 0 }}>
              <div className="card">
                <div className="card-header"><span className="card-title">Compliance Radar</span></div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#1e293b" />
                      <PolarAngleAxis dataKey="regulation" stroke="#64748b" fontSize={9} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" fontSize={9} />
                      <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
                      <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "gaps" && (
          <div>
            {gaps.map((gap, i) => (
              <div key={gap.id} className={`alert-card ${gap.risk}`} style={{ marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{gap.regulation}</span>
                    <span className={`badge ${gap.risk === "high" ? "badge-danger" : gap.risk === "medium" ? "badge-warning" : "badge-success"}`}>{gap.risk} risk</span>
                    {gap.daysOverdue > 0 && <span style={{ fontSize: 11, color: "#ef4444", marginLeft: "auto" }}>{gap.daysOverdue} days overdue</span>}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 4 }}>{gap.requirement}</div>
                  <p style={{ fontSize: 12, color: "var(--text-tertiary)", lineHeight: 1.5, marginBottom: 8 }}>{gap.description}</p>
                  <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--text-tertiary)" }}>
                    <span>✅ Action: <span style={{ color: "var(--accent-cyan)" }}>{gap.action}</span></span>
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>
                    <span>👤 {gap.responsible}</span>
                    <span>💰 Est. ${gap.cost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "report" && (
          <div className="card animate-in">
            <div className="card-header" style={{ background: "var(--bg-tertiary)" }}>
              <span className="card-title">📋 ForgeIQ Compliance Audit Report — Q2 2026</span>
              <button className="btn btn-primary btn-sm"><Download size={14} /> Download PDF</button>
            </div>
            <div className="card-body" style={{ padding: 32 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Executive Summary</h2>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
                The organization maintains a reasonable compliance posture with an overall score of <strong style={{ color: "#f59e0b" }}>78.4%</strong>.
                ISO 45001 and ASME PCC-2 compliance are strong. However, API 510 pressure vessel inspection backlog and OSHA LOTO procedure reviews require
                immediate attention. <strong style={{ color: "#ef4444" }}>Three high-risk gaps</strong> have been identified that should be addressed within
                30 days to avoid potential regulatory action.
              </p>

              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Risk Rating: <span style={{ color: "#f59e0b" }}>Medium-High</span></h3>

              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12, marginTop: 24 }}>Priority Recommendations</h3>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: "#ef4444", fontWeight: 700 }}>1.</span>
                  Prioritize API 510 vessel inspections for V-201, V-205, V-208
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: "#ef4444", fontWeight: 700 }}>2.</span>
                  Complete overdue LOTO procedure reviews immediately
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: "#f59e0b", fontWeight: 700 }}>3.</span>
                  Commission updated arc flash study for Substation B
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: "#3b82f6", fontWeight: 700 }}>4.</span>
                  Implement automated compliance tracking to prevent future gaps
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: "#3b82f6", fontWeight: 700 }}>5.</span>
                  Schedule quarterly compliance reviews with department heads
                </div>
              </div>

              <div style={{ marginTop: 32, padding: 16, background: "var(--bg-tertiary)", borderRadius: 10, fontSize: 12, color: "var(--text-tertiary)" }}>
                <strong>Generated by ForgeIQ Compliance Intelligence Agent</strong> on June 22, 2026 at 2:30 PM<br />
                Based on analysis of 78 compliance records and 89 audit reports in the knowledge base.
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
