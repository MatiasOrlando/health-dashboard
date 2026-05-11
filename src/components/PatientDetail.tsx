"use client";

import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, FileText } from "lucide-react";
import { usePatient, useNotes, useDeleteNote } from "@/lib/hooks";
import { Note } from "@/lib/types";
import { useState } from "react";
import { NoteModal } from "./NoteModal";
import { ConfirmDialog } from "./ConfirmDialog";

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

interface Props { id: string; }

export function PatientDetail({ id }: Props) {
  const { data: patient, isLoading: loadingPatient } = usePatient(id);
  const { data: notes = [], isLoading: loadingNotes } = useNotes(id);
  const deleteNote = useDeleteNote();

  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  if (loadingPatient) return <div>Loading...</div>;
  if (!patient) return <div>Patient not found.</div>;

  return (
    <>
      <Link href="/patients" className="back-link">
        <ArrowLeft size={13} />
        All patients
      </Link>

      <div className="patient-detail-header">
        <div className="patient-detail-avatar">{initials(patient.name)}</div>
        <div>
          <div className="patient-detail-name">{patient.name}</div>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>
            {patient.email} · {patient.phone}
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-item">
          <div className="detail-label">Age</div>
          <div className="detail-value">{patient.age} years</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Condition</div>
          <div className="detail-value">{patient.condition}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Last check-in</div>
          <div className="detail-value">{patient.lastCheckIn}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Enrolled</div>
          <div className="detail-value">{patient.enrolledAt}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Total notes</div>
          <div className="detail-value">{notes.length}</div>
        </div>
      </div>

      {/* Notes section */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.02em" }}>Coaching notes</h2>
        <button className="btn-primary" onClick={() => { setEditingNote(null); setNoteModalOpen(true); }}>
          <Plus size={13} />
          Add note
        </button>
      </div>

      {loadingNotes ? (
        <div>Loading notes...</div>
      ) : notes.length === 0 ? (
        <div className="empty-state">
          <FileText size={24} />
          <p>No notes yet. Add the first coaching note.</p>
        </div>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className={`note-card ${note.mood}`}>
              <div className="note-meta">
                <span className="note-date">{formatDate(note.createdAt)}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className={`note-mood ${note.mood}`}>{note.mood}</span>
                  <button className="btn-icon" onClick={() => { setEditingNote(note); setNoteModalOpen(true); }}>
                    <Pencil size={12} />
                  </button>
                  <button className="btn-icon danger" onClick={() => setDeletingNoteId(note.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <p className="note-content">{note.content}</p>
            </div>
          ))}
        </div>
      )}

      {noteModalOpen && (
        <NoteModal
          patientId={id}
          note={editingNote}
          onClose={() => setNoteModalOpen(false)}
        />
      )}

      {deletingNoteId && (
        <ConfirmDialog
          title="Delete note"
          message="This will permanently remove this coaching note."
          onConfirm={async () => {
            await deleteNote.mutateAsync({ id: deletingNoteId, patientId: id });
            setDeletingNoteId(null);
          }}
          onCancel={() => setDeletingNoteId(null)}
          loading={deleteNote.isPending}
        />
      )}
    </>
  );
}
