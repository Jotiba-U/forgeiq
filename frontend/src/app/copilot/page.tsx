"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, FileText, Shield, Wrench, TrendingUp, AlertTriangle, Lightbulb, Clock, CheckCircle2 } from "lucide-react";

interface Citation {
  document: string;
  page: number;
  section: string;
  relevance_score: number;
  text: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  confidence?: number;
  suggested_questions?: string[];
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  { text: "What are the safety procedures for Boiler B-12?", icon: Shield, category: "Safety" },
  { text: "Show maintenance history of Pump P-101", icon: Wrench, category: "Maintenance" },
  { text: "Which documents reference ISO 45001?", icon: FileText, category: "Compliance" },
  { text: "What compliance risks currently exist?", icon: AlertTriangle, category: "Risk" },
  { text: "Summarize recurring equipment failures", icon: TrendingUp, category: "Analytics" },
  { text: "What lessons were learned from recent incidents?", icon: Lightbulb, category: "Lessons" },
];

// Demo responses mapped to keywords
const DEMO_RESPONSES: Record<string, { content: string; citations: Citation[]; confidence: number; suggested_questions: string[] }> = {
  safety: {
    content: `## Safety Procedures for Boiler B-12

Based on the **Boiler B-12 Engineering Manual** and **Safety Procedures Zone C**, the following safety protocols apply:

### Pre-Operation Checks
1. **Water Level Verification** — Ensure water level is between 60-80% of sight glass before ignition
2. **Safety Valve Testing** — Test both primary (150 PSI) and secondary (165 PSI) relief valves
3. **Gas Detection** — Perform LEL survey in boiler room before startup
4. **Interlock Testing** — Verify all 12 safety interlocks are functional

### Operating Limits
- Maximum operating pressure: **145 PSI**
- Maximum temperature: **366°F (186°C)**
- Minimum water level: **Low water cutoff at 55%**
- Required operator certification: **Grade 3 Boiler Operator License**

### Emergency Procedures
1. Activate emergency shutdown (ESD) button
2. Close main fuel supply valve
3. Open atmospheric vent
4. Contact Control Room (Ext. 2400)
5. Follow Emergency Response Plan ERP-B12-001

⚠️ **Critical Note**: The most recent inspection (June 2026) noted minor tube thinning in the convection section. Enhanced monitoring has been recommended with next inspection in 90 days.`,
    citations: [
      { document: "Boiler_B12_Engineering_Manual.pdf", page: 45, section: "Safety Systems & Interlocks", relevance_score: 0.97, text: "Boiler B-12 is equipped with 12 independent safety interlocks including high pressure cutoff, low water cutoff, flame failure detection..." },
      { document: "Safety_Procedures_Zone_C_2026.pdf", page: 8, section: "Boiler Operations Safety", relevance_score: 0.94, text: "All boiler operations in Zone C require a minimum Grade 3 Boiler Operator License. Pre-startup checklists must be completed..." },
      { document: "Plant_A_Maintenance_SOP_2026.pdf", page: 23, section: "Related Equipment Notes", relevance_score: 0.72, text: "Adjacent equipment including Boiler B-12 feedwater system should be monitored for cross-system impacts..." },
    ],
    confidence: 0.96,
    suggested_questions: ["When was Boiler B-12 last inspected?", "What are the emergency shutdown procedures?", "Show interlock testing records for B-12", "What maintenance is due for Boiler B-12?"],
  },
  maintenance: {
    content: `## Maintenance History — Pump P-101

Based on analysis of **7 documents** in the knowledge base, here is the comprehensive maintenance history for Centrifugal Pump P-101:

### Recent Maintenance Events

| Date | Type | Issue | Action | Downtime |
|------|------|-------|--------|----------|
| Jun 18, 2026 | Inspection | Seal degradation (Grade 3) | Monitoring increased | 0 hrs |
| May 15, 2026 | Corrective | Excessive vibration (8.2 mm/s) | Bearing replaced | 12 hrs |
| Apr 02, 2026 | Preventive | Scheduled overhaul | Complete seal kit replaced | 24 hrs |
| Feb 28, 2026 | Corrective | Seal leak detected | Emergency seal replacement | 8 hrs |
| Jan 10, 2026 | Preventive | Quarterly inspection | Alignment checked, within spec | 4 hrs |

### ⚠️ Recurring Issue Detected
**Seal failures** have occurred **3 times in the last 6 months**, indicating a systemic issue.

### Root Cause Analysis
The AI analysis suggests the recurring seal failures are likely caused by:
1. **Misalignment** between pump and motor (primary suspect)
2. **Process fluid contamination** with abrasive particles
3. **Operating beyond design flow** during peak demand

### Recommendations
- Perform **laser alignment** within the next 7 days
- Install **process fluid filtration** upstream of the pump
- Review **operating procedures** to prevent deadhead conditions

**Current Health Score: 45/100** ⚠️ Warning`,
    citations: [
      { document: "Pump_P101_Inspection_Report_June2026.pdf", page: 5, section: "Findings & Recommendations", relevance_score: 0.98, text: "Seal degradation classified as Grade 3 per API 682. Vibration readings at 8.2 mm/s exceed alarm threshold of 7.0 mm/s..." },
      { document: "Plant_A_Maintenance_SOP_2026.pdf", page: 23, section: "Centrifugal Pump Maintenance", relevance_score: 0.91, text: "Centrifugal pumps shall be inspected quarterly with vibration analysis. Seal replacement interval: 12 months or upon leakage..." },
      { document: "Turbine_T400_Maintenance_Log_2026.xlsx", page: 2, section: "Related Equipment", relevance_score: 0.76, text: "Pump P-101 feedwater supply to turbine T-400 showed flow irregularities correlating with pump vibration events..." },
    ],
    confidence: 0.94,
    suggested_questions: ["What is the root cause of P-101 seal failures?", "Show vibration trend data for Pump P-101", "What is the cost impact of P-101 downtime?", "Which other equipment is affected by P-101 issues?"],
  },
  compliance: {
    content: `## Current Compliance Risk Assessment

Based on analysis of **78 compliance records** and **89 audit reports**, here are the key compliance risks:

### 🔴 High Risk Gaps
1. **API 510 Pressure Vessel Inspection** — 3 vessels overdue for external inspection (>30 days past due)
2. **OSHA Lockout/Tagout** — 2 departments missing annual LOTO procedure review
3. **NFPA 70E Arc Flash** — Arc flash study for Substation B not updated after recent modifications

### 🟡 Medium Risk Gaps
4. **ISO 14001 Environmental** — Waste disposal records incomplete for Zone C (Q2 2026)
5. **Process Safety Management** — 4 P&IDs not updated after MOC #2026-015

### Overall Compliance Scorecard
- **ISO 45001**: 92% ✅
- **ISO 14001**: 85% ✅
- **OSHA 1910**: 78% ⚠️
- **API 510**: 65% 🔴
- **ASME PCC-2**: 88% ✅
- **NFPA 70E**: 71% ⚠️

**Aggregate Compliance Score: 78.4%**`,
    citations: [
      { document: "ISO_45001_Compliance_Audit_Q2.pdf", page: 12, section: "Non-Conformities", relevance_score: 0.96, text: "Three minor non-conformities identified in hazard identification and risk assessment procedures..." },
      { document: "OSHA_Compliance_Checklist_2026.pdf", page: 7, section: "Lockout/Tagout", relevance_score: 0.93, text: "Annual LOTO procedure review required per OSHA 1910.147(c)(6). Last review date for Electrical dept: March 2025..." },
    ],
    confidence: 0.92,
    suggested_questions: ["Generate a compliance audit report", "What is our ISO 45001 status?", "List all overdue inspections", "What are the OSHA requirements we're missing?"],
  },
  default: {
    content: `Based on my analysis of the uploaded industrial knowledge base, I can provide the following insights:

The ForgeIQ platform has processed **1,189 documents** covering maintenance procedures, inspection reports, compliance records, and engineering manuals across your industrial operations.

### Key Highlights
- **Knowledge Coverage**: 87.6% of operational topics are covered
- **Active Risks**: 12 items requiring attention
- **Compliance Score**: 78.4% across 6 regulatory frameworks
- **Equipment Monitored**: 342 assets with real-time health tracking

For more specific information, please ask about particular **equipment**, **procedures**, **compliance standards**, or **maintenance histories**. I can provide detailed answers with source citations and confidence scores.`,
    citations: [
      { document: "Plant_A_Maintenance_SOP_2026.pdf", page: 1, section: "General Overview", relevance_score: 0.89, text: "The plant maintenance program covers all rotating equipment, pressure vessels, and instrumentation systems..." },
    ],
    confidence: 0.85,
    suggested_questions: ["What are the safety procedures for Boiler B-12?", "Show maintenance history of Pump P-101", "Which documents reference ISO 45001?", "What compliance risks currently exist?"],
  },
};

function getResponse(msg: string) {
  const m = msg.toLowerCase();
  if (m.includes("safety") || m.includes("boiler") || m.includes("procedure") || m.includes("b-12") || m.includes("b12")) return DEMO_RESPONSES.safety;
  if (m.includes("maintenance") || m.includes("pump") || m.includes("p-101") || m.includes("p101") || m.includes("history") || m.includes("failure")) return DEMO_RESPONSES.maintenance;
  if (m.includes("compliance") || m.includes("risk") || m.includes("audit") || m.includes("iso") || m.includes("osha")) return DEMO_RESPONSES.compliance;
  return DEMO_RESPONSES.default;
}

function renderMarkdown(content: string) {
  // Simple markdown rendering
  let html = content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => c.trim().match(/^-+$/))) return '';
      const tag = cells[0].includes('---') ? 'th' : 'td';
      return `<tr>${cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('')}</tr>`;
    });
  return html;
}

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));

    const response = getResponse(msg);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response.content,
      citations: response.citations,
      confidence: response.confidence,
      suggested_questions: response.suggested_questions,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const confLevel = (c: number) => c >= 0.9 ? "high" : c >= 0.7 ? "medium" : "low";
  const confLabel = (c: number) => c >= 0.9 ? "High Confidence" : c >= 0.7 ? "Medium Confidence" : "Low Confidence";

  return (
    <div className="chat-container">
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1 className="page-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={22} style={{ color: "var(--accent-blue)" }} />
              Industrial Knowledge Copilot
            </h1>
            <p className="page-subtitle">AI-powered answers from your industrial knowledge base • RAG-enhanced • Source-cited</p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <span className="badge badge-info"><FileText size={12} /> 1,189 docs indexed</span>
            <span className="badge badge-success"><CheckCircle2 size={12} /> Online</span>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div style={{ maxWidth: 700, margin: "40px auto", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: "var(--gradient-brand)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "var(--shadow-glow-blue)" }}>
              <Sparkles size={28} color="white" />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>How can I help you today?</h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 32 }}>
              Ask me anything about your industrial knowledge base. I&apos;ll provide answers with source citations and confidence scores.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q.text)}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px",
                    background: "var(--bg-card)", border: "1px solid var(--border-primary)", borderRadius: 10,
                    cursor: "pointer", textAlign: "left", transition: "all 0.2s ease",
                    color: "var(--text-secondary)", fontSize: 13,
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = "var(--accent-blue)"; (e.target as HTMLElement).style.background = "var(--bg-card-hover)"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = "var(--border-primary)"; (e.target as HTMLElement).style.background = "var(--bg-card)"; }}
                >
                  <q.icon size={16} style={{ color: "var(--accent-blue)", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent-cyan)", marginBottom: 4 }}>{q.category}</div>
                    {q.text}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.role === "user" ? "user" : ""}`}>
            <div className={`chat-avatar ${msg.role === "user" ? "human" : "ai"}`}>
              {msg.role === "user" ? "U" : "F"}
            </div>
            <div style={{ maxWidth: 800 }}>
              <div className={`chat-bubble ${msg.role === "user" ? "user" : "ai"}`}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
              />

              {/* Citations */}
              {msg.citations && msg.citations.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>
                    📎 Source Citations ({msg.citations.length})
                  </div>
                  {msg.citations.map((c, i) => (
                    <div key={i} className="citation-card">
                      <div className="citation-doc">📄 {c.document}</div>
                      <div className="citation-text">&ldquo;{c.text}&rdquo;</div>
                      <div className="citation-meta">
                        <span>Page {c.page}</span>
                        <span>§ {c.section}</span>
                        <span>Relevance: {(c.relevance_score * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Confidence */}
              {msg.confidence && (
                <div className={`confidence-badge ${confLevel(msg.confidence)}`}>
                  <CheckCircle2 size={14} />
                  {confLabel(msg.confidence)} ({(msg.confidence * 100).toFixed(0)}%)
                </div>
              )}

              {/* Suggested follow-ups */}
              {msg.suggested_questions && (
                <div className="suggested-questions">
                  {msg.suggested_questions.map((q, i) => (
                    <button key={i} className="suggested-q" onClick={() => handleSend(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-message">
            <div className="chat-avatar ai">F</div>
            <div className="chat-bubble ai" style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 8, height: 8, borderRadius: "50%", background: "var(--accent-blue)",
                    animation: `pulse-glow 1.4s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
              <span style={{ fontSize: 13, color: "var(--text-tertiary)", marginLeft: 8 }}>
                Analyzing knowledge base...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Ask about equipment, safety, maintenance, compliance, or any industrial topic..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button className="chat-send-btn" onClick={() => handleSend()} disabled={!input.trim()}>
            <Send size={18} />
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: "var(--text-tertiary)" }}>
          ForgeIQ Copilot uses RAG to provide answers from your indexed documents with source citations
        </div>
      </div>
    </div>
  );
}
