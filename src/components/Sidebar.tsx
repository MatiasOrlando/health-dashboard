import Link from "next/link";
import { Users, LayoutDashboard } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>
          health<em>coachs</em>
        </span>
      </div>

      <nav className="sidebar-nav">
        <Link href="/" className="nav-item">
          <LayoutDashboard size={15} />
          Overview
        </Link>
        <Link href="/patients" className="nav-item active">
          <Users size={15} />
          Patients
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="coach-badge">
          <div className="coach-avatar">MO</div>
          <div>
            <div className="coach-name">Matias Orlando</div>
            <div className="coach-role">Health Coach</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
