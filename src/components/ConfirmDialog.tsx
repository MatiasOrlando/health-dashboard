"use client";

import { AlertTriangle } from "lucide-react";

interface Props {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ConfirmDialog({ title, message, onConfirm, onCancel, loading }: Props) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" style={{ maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "var(--radius-md)",
            background: "var(--danger-light)", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
          }}>
            <AlertTriangle size={16} style={{ color: "var(--danger)" }} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "0.375rem" }}>{title}</div>
            <div style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{message}</div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button
            className="btn-primary"
            style={{ background: "var(--danger)" }}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
