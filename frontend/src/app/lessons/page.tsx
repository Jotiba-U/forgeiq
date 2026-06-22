"use client";

import { useState } from "react";
import { Lightbulb, AlertTriangle, TrendingUp, Shield, Zap, DollarSign, Target, Bell, CheckCircle2, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const lessons = [
  {
    id: "ll-001", title: "Recurring Seal Failures in Centrifugal Pumps", type: "Equipment Failure", severity: "high",
    description: "Analysis of 18 seal failure events across 6 centrifugal pumps over the past 24 months reveals a systemic pattern linked to misalignment and process fluid contamination.",
    rootCause: "Primary: Pump-motor misalignment exceeding 0.002\" tolerance. Secondary: Abrasive particle ingestion from upstream process.",
    recurrence: 18, equipment: ["Pump P-101", "Pump P-102", "Pump P-205"], locations: ["Plant A - Zone B", "Plant B - Zone A"],
    corrective: ["Implemented laser alignment program", "Installed upstream strainers", "Upgraded to silicon carbide seal faces"],
    preventive: ["Quarterly alignment checks", "Monthly process fluid sampling", "Annual seal condition assessment"],
    impact: { downtime: 216, cost: 185000, production_loss: 320000, safety: 0 },
  },
  {
    id: "ll-002", title: "Corrosion-Induced Failures in Heat Exchangers", type: "Material Degradation", severity: "critical",
    description: "Pattern of internal corrosion in shell-and-tube heat exchangers traced to elevated chloride levels in cooling water system during summer months.",
    rootCause: "Chloride concentration spikes above 200 ppm during peak cooling demand, exceeding the 150 ppm limit for carbon steel tubes.",
    recurrence: 4, equipment: ["Heat Exchanger HX-50", "Heat Exchanger HX-52"], locations: ["Plant A - Zone C"],
    corrective: ["Installed chloride monitoring system", "Implemented automatic blowdown control", "Replaced carbon steel tubes with duplex stainless steel"],
    preventive: ["Daily chloride level monitoring during summer", "Cooling tower chemical optimization", "Annual tube thickness UT inspection"],
    impact: { downtime: 192, cost: 280000, production_loss: 450000, safety: 0 },
  },
  {
    id: "ll-003", title: "Electrical Safety Near-Miss Events at Substations", type: "Safety Near-Miss", severity: "critical",
    description: "Three near-miss events involving arc flash hazards at Substations A and B over the past 12 months during switching operations.",
    rootCause: "Outdated arc flash labels, inadequate PPE selection, and lack of energized work permits during routine switching.",
    recurrence: 3, equipment: ["Substation A", "Substation B"], locations: ["Plant A - Electrical", "Plant B - Electrical"],
    corrective: ["Updated all arc flash labels", "Procured arc-rated PPE meeting NFPA 70E Cat 3", "Implemented energized work permit program"],
    preventive: ["Annual arc flash study updates", "Quarterly arc flash safety training", "Monthly PPE inspection"],
    impact: { downtime: 24, cost: 45000, production_loss: 0, safety: 3 },
  },
  {
    id: "ll-004", title: "Instrument Calibration Drift in Safety Systems", type: "Instrumentation", severity: "high",
    description: "Pattern of calibration drift in safety-critical pressure transmitters, particularly those in high-vibration environments.",
    rootCause: "Vibration-induced sensor drift compounded by extended calibration intervals beyond manufacturer recommendations.",
    recurrence: 7, equipment: ["PT-101", "PT-205", "PT-310", "PT-412"], locations: ["Plant A - Zone A", "Plant A - Zone B"],
    corrective: ["Reduced calibration interval to 6 months", "Installed vibration dampening mounts", "Implemented online calibration verification"],
    preventive: ["Vibration survey before installation", "Quarterly drift trend analysis", "Annual interval review"],
    impact: { downtime: 56, cost: 67000, production_loss: 120000, safety: 0 },
  },
];

const patterns = [
  { name: "Seal Failures", frequency: 18, severity: "high", trend: "decreasing", confidence: 94 },
  { name: "Seasonal Corrosion", frequency: 4, severity: "critical", trend: "stable", confidence: 89 },
  { name: "Arc Flash Near-Miss", frequency: 3, severity: "critical", trend: "decreasing", confidence: 91 },
  { name: "Calibration Drift", frequency: 7, severity: "high", trend: "stable", confidence: 86 },
];

const recommendations = [
  { id: "rec-001", title: "Implement Predictive Seal Monitoring", desc: "Deploy vibration-based seal health monitoring on all centrifugal pumps", priority: "high", category: "Predictive Maintenance", savings: 130000, cost: 45000, roi: 189, status: "recommended" },
  { id: "rec-002", title: "Upgrade Cooling Water Treatment", desc: "Install real-time chloride monitoring and automated chemical dosing", priority: "critical", category: "Process Improvement", savings: 280000, cost: 75000, roi: 273, status: "approved" },
  { id: "rec-003", title: "Arc Flash Safety Enhancement", desc: "Comprehensive arc flash safety program including annual studies and training", priority: "critical", category: "Safety", savings: 0, cost: 85000, roi: 0, status: "in_progress" },
  { id: "rec-004", title: "Smart Calibration Management", desc: "Data-driven calibration interval optimization based on drift patterns", priority: "medium", category: "Reliability", savings: 95000, cost: 35000, roi: 171, status: "recommended" },
];

const alerts = [
  { id: "a1", severity: "high", title: "Pump P-101 Seal Failure Imminent", desc: "87% probability of seal failure within 30 days based on vibration trend", time: "6 hrs ago", ack: false },
  { id: "a2", severity: "critical", title: "API 510 Inspection Overdue", desc: "Vessels V-201, V-205, V-208 are 30+ days past inspection date", time: "1 day ago", ack: false },
  { id: "a3", severity: "medium", title: "Corrosion Rate Acceleration", desc: "Summer chloride levels trending upward for HX-50 and HX-52", time: "2 days ago", ack: true },
  { id: "a4", severity: "medium", title: "Turbine T-400 Maintenance Due", desc: "Scheduled maintenance due in 28 days. Fouling pattern suggests early wash", time: "3 days ago", ack: true },
];

const impactData = [
  { name: "Seal Failures", downtime: 216, cost: 185 },
  { name: "Corrosion", downtime: 192, cost: 280 },
  { name: "Safety", downtime: 24, cost: 45 },
  { name: "Calibration", downtime: 56, cost: 67 },
];

const severityDist = [
  { name: "Critical", value: 2, color: "#ef4444" },
  { name: "High", value: 2, color: "#f97316" },
  { name: "Medium", value: 0, color: "#f59e0b" },
];

export default function LessonsPage() {
  const [tab, setTab] = useState<"lessons" | "patterns" | "recommendations" | "alerts">("lessons");

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Lightbulb size={22} style={{ color: "var(--accent-amber)" }} />
              Lessons Learned & Failure Intelligence
            </h1>
            <p className="page-subtitle">AI-powered pattern detection, incident analysis, and preventive recommendations</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="badge badge-warning"><AlertTriangle size={12} /> 4 patterns</span>
            <span className="badge badge-danger"><Bell size={12} /> 2 new alerts</span>
          </div>
        </div>
      </div>

      <div className="page-body">
        {/* KPIs */}
        <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div className="kpi-card animate-in">
            <div className="kpi-icon" style={{ background: "#8b5cf618", color: "#8b5cf6" }}><Lightbulb size={20} /></div>
            <div className="kpi-value">4</div>
            <div className="kpi-label">Active Patterns Detected</div>
          </div>
          <div className="kpi-card animate-in stagger-1">
            <div className="kpi-icon" style={{ background: "#ef444418", color: "#ef4444" }}><AlertTriangle size={20} /></div>
            <div className="kpi-value">488h</div>
            <div className="kpi-label">Total Impact Downtime</div>
          </div>
          <div className="kpi-card animate-in stagger-2">
            <div className="kpi-icon" style={{ background: "#f59e0b18", color: "#f59e0b" }}><DollarSign size={20} /></div>
            <div className="kpi-value">$577K</div>
            <div className="kpi-label">Total Impact Cost</div>
          </div>
          <div className="kpi-card animate-in stagger-3">
            <div className="kpi-icon" style={{ background: "#10b98118", color: "#10b981" }}><Target size={20} /></div>
            <div className="kpi-value">$505K</div>
            <div className="kpi-label">Potential Savings</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-list" style={{ marginTop: 20, marginBottom: 16 }}>
          <button className={`tab-trigger ${tab === "lessons" ? "active" : ""}`} onClick={() => setTab("lessons")}>Lessons Learned ({lessons.length})</button>
          <button className={`tab-trigger ${tab === "patterns" ? "active" : ""}`} onClick={() => setTab("patterns")}>Pattern Detection</button>
          <button className={`tab-trigger ${tab === "recommendations" ? "active" : ""}`} onClick={() => setTab("recommendations")}>Recommendations</button>
          <button className={`tab-trigger ${tab === "alerts" ? "active" : ""}`} onClick={() => setTab("alerts")}>Alerts ({alerts.filter(a => !a.ack).length})</button>
        </div>

        {tab === "lessons" && (
          <div>
            {lessons.map((lesson, i) => (
              <div key={lesson.id} className="lesson-card animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{lesson.title}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                      <span className={`badge ${lesson.severity === "critical" ? "badge-danger" : "badge-warning"}`}>{lesson.severity}</span>
                      <span className="badge badge-info">{lesson.type}</span>
                      <span className="badge badge-neutral">×{lesson.recurrence} occurrences</span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>{lesson.description}</p>

                <div style={{ background: "var(--bg-tertiary)", borderRadius: 8, padding: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-red)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>Root Cause</div>
                  <div style={{ fontSize: 13, color: "var(--text-primary)" }}>{lesson.rootCause}</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-cyan)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Corrective Actions</div>
                    {lesson.corrective.map((a, j) => (
                      <div key={j} style={{ fontSize: 12, color: "var(--text-secondary)", padding: "3px 0", display: "flex", gap: 6 }}>
                        <CheckCircle2 size={13} style={{ color: "#22c55e", flexShrink: 0, marginTop: 1 }} /> {a}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-blue)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Preventive Actions</div>
                    {lesson.preventive.map((a, j) => (
                      <div key={j} style={{ fontSize: 12, color: "var(--text-secondary)", padding: "3px 0", display: "flex", gap: 6 }}>
                        <Shield size={13} style={{ color: "#3b82f6", flexShrink: 0, marginTop: 1 }} /> {a}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 16, padding: "10px 0 0", borderTop: "1px solid var(--border-primary)", fontSize: 12, color: "var(--text-tertiary)" }}>
                  <span>⏱ {lesson.impact.downtime}h downtime</span>
                  <span>💰 ${(lesson.impact.cost / 1000).toFixed(0)}K cost</span>
                  <span>📉 ${(lesson.impact.production_loss / 1000).toFixed(0)}K production loss</span>
                  {lesson.impact.safety > 0 && <span style={{ color: "#ef4444" }}>⚠️ {lesson.impact.safety} safety incidents</span>}
                  <span style={{ marginLeft: "auto", color: "var(--text-tertiary)" }}>🏭 {lesson.equipment.join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "patterns" && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              {patterns.map((p, i) => (
                <div key={i} className="card" style={{ marginBottom: 10, padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{p.name}</div>
                      <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                        <span className={`badge ${p.severity === "critical" ? "badge-danger" : "badge-warning"}`}>{p.severity}</span>
                        <span className="badge badge-info">{p.confidence}% confidence</span>
                        <span className={`badge ${p.trend === "decreasing" ? "badge-success" : "badge-neutral"}`}>{p.trend}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)" }}>{p.frequency}</div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>occurrences</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ width: 400 }}>
              <div className="card">
                <div className="card-header"><span className="card-title">Impact Analysis</span></div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={impactData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#475569" fontSize={10} />
                      <YAxis stroke="#475569" fontSize={11} />
                      <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
                      <Legend />
                      <Bar dataKey="downtime" fill="#3b82f6" name="Downtime (hrs)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="cost" fill="#f59e0b" name="Cost ($K)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "recommendations" && (
          <div>
            {recommendations.map((rec, i) => (
              <div key={rec.id} className="rec-card animate-in" style={{ marginBottom: 10, animationDelay: `${i * 0.05}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{rec.title}</span>
                      <span className={`badge ${rec.priority === "critical" ? "badge-danger" : rec.priority === "high" ? "badge-warning" : "badge-info"}`}>{rec.priority}</span>
                      <span className="badge badge-neutral">{rec.category}</span>
                      <span className={`badge ${rec.status === "approved" ? "badge-success" : rec.status === "in_progress" ? "badge-info" : "badge-neutral"}`}>{rec.status.replace("_", " ")}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 10 }}>{rec.desc}</p>
                    <div style={{ display: "flex", gap: 20, fontSize: 12 }}>
                      {rec.savings > 0 && <span style={{ color: "#22c55e" }}>💰 ${(rec.savings / 1000).toFixed(0)}K estimated savings</span>}
                      <span style={{ color: "var(--text-tertiary)" }}>🔧 ${(rec.cost / 1000).toFixed(0)}K implementation cost</span>
                      {rec.roi > 0 && <span style={{ color: "var(--accent-blue)", fontWeight: 700 }}>📈 {rec.roi}% ROI</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "alerts" && (
          <div>
            {alerts.map((alert, i) => (
              <div key={alert.id} className={`alert-card ${alert.severity}`} style={{ opacity: alert.ack ? 0.6 : 1 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{alert.title}</span>
                    <span className={`badge ${alert.severity === "critical" ? "badge-danger" : alert.severity === "high" ? "badge-warning" : "badge-info"}`}>{alert.severity}</span>
                    {alert.ack && <span className="badge badge-neutral">acknowledged</span>}
                    <span style={{ fontSize: 11, color: "var(--text-tertiary)", marginLeft: "auto" }}>{alert.time}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
