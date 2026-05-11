"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useCreatePatient, useUpdatePatient } from "@/lib/hooks";
import { Patient, Condition } from "@/lib/types";

const CONDITIONS: Condition[] = [
  "Type 2 Diabetes",
  "Hypertension",
  "Obesity",
  "COPD",
  "Heart Disease",
  "Asthma",
];

interface Props {
  patient: Patient | null;
  onClose: () => void;
}

export function PatientModal({ patient, onClose }: Props) {
  const createPatient = useCreatePatient();
  const updatePatient = useUpdatePatient();

  const [form, setForm] = useState({
    name: patient?.name ?? "",
    age: patient?.age?.toString() ?? "",
    condition: patient?.condition ?? ("Type 2 Diabetes" as Condition),
    email: patient?.email ?? "",
    phone: patient?.phone ?? "",
  });

  const isEditing = !!patient;
  const isPending = createPatient.isPending || updatePatient.isPending;

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.name || !form.age || !form.email) return;
    const data = {
      name: form.name,
      age: parseInt(form.age),
      condition: form.condition,
      email: form.email,
      phone: form.phone,
    };
    if (isEditing) {
      await updatePatient.mutateAsync({ id: patient.id, data });
    } else {
      await createPatient.mutateAsync(data);
    }
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isEditing ? "Edit patient" : "Add patient"}</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={14} />
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Full name</label>
          <input className="form-input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Elena Voss" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Age</label>
            <input className="form-input" type="number" value={form.age} onChange={(e) => set("age", e.target.value)} placeholder="45" />
          </div>
          <div className="form-group">
            <label className="form-label">Condition</label>
            <select className="form-select" value={form.condition} onChange={(e) => set("condition", e.target.value)}>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="patient@email.com" />
        </div>

        <div className="form-group">
          <label className="form-label">Phone</label>
          <input className="form-input" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+31 6 12345678" />
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Saving..." : isEditing ? "Save changes" : "Add patient"}
          </button>
        </div>
      </div>
    </div>
  );
}
