"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Pencil, Trash2, Users } from "lucide-react";
import {
  usePatients,
  useDeletePatient,
} from "@/lib/hooks";
import { Patient } from "@/lib/types";
import { PatientModal } from "./PatientModal";
import { ConfirmDialog } from "./ConfirmDialog";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function PatientsList() {
  const router = useRouter();
  const { data: patients = [], isLoading } = usePatients();
  const deletePatient = useDeletePatient();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleEdit(e: React.MouseEvent, patient: Patient) {
    e.stopPropagation();
    setEditingPatient(patient);
    setModalOpen(true);
  }

  function handleDeleteClick(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setDeletingId(id);
  }

  async function confirmDelete() {
    if (!deletingId) return;
    await deletePatient.mutateAsync(deletingId);
    setDeletingId(null);
  }

  return (
    <>
      <div className="stats-bar">
        <div className="stat-chip">
          <Users size={15} style={{ color: "var(--accent)" }} />
          <span className="stat-number">{patients.length}</span>
          <span className="stat-label">Total patients</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
        <div className="search-bar" style={{ marginBottom: 0, flex: 1 }}>
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            setEditingPatient(null);
            setModalOpen(true);
          }}
        >
          <Plus size={14} />
          Add patient
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: "auto" }}>
        {isLoading ? (
          <div style={{ padding: "1.5rem" }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <Users size={28} />
            <p>{search ? "No patients match your search." : "No patients yet. Add one to get started."}</p>
          </div>
        ) : (
          <table className="patients-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Age</th>
                <th>Condition</th>
                <th>Last Check-in</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient) => (
                <tr key={patient.id} onClick={() => router.push(`/patients/${patient.id}`)}>
                  <td>
                    <div className="patient-name-cell">
                      <div className="patient-avatar">{initials(patient.name)}</div>
                      <div>
                        <div className="patient-name">{patient.name}</div>
                        <div className="patient-email">{patient.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{patient.age}</td>
                  <td>
                    <span className="condition-badge">{patient.condition}</span>
                  </td>
                  <td style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)", fontSize: "12.5px" }}>
                    {patient.lastCheckIn}
                  </td>
                  <td>
                    <div className="action-btns">
                      <button
                        className="btn-icon"
                        title="Edit"
                        onClick={(e) => handleEdit(e, patient)}
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        className="btn-icon danger"
                        title="Delete"
                        onClick={(e) => handleDeleteClick(e, patient.id)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <PatientModal
          patient={editingPatient}
          onClose={() => setModalOpen(false)}
        />
      )}

      {deletingId && (
        <ConfirmDialog
          title="Delete patient"
          message="This will permanently remove the patient and all their notes. This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setDeletingId(null)}
          loading={deletePatient.isPending}
        />
      )}
    </>
  );
}
