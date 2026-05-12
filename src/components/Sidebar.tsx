"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-logo">
        {!collapsed && <span>health<em>coachs</em></span>}
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <Link
          href="/patients"
          className={`nav-item ${pathname.startsWith("/patients") ? "active" : ""}`}
          title="Patients"
        >
          <Users size={15} />
          {!collapsed && "Patients"}
        </Link>
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="coach-badge">
            <div className="coach-avatar">MO</div>
            <div>
              <div className="coach-name">Matias Orlando</div>
              <div className="coach-role">Health Coach</div>
            </div>
          </div>
        )}
        {collapsed && <div className="coach-avatar">MO</div>}
      </div>
    </aside>
  );
}
