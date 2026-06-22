# 🔥 ForgeIQ — Industrial Knowledge Intelligence Platform

<div align="center">

### AI-Powered Operational Intelligence for Industrial Organizations

**ET AI Hackathon 2026 — Problem Statement 8**

*Transform fragmented industrial knowledge into a unified AI-powered operational intelligence platform*

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ForgeIQ Platform                       │
├─────────────┬───────────────┬───────────────────────────┤
│  Frontend   │   Backend     │      AI Layer             │
│  Next.js 15 │   FastAPI     │  Gemini 2.5 Pro/Flash     │
│  TypeScript │   Python      │  LangChain                │
│  Tailwind   │   PostgreSQL  │  ChromaDB                 │
│  shadcn/ui  │   SQLAlchemy  │  NetworkX                 │
│  Recharts   │               │                           │
└─────────────┴───────────────┴───────────────────────────┘
```

## 🚀 Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# → http://localhost:8000/docs
```

### Docker (Full Stack)
```bash
docker-compose up -d
```

## 📦 Platform Modules

| Module | Description |
|--------|-------------|
| 📊 **Executive Dashboard** | KPI cards, charts, risk heatmaps, real-time analytics |
| 🤖 **Knowledge Copilot** | RAG-powered AI assistant with citations & confidence scores |
| 📄 **Document Intelligence** | Upload, OCR, classify, chunk, and embed industrial documents |
| 🕸️ **Knowledge Graph** | Interactive entity-relationship visualization with NetworkX |
| 🔧 **Maintenance Intelligence** | Equipment health, failure analytics, predictive maintenance |
| 🛡️ **Compliance Intelligence** | Regulatory gap analysis, audit reports, risk scoring |
| 💡 **Lessons Learned** | Pattern detection, incident analysis, preventive recommendations |

## 🏆 Hackathon Differentiators

- **Multi-Agent AI Architecture** — 6 specialized AI agents working in parallel
- **Knowledge Graph Intelligence** — Automatic entity extraction and relationship mapping
- **Explainable AI** — Every response includes source citations and confidence scores
- **Compliance Intelligence** — Automated regulatory gap analysis and audit reporting
- **Failure Pattern Detection** — AI-powered pattern recognition across maintenance history
- **Quantified Business Impact** — ROI calculations and cost-benefit analysis for every recommendation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Framer Motion
- **Backend**: FastAPI, Python 3.11
- **Database**: PostgreSQL 16
- **Vector Store**: ChromaDB
- **AI Models**: Google Gemini 2.5 Pro / Flash
- **Frameworks**: LangChain, NetworkX
- **Deployment**: Docker, Docker Compose

## 📁 Project Structure

```
forgeiq/
├── frontend/           # Next.js 15 App
│   ├── src/app/        # App Router pages (7 pages)
│   ├── src/components/ # Reusable components
│   └── src/lib/        # Utilities & API client
├── backend/            # FastAPI Backend
│   ├── app/api/        # REST API routes
│   ├── app/agents/     # Multi-agent system
│   ├── app/models/     # SQLAlchemy models
│   └── app/services/   # Business logic
└── docker-compose.yml  # Full stack deployment
```

---

<div align="center">

**Built for ET AI Hackathon 2026** 🏆

</div>
