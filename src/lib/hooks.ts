import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { Note, Patient } from "./types";

// --- Query keys ---
export const queryKeys = {
  patients: ["patients"] as const,
  patient: (id: string) => ["patients", id] as const,
  notes: (patientId: string) => ["notes", patientId] as const,
};

// --- Patient hooks ---
export function usePatients() {
  return useQuery({
    queryKey: queryKeys.patients,
    queryFn: api.getPatients,
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: queryKeys.patient(id),
    queryFn: () => api.getPatient(id),
    enabled: !!id,
  });
}

export function useCreatePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Patient, "id" | "enrolledAt" | "lastCheckIn">) =>
      api.createPatient(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.patients }),
  });
}

export function useUpdatePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Patient> }) =>
      api.updatePatient(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: queryKeys.patients });
      qc.invalidateQueries({ queryKey: queryKeys.patient(id) });
    },
  });
}

export function useDeletePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deletePatient(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.patients }),
  });
}

// --- Notes hooks ---
export function useNotes(patientId: string) {
  return useQuery({
    queryKey: queryKeys.notes(patientId),
    queryFn: () => api.getNotes(patientId),
    enabled: !!patientId,
  });
}

export function useCreateNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Note, "id" | "createdAt" | "updatedAt">) =>
      api.createNote(data),
    onSuccess: (_, { patientId }) =>
      qc.invalidateQueries({ queryKey: queryKeys.notes(patientId) }),
  });
}

export function useUpdateNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      patientId,
      data,
    }: {
      id: string;
      patientId: string;
      data: Partial<Note>;
    }) => api.updateNote(id, data),
    onSuccess: (_, { patientId }) =>
      qc.invalidateQueries({ queryKey: queryKeys.notes(patientId) }),
  });
}

export function useDeleteNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patientId }: { id: string; patientId: string }) =>
      api.deleteNote(id),
    onSuccess: (_, { patientId }) =>
      qc.invalidateQueries({ queryKey: queryKeys.notes(patientId) }),
  });
}
