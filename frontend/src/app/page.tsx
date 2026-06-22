"use client";

import { useState, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import {
  FileText, Brain, ShieldCheck, AlertTriangle, MessageSquare,
  TrendingUp, Clock, Network, Wrench, Activity, Zap, Target,
  ArrowUpRight, ArrowDownRight, Minus, Bell, CheckCircle2, XCircle, Upload, Lightbulb,
} from "lucide-react";

// Demo data embedded for hackathon reliability
const dashboardData = {
  kpis: {
    total_documents: 1247, documents_processed: 1189, processing_rate: 95.3,
    knowledge_coverage: 87.6, compliance_score: 78.4, risk_score: 23.7,
    ai_queries_answered: 3842, avg_response_time: 2.3, active_alerts: 12,
    lessons_learned: 156, equipment_monitored: 342, entities_discovered: 2847,
    relationships_mapped: 5623, knowledge_graph_nodes: 2847, knowledge_graph_edges: 5623,
  },
  document_categories: [
    { name: "SOPs", count: 234, color: "#3b82f6" },
    { name: "Maintenance", count: 312, color: "#f59e0b" },
    { name: "Inspection", count: 187, color: "#10b981" },
    { name: "Audit", count: 89, color: "#8b5cf6" },
    { name: "Incident", count: 134, color: "#ef4444" },
    { name: "Engineering", count: 156, color: "#06b6d4" },
    { name: "Compliance", count: 78, color: "#f97316" },
    { name: "Other", count: 57, color: "#6b7280" },
  ],
  monthly_ingestion: [
    { month: "Jan", documents: 89, queries: 234 },
    { month: "Feb", documents: 112, queries: 312 },
    { month: "Mar", documents: 98, queries: 287 },
    { month: "Apr", documents: 134, queries: 398 },
    { month: "May", documents: 156, queries: 456 },
    { month: "Jun", documents: 178, queries: 523 },
  ],
  compliance_breakdown: [
    { regulation: "ISO 45001", score: 92, fullMark: 100 },
    { regulation: "ISO 14001", score: 85, fullMark: 100 },
    { regulation: "OSHA 1910", score: 78, fullMark: 100 },
    { regulation: "API 510", score: 65, fullMark: 100 },
    { regulation: "ASME PCC-2", score: 88, fullMark: 100 },
    { regulation: "NFPA 70E", score: 71, fullMark: 100 },
  ],
  equipment_health: [
    { name: "Pump P-101", health: 45, status: "warning" },
    { name: "Compressor C-200", health: 82, status: "good" },
    { name: "Boiler B-12", health: 91, status: "excellent" },
    { name: "Turbine T-400", health: 67, status: "fair" },
    { name: "HX-50", health: 38, status: "critical" },
    { name: "Motor M-310", health: 74, status: "good" },
  ],
  failure_trends: [
    { month: "Jan", mechanical: 12, electrical: 8, corrosion: 5, seal: 7 },
    { month: "Feb", mechanical: 10, electrical: 9, corrosion: 6, seal: 5 },
    { month: "Mar", mechanical: 15, electrical: 7, corrosion: 8, seal: 9 },
    { month: "Apr", mechanical: 11, electrical: 12, corrosion: 7, seal: 6 },
    { month: "May", mechanical: 14, electrical: 10, corrosion: 9, seal: 8 },
    { month: "Jun", mechanical: 9, electrical: 11, corrosion: 6, seal: 10 },
  ],
  recent_activity: [
    { type: "document_uploaded", title: "Q2 Maintenance Report - Plant A uploaded", time: "12 min ago", color: "#3b82f6" },
    { type: "alert_triggered", title: "Recurring failure detected: Pump P-101 seal leakage", time: "1 hr ago", color: "#ef4444" },
    { type: "compliance_update", title: "ISO 45001 audit evidence updated", time: "2 hrs ago", color: "#10b981" },
    { type: "ai_query", title: "Query: Safety procedures for Boiler B-12", time: "3 hrs ago", color: "#8b5cf6" },
    { type: "lesson_learned", title: "New pattern detected: Valve corrosion in Zone C", time: "5 hrs ago", color: "#f59e0b" },
    { type: "graph_updated", title: "12 new entities extracted from inspection reports", time: "8 hrs ago", color: "#06b6d4" },
  ],
  risk_distribution: [
    { category: "Equipment Failure", count: 8, level: "high" },
    { category: "Compliance Gap", count: 15, level: "medium" },
    { category: "Safety Incident", count: 3, level: "high" },
    { category: "Doc Gap", count: 23, level: "low" },
    { category: "Maint Overdue", count: 11, level: "medium" },
  ],
};

function getHealthColor(h: number) {
  if (h >= 80) return "#22c55e";
  if (h >= 60) return "#f59e0b";
  if (h >= 40) return "#f97316";
  return "#ef4444";
}

const KPICard = ({ icon: Icon, label, value, sub, trend, trendDir, color, delay }: any) => (
  <div className="kpi-card animate-in" style={{ animationDelay: `${delay}s` }}>
    <div className="kpi-icon" style={{ background: `${color}18`, color }}>
      <Icon size={20} />
    </div>
    <div className="kpi-value">{value}</div>
    <div className="kpi-label">{label}</div>
    {trend && (
      <div className={`kpi-trend ${trendDir}`}>
        {trendDir === "up" ? <ArrowUpRight size={14} /> : trendDir === "down" ? <ArrowDownRight size={14} /> : <Minus size={14} />}
        {trend}
      </div>
    )}
    {sub && <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>{sub}</div>}
  </div>
);

export default function DashboardPage() {
  const d = dashboardData;
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title">Executive Intelligence Dashboard</h1>
            <p className="page-subtitle">Real-time operational intelligence across your industrial knowledge base</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-ghost btn-sm">
              <Bell size={14} />
              <span>12 Alerts</span>
            </button>
            <button className="btn btn-primary btn-sm">
              <Upload size={14} />
              <span>Upload Documents</span>
            </button>
          </div>
        </div>
      </div>

      <div className="page-body">
        {/* KPI Grid */}
        <div className="kpi-grid">
          <KPICard icon={FileText} label="Documents Processed" value={d.kpis.documents_processed.toLocaleString()} sub={`${d.kpis.processing_rate}% processing rate`} trend="+12.3% this month" trendDir="up" color="#3b82f6" delay={0.05} />
          <KPICard icon={Brain} label="Knowledge Coverage" value={`${d.kpis.knowledge_coverage}%`} trend="+3.2% this month" trendDir="up" color="#8b5cf6" delay={0.1} />
          <KPICard icon={ShieldCheck} label="Compliance Score" value={`${d.kpis.compliance_score}%`} trend="-1.2% this month" trendDir="down" color="#f59e0b" delay={0.15} />
          <KPICard icon={AlertTriangle} label="Risk Score" value={`${d.kpis.risk_score}%`} sub="23.7% risk exposure" trend="-5.4% this month" trendDir="up" color="#ef4444" delay={0.2} />
          <KPICard icon={MessageSquare} label="AI Queries Answered" value={d.kpis.ai_queries_answered.toLocaleString()} sub={`${d.kpis.avg_response_time}s avg response`} trend="+18.7% this month" trendDir="up" color="#06b6d4" delay={0.25} />
          <KPICard icon={Network} label="Knowledge Graph" value={d.kpis.entities_discovered.toLocaleString()} sub={`${d.kpis.relationships_mapped.toLocaleString()} relationships`} trend="+156 new entities" trendDir="up" color="#10b981" delay={0.3} />
          <KPICard icon={Wrench} label="Equipment Monitored" value={d.kpis.equipment_monitored} sub="3 equipment at risk" trend="2 new alerts" trendDir="stable" color="#f97316" delay={0.35} />
          <KPICard icon={Lightbulb} label="Lessons Learned" value={d.kpis.lessons_learned} sub="4 active patterns" trend="+8 this month" trendDir="up" color="#a855f7" delay={0.4} />
        </div>

        {/* Charts Row 1 */}
        <div className="chart-grid" style={{ marginTop: 20 }}>
          {/* Document Ingestion & AI Queries Trend */}
          <div className="card animate-in" style={{ animationDelay: "0.2s" }}>
            <div className="card-header">
              <span className="card-title">Document Ingestion & AI Query Trends</span>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Last 6 months</span>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={d.monthly_ingestion}>
                  <defs>
                    <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#475569" fontSize={11} />
                  <YAxis stroke="#475569" fontSize={11} />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="documents" stroke="#3b82f6" fill="url(#colorDocs)" strokeWidth={2} name="Documents" />
                  <Area type="monotone" dataKey="queries" stroke="#8b5cf6" fill="url(#colorQueries)" strokeWidth={2} name="AI Queries" />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Document Categories */}
          <div className="card animate-in" style={{ animationDelay: "0.25s" }}>
            <div className="card-header">
              <span className="card-title">Document Classification</span>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{d.kpis.total_documents} total</span>
            </div>
            <div className="card-body" style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <ResponsiveContainer width="50%" height={240}>
                <PieChart>
                  <Pie data={d.document_categories} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="count" stroke="none">
                    {d.document_categories.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1 }}>
                {d.document_categories.map((cat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 12 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                    <span style={{ color: "var(--text-secondary)", flex: 1 }}>{cat.name}</span>
                    <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="chart-grid" style={{ marginTop: 16 }}>
          {/* Compliance Radar */}
          <div className="card animate-in" style={{ animationDelay: "0.3s" }}>
            <div className="card-header">
              <span className="card-title">Compliance Radar</span>
              <span className="badge badge-warning">78.4% Overall</span>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={d.compliance_breakdown}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="regulation" stroke="#64748b" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" fontSize={9} />
                  <Radar name="Compliance Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Failure Trends */}
          <div className="card animate-in" style={{ animationDelay: "0.35s" }}>
            <div className="card-header">
              <span className="card-title">Failure Type Trends</span>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>By category</span>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={d.failure_trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#475569" fontSize={11} />
                  <YAxis stroke="#475569" fontSize={11} />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
                  <Legend />
                  <Bar dataKey="mechanical" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Mechanical" />
                  <Bar dataKey="electrical" fill="#8b5cf6" radius={[2, 2, 0, 0]} name="Electrical" />
                  <Bar dataKey="corrosion" fill="#f59e0b" radius={[2, 2, 0, 0]} name="Corrosion" />
                  <Bar dataKey="seal" fill="#ef4444" radius={[2, 2, 0, 0]} name="Seal" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Row — Equipment Health + Activity + Risk */}
        <div className="chart-grid-3" style={{ marginTop: 16 }}>
          {/* Equipment Health */}
          <div className="card animate-in" style={{ animationDelay: "0.4s" }}>
            <div className="card-header">
              <span className="card-title">Equipment Health</span>
              <span className="badge badge-danger">3 at risk</span>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              {d.equipment_health.map((eq, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", borderBottom: "1px solid var(--border-primary)" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{eq.name}</div>
                    <div className="health-bar" style={{ marginTop: 6 }}>
                      <div className="health-bar-fill" style={{ width: `${eq.health}%`, background: getHealthColor(eq.health) }} />
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: getHealthColor(eq.health) }}>{eq.health}</div>
                    <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{eq.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card animate-in" style={{ animationDelay: "0.45s" }}>
            <div className="card-header">
              <span className="card-title">Recent Activity</span>
              <span style={{ fontSize: 11, color: "var(--accent-blue)", cursor: "pointer" }}>View All →</span>
            </div>
            <div className="card-body" style={{ padding: "8px 20px" }}>
              {d.recent_activity.map((act, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot" style={{ background: act.color }} />
                  <div className="activity-content">
                    <div className="activity-title">{act.title}</div>
                    <div className="activity-time">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="card animate-in" style={{ animationDelay: "0.5s" }}>
            <div className="card-header">
              <span className="card-title">Risk Distribution</span>
              <span className="badge badge-danger">12 active</span>
            </div>
            <div className="card-body">
              {d.risk_distribution.map((risk, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>{risk.category}</span>
                    <span className={`badge ${risk.level === "high" ? "badge-danger" : risk.level === "medium" ? "badge-warning" : "badge-success"}`}>
                      {risk.count} {risk.level}
                    </span>
                  </div>
                  <div className="health-bar">
                    <div
                      className="health-bar-fill"
                      style={{
                        width: `${(risk.count / 25) * 100}%`,
                        background: risk.level === "high" ? "#ef4444" : risk.level === "medium" ? "#f59e0b" : "#22c55e",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
