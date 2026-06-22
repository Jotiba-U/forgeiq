"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Network,
  Wrench,
  ShieldCheck,
  Lightbulb,
  Upload,
  Bell,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "OVERVIEW", items: [] },
  { href: "/", icon: LayoutDashboard, label: "Dashboard", badge: null },
  { label: "INTELLIGENCE", items: [] },
  { href: "/copilot", icon: MessageSquare, label: "Knowledge Copilot", badge: null },
  { href: "/documents", icon: FileText, label: "Documents", badge: "1,247" },
  { href: "/knowledge-graph", icon: Network, label: "Knowledge Graph", badge: null },
  { label: "AGENTS", items: [] },
  { href: "/maintenance", icon: Wrench, label: "Maintenance Intel", badge: "3" },
  { href: "/compliance", icon: ShieldCheck, label: "Compliance Intel", badge: "6" },
  { href: "/lessons", icon: Lightbulb, label: "Lessons Learned", badge: null },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">F</div>
        <div>
          <div className="sidebar-logo-text">ForgeIQ</div>
        </div>
        <span className="sidebar-logo-badge">AI</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          if ("items" in item && item.items !== undefined && !item.href) {
            return (
              <div key={i} className="sidebar-section-label">
                {item.label}
              </div>
            );
          }

          if (!item.href || !item.icon) return null;

          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              <Icon className="sidebar-link-icon" size={18} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="sidebar-link-badge">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "12px", borderTop: "1px solid var(--border-primary)" }}>
        <div className="sidebar-link" style={{ cursor: "pointer" }}>
          <Settings size={18} className="sidebar-link-icon" />
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );
}
