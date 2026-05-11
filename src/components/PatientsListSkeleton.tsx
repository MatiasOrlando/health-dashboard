export function PatientsListSkeleton() {
  return (
    <div>
      <div className="stats-bar">
        <div className="stat-chip">
          <div className="skeleton" style={{ width: 80, height: 20 }} />
        </div>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="patients-table">
          <thead>
            <tr>
              <th>Patient</th><th>Age</th><th>Condition</th><th>Last Check-in</th><th></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td>
                  <div className="patient-name-cell">
                    <div className="skeleton" style={{ width: 32, height: 32, borderRadius: "50%" }} />
                    <div>
                      <div className="skeleton" style={{ width: 120, height: 14, marginBottom: 4 }} />
                      <div className="skeleton" style={{ width: 160, height: 11 }} />
                    </div>
                  </div>
                </td>
                <td><div className="skeleton" style={{ width: 24, height: 14 }} /></td>
                <td><div className="skeleton" style={{ width: 110, height: 22, borderRadius: 999 }} /></td>
                <td><div className="skeleton" style={{ width: 80, height: 14 }} /></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PatientDetailSkeleton() {
  return (
    <div>
      <div className="skeleton" style={{ width: 100, height: 14, marginBottom: "1.5rem" }} />
      <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", marginBottom: "2rem" }}>
        <div className="skeleton" style={{ width: 56, height: 56, borderRadius: "50%" }} />
        <div>
          <div className="skeleton" style={{ width: 180, height: 20, marginBottom: 8 }} />
          <div className="skeleton" style={{ width: 240, height: 13 }} />
        </div>
      </div>
      <div className="detail-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="detail-item">
            <div className="skeleton" style={{ width: 60, height: 11, marginBottom: 6 }} />
            <div className="skeleton" style={{ width: 100, height: 16 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
