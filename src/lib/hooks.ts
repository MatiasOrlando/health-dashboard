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
    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: queryKeys.patients });
      const previous = qc.getQueryData(queryKeys.patients);
      qc.setQueryData(queryKeys.patients, (old: Patient[]) =>
        old.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      qc.setQueryData(queryKeys.patients, context?.previous);
    },
    onSettled: (_, __, { id }) => {
      qc.invalidateQueries({ queryKey: queryKeys.patients });
      qc.invalidateQueries({ queryKey: queryKeys.patient(id) });
    },
  });
}

export function useDeletePatient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deletePatient(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: queryKeys.patients });
      const previous = qc.getQueryData(queryKeys.patients);
      qc.setQueryData(queryKeys.patients, (old: Patient[]) =>
        old.filter((p) => p.id !== id)
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      qc.setQueryData(queryKeys.patients, context?.previous);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: queryKeys.patients });
    },
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
    mutationFn: ({ id, patientId, data }: { id: string; patientId: string; data: Partial<Note> }) =>
      api.updateNote(id, data),
    onMutate: async ({ id, patientId, data }) => {
      await qc.cancelQueries({ queryKey: queryKeys.notes(patientId) });
      const previous = qc.getQueryData(queryKeys.notes(patientId));
      qc.setQueryData(queryKeys.notes(patientId), (old: Note[]) =>
        old.map((n) => (n.id === id ? { ...n, ...data } : n))
      );
      return { previous };
    },
    onError: (_err, { patientId }, context) => {
      qc.setQueryData(queryKeys.notes(patientId), context?.previous);
    },
    onSettled: (_, __, { patientId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.notes(patientId) });
    },
  });
}

export function useDeleteNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patientId }: { id: string; patientId: string }) =>
      api.deleteNote(id),
    onMutate: async ({ id, patientId }) => {
      await qc.cancelQueries({ queryKey: queryKeys.notes(patientId) });
      const previous = qc.getQueryData(queryKeys.notes(patientId));
      qc.setQueryData(queryKeys.notes(patientId), (old: Note[]) =>
        old.filter((n) => n.id !== id)
      );
      return { previous };
    },
    onError: (_err, { patientId }, context) => {
      qc.setQueryData(queryKeys.notes(patientId), context?.previous);
    },
    onSettled: (_, __, { patientId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.notes(patientId) });
    },
  });
}
