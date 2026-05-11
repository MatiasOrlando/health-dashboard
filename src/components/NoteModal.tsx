"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useCreateNote, useUpdateNote } from "@/lib/hooks";
import { Note } from "@/lib/types";

interface Props {
  patientId: string;
  note: Note | null;
  onClose: () => void;
}

export function NoteModal({ patientId, note, onClose }: Props) {
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();

  const [content, setContent] = useState(note?.content ?? "");
  const [mood, setMood] = useState<Note["mood"]>(note?.mood ?? "neutral");

  const isPending = createNote.isPending || updateNote.isPending;
  const isEditing = !!note;

  async function handleSubmit() {
    if (!content.trim()) return;
    if (isEditing) {
      await updateNote.mutateAsync({ id: note.id, patientId, data: { content, mood } });
    } else {
      await createNote.mutateAsync({ patientId, content, mood });
    }
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isEditing ? "Edit note" : "Add coaching note"}</h2>
          <button className="btn-icon" onClick={onClose}><X size={14} /></button>
        </div>

        <div className="form-group">
          <label className="form-label">Note</label>
          <textarea
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your coaching observation..."
            rows={4}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Mood assessment</label>
          <select className="form-select" value={mood} onChange={(e) => setMood(e.target.value as Note["mood"])}>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="concerning">Concerning</option>
          </select>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Saving..." : isEditing ? "Save changes" : "Add note"}
          </button>
        </div>
      </div>
    </div>
  );
}
