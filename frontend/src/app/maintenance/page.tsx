"use client";

import { useState } from "react";
import { Wrench, AlertTriangle, TrendingUp, Clock, DollarSign, Activity, Target, ArrowUpRight, ArrowDownRight, Shield, Zap } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const healthData = [
  { name: "Pump P-101", id: "P-101", health: 45, status: "warning", mtbf: 22, failures_ytd: 4, last_maintenance: "Jun 18, 2026", next_maintenance: "Jul 18, 2026", criticality: "High" },
  { name: "Compressor C-200", id: "C-200", health: 82, status: "good", mtbf: 45, failures_ytd: 1, last_maintenance: "Jun 01, 2026", next_maintenance: "Sep 01, 2026", criticality: "High" },
  { name: "Boiler B-12", id: "B-12", health: 91, status: "excellent", mtbf: 120, failures_ytd: 0, last_maintenance: "Jun 10, 2026", next_maintenance: "Dec 10, 2026", criticality: "Critical" },
  { name: "Turbine T-400", id: "T-400", health: 67, status: "fair", mtbf: 35, failures_ytd: 2, last_maintenance: "Apr 20, 2026", next_maintenance: "Jul 20, 2026", criticality: "Critical" },
  { name: "Heat Exchanger HX-50", id: "HX-50", health: 38, status: "critical", mtbf: 18, failures_ytd: 3, last_maintenance: "May 12, 2026", next_maintenance: "Jun 30, 2026", criticality: "High" },
  { name: "Motor M-310", id: "M-310", health: 74, status: "good", mtbf: 60, failures_ytd: 1, last_maintenance: "Jun 01, 2026", next_maintenance: "Aug 01, 2026", criticality: "Medium" },
  { name: "Valve V-201", id: "V-201", health: 85, status: "good", mtbf: 90, failures_ytd: 0, last_maintenance: "May 15, 2026", next_maintenance: "Nov 15, 2026", criticality: "Medium" },
  { name: "Pump P-102", id: "P-102", health: 78, status: "good", mtbf: 40, failures_ytd: 1, last_maintenance: "May 20, 2026", next_maintenance: "Aug 20, 2026", criticality: "Medium" },
];

const failureByType = [
  { type: "Mechanical Seal", count: 18, color: "#3b82f6" },
  { type: "Bearing", count: 15, color: "#8b5cf6" },
  { type: "Corrosion", count: 14, color: "#ef4444" },
  { type: "Vibration", count: 12, color: "#f59e0b" },
  { type: "Electrical", count: 10, color: "#06b6d4" },
  { type: "Valve", count: 8, color: "#10b981" },
  { type: "Instrumentation", count: 7, color: "#f97316" },
  { type: "Other", count: 5, color: "#6b7280" },
];

const monthlyFailures = [
  { month: "Jan", planned: 8, unplanned: 5 },
  { month: "Feb", planned: 10, unplanned: 4 },
  { month: "Mar", planned: 7, unplanned: 7 },
  { month: "Apr", planned: 12, unplanned: 6 },
  { month: "May", planned: 9, unplanned: 8 },
  { month: "Jun", planned: 11, unplanned: 3 },
];

const costByEquipment = [
  { equipment: "HX-50", cost: 65000 },
  { equipment: "T-400", cost: 48000 },
  { equipment: "P-101", cost: 38500 },
  { equipment: "M-310", cost: 32000 },
  { equipment: "C-200", cost: 28000 },
  { equipment: "P-102", cost: 18500 },
  { equipment: "V-201", cost: 15000 },
];

const predictions = [
  { equipment: "Pump P-101", prediction: "Seal failure likely within 30 days based on vibration trend and historical pattern", confidence: 0.87, action: "Schedule preventive seal replacement", risk: "high" },
  { equipment: "Heat Exchanger HX-50", prediction: "Corrosion rate suggests tube wall thinning will reach critical threshold in 60 days", confidence: 0.82, action: "Plan tube bundle replacement during next turnaround", risk: "critical" },
  { equipment: "Turbine T-400", prediction: "Blade fouling pattern indicates performance degradation within 45 days", confidence: 0.79, action: "Schedule online water wash and fuel system review", risk: "medium" },
];

function getHealthColor(h: number) {
  if (h >= 80) return "#22c55e";
  if (h >= 60) return "#f59e0b";
  if (h >= 40) return "#f97316";
  return "#ef4444";
}

export default function MaintenancePage() {
  const [tab, setTab] = useState<"health" | "analytics" | "predictions">("health");

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Wrench size={22} style={{ color: "var(--accent-amber)" }} />
              Maintenance Intelligence
            </h1>
            <p className="page-subtitle">AI-powered equipment health monitoring, failure analysis, and predictive maintenance</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="badge badge-danger"><AlertTriangle size={12} /> 3 at risk</span>
            <span className="badge badge-warning"><Clock size={12} /> 2 upcoming</span>
          </div>
        </div>
      </div>

      <div className="page-body">
        {/* KPIs */}
        <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
          <div className="kpi-card animate-in">
            <div className="kpi-icon" style={{ background: "#3b82f618", color: "#3b82f6" }}><Activity size={20} /></div>
            <div className="kpi-value">89</div>
            <div className="kpi-label">Total Maintenance Events</div>
          </div>
          <div className="kpi-card animate-in stagger-1">
            <div className="kpi-icon" style={{ background: "#ef444418", color: "#ef4444" }}><AlertTriangle size={20} /></div>
            <div className="kpi-value">672h</div>
            <div className="kpi-label">Total Downtime</div>
          </div>
          <div className="kpi-card animate-in stagger-2">
            <div className="kpi-icon" style={{ background: "#f59e0b18", color: "#f59e0b" }}><DollarSign size={20} /></div>
            <div className="kpi-value">$245K</div>
            <div className="kpi-label">Total Maintenance Cost</div>
          </div>
          <div className="kpi-card animate-in stagger-3">
            <div className="kpi-icon" style={{ background: "#10b98118", color: "#10b981" }}><Target size={20} /></div>
            <div className="kpi-value">34d</div>
            <div className="kpi-label">Average MTBF</div>
          </div>
          <div className="kpi-card animate-in stagger-4">
            <div className="kpi-icon" style={{ background: "#06b6d418", color: "#06b6d4" }}><Clock size={20} /></div>
            <div className="kpi-value">18.5h</div>
            <div className="kpi-label">Average MTTR</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-list" style={{ marginTop: 20, marginBottom: 16 }}>
          <button className={`tab-trigger ${tab === "health" ? "active" : ""}`} onClick={() => setTab("health")}>Equipment Health</button>
          <button className={`tab-trigger ${tab === "analytics" ? "active" : ""}`} onClick={() => setTab("analytics")}>Failure Analytics</button>
          <button className={`tab-trigger ${tab === "predictions" ? "active" : ""}`} onClick={() => setTab("predictions")}>AI Predictions</button>
        </div>

        {tab === "health" && (
          <div className="health-grid">
            {healthData.map((eq, i) => (
              <div key={i} className="health-card animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{eq.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>{eq.id} • {eq.criticality} Criticality</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: getHealthColor(eq.health), lineHeight: 1 }}>{eq.health}</div>
                    <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.5px", color: getHealthColor(eq.health) }}>{eq.status}</div>
                  </div>
                </div>
                <div className="health-bar" style={{ marginBottom: 12 }}>
                  <div className="health-bar-fill" style={{ width: `${eq.health}%`, background: getHealthColor(eq.health) }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, fontSize: 11 }}>
                  <div>
                    <span style={{ color: "var(--text-tertiary)" }}>MTBF: </span>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{eq.mtbf}d</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-tertiary)" }}>Failures YTD: </span>
                    <span style={{ color: eq.failures_ytd > 2 ? "#ef4444" : "var(--text-primary)", fontWeight: 600 }}>{eq.failures_ytd}</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-tertiary)" }}>Last: </span>
                    <span style={{ color: "var(--text-secondary)" }}>{eq.last_maintenance}</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-tertiary)" }}>Next: </span>
                    <span style={{ color: "var(--text-secondary)" }}>{eq.next_maintenance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "analytics" && (
          <div className="chart-grid">
            <div className="card">
              <div className="card-header">
                <span className="card-title">Planned vs Unplanned Maintenance</span>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={monthlyFailures}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#475569" fontSize={11} />
                    <YAxis stroke="#475569" fontSize={11} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
                    <Legend />
                    <Bar dataKey="planned" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Planned" />
                    <Bar dataKey="unplanned" fill="#ef4444" radius={[4, 4, 0, 0]} name="Unplanned" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <span className="card-title">Failure Distribution</span>
              </div>
              <div className="card-body" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <ResponsiveContainer width="50%" height={280}>
                  <PieChart>
                    <Pie data={failureByType} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2} dataKey="count" stroke="none">
                      {failureByType.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ flex: 1 }}>
                  {failureByType.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 12 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.color, flexShrink: 0 }} />
                      <span style={{ flex: 1, color: "var(--text-secondary)" }}>{f.type}</span>
                      <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{f.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card" style={{ gridColumn: "1 / -1" }}>
              <div className="card-header">
                <span className="card-title">Maintenance Cost by Equipment</span>
                <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Year to Date</span>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={costByEquipment} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis type="number" stroke="#475569" fontSize={11} tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}K`} />
                    <YAxis type="category" dataKey="equipment" stroke="#475569" fontSize={11} width={60} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} formatter={(v) => [`$${Number(v).toLocaleString()}`, "Cost"]} />
                    <Bar dataKey="cost" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {tab === "predictions" && (
          <div>
            <div style={{ marginBottom: 16, padding: 16, background: "var(--bg-card)", border: "1px solid var(--border-primary)", borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <Zap size={20} style={{ color: "var(--accent-blue)" }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>AI-Powered Predictive Maintenance</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Predictions generated by analyzing maintenance history, failure patterns, and equipment sensor data</div>
              </div>
            </div>

            {predictions.map((pred, i) => (
              <div key={i} className={`alert-card ${pred.risk}`} style={{ marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{pred.equipment}</span>
                    <span className={`badge ${pred.risk === "critical" ? "badge-danger" : pred.risk === "high" ? "badge-warning" : "badge-info"}`}>{pred.risk}</span>
                    <span style={{ fontSize: 11, color: "var(--accent-blue)", marginLeft: "auto" }}>{(pred.confidence * 100).toFixed(0)}% confidence</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 8 }}>{pred.prediction}</p>
                  <div style={{ fontSize: 12, color: "var(--accent-cyan)", display: "flex", alignItems: "center", gap: 6 }}>
                    <Shield size={14} />
                    <strong>Recommended Action:</strong> {pred.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
