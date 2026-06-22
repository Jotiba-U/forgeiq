import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function getHealthColor(health: number): string {
  if (health >= 80) return "#22c55e";
  if (health >= 60) return "#f59e0b";
  if (health >= 40) return "#f97316";
  return "#ef4444";
}

export function getHealthStatus(health: number): string {
  if (health >= 90) return "Excellent";
  if (health >= 80) return "Good";
  if (health >= 60) return "Fair";
  if (health >= 40) return "Warning";
  return "Critical";
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "compliant":
    case "excellent":
    case "good":
      return "#22c55e";
    case "partial":
    case "fair":
    case "warning":
      return "#f59e0b";
    case "at_risk":
    case "non_compliant":
    case "critical":
      return "#ef4444";
    default:
      return "#6b7280";
  }
}

const API_BASE = "/api";

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}
