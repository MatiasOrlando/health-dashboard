import { Patient, Note } from "./types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Seed data
let patients: Patient[] = [
  {
    id: "p1",
    name: "Elena Voss",
    age: 54,
    condition: "Type 2 Diabetes",
    email: "elena.voss@email.com",
    phone: "+31 6 12345678",
    enrolledAt: "2023-09-01",
    lastCheckIn: "2024-03-10",
  },
  {
    id: "p2",
    name: "Marcus Trek",
    age: 67,
    condition: "Hypertension",
    email: "marcus.thiel@email.com",
    phone: "+31 6 87654321",
    enrolledAt: "2023-11-15",
    lastCheckIn: "2024-03-08",
  },
  {
    id: "p3",
    name: "Liam Neeson",
    age: 41,
    condition: "Obesity",
    email: "lien.nguyen@email.com",
    phone: "+31 6 11223344",
    enrolledAt: "2024-01-20",
    lastCheckIn: "2024-03-12",
  },
  {
    id: "p4",
    name: "Martin Gerard",
    age: 59,
    condition: "COPD",
    email: "david.okafor@email.com",
    phone: "+31 6 55667788",
    enrolledAt: "2023-07-04",
    lastCheckIn: "2024-02-28",
  },
  {
    id: "p5",
    name: "Sofía Martínez",
    age: 48,
    condition: "Heart Disease",
    email: "sofia.martinez@email.com",
    phone: "+31 6 99887766",
    enrolledAt: "2023-12-01",
    lastCheckIn: "2024-03-05",
  },
  {
    id: "p6",
    name: "Peter Vries",
    age: 33,
    condition: "Asthma",
    email: "pieter.devries@email.com",
    phone: "+31 6 44556677",
    enrolledAt: "2024-02-10",
    lastCheckIn: "2024-03-11",
  },
];

let notes: Note[] = [
  {
    id: "n1",
    patientId: "p1",
    content:
      "Patient reported improved energy levels. Blood sugar readings are within target range this week. Encouraged to maintain current diet plan.",
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
    mood: "positive",
  },
  {
    id: "n2",
    patientId: "p1",
    content:
      "Missed two medication doses this week. Patient mentioned work stress as a factor. Discussed strategies for adherence.",
    createdAt: "2024-03-03T14:30:00Z",
    updatedAt: "2024-03-03T14:30:00Z",
    mood: "concerning",
  },
  {
    id: "n3",
    patientId: "p2",
    content:
      "Blood pressure stable at 128/82. Patient is walking 30 minutes daily. Sodium intake could be reduced further.",
    createdAt: "2024-03-08T09:15:00Z",
    updatedAt: "2024-03-08T09:15:00Z",
    mood: "neutral",
  },
  {
    id: "n4",
    patientId: "p3",
    content:
      "Lost 1.5kg this month. Patient is motivated and tracking meals consistently. Introduced resistance training recommendation.",
    createdAt: "2024-03-12T11:00:00Z",
    updatedAt: "2024-03-12T11:00:00Z",
    mood: "positive",
  },
  {
    id: "n5",
    patientId: "p4",
    content:
      "Reported increased shortness of breath during cold weather. Inhaler technique reviewed and corrected. Follow-up scheduled.",
    createdAt: "2024-02-28T16:00:00Z",
    updatedAt: "2024-02-28T16:00:00Z",
    mood: "concerning",
  },
];

// API functions 

export const api = {
  // Patients
  async getPatients(): Promise<Patient[]> {
    await delay(3000);
    return [...patients];
  },

  async getPatient(id: string): Promise<Patient | undefined> {
    await delay(300);
    return patients.find((p) => p.id === id);
  },

  async createPatient(
    data: Omit<Patient, "id" | "enrolledAt" | "lastCheckIn">
  ): Promise<Patient> {
    await delay(500);
    const newPatient: Patient = {
      ...data,
      id: `p${Date.now()}`,
      enrolledAt: new Date().toISOString().split("T")[0],
      lastCheckIn: new Date().toISOString().split("T")[0],
    };
    patients = [...patients, newPatient];
    return newPatient;
  },

  async updatePatient(id: string, data: Partial<Patient>): Promise<Patient> {
    await delay(400);
    patients = patients.map((p) => (p.id === id ? { ...p, ...data } : p));
    return patients.find((p) => p.id === id)!;
  },

  async deletePatient(id: string): Promise<void> {
    await delay(400);
    patients = patients.filter((p) => p.id !== id);
    notes = notes.filter((n) => n.patientId !== id);
  },

  // Notes
  async getNotes(patientId: string): Promise<Note[]> {
    await delay(350);
    return notes.filter((n) => n.patientId === patientId);
  },

  async createNote(
    data: Omit<Note, "id" | "createdAt" | "updatedAt">
  ): Promise<Note> {
    await delay(400);
    const newNote: Note = {
      ...data,
      id: `n${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes = [...notes, newNote];
    return newNote;
  },

  async updateNote(id: string, data: Partial<Note>): Promise<Note> {
    await delay(400);
    notes = notes.map((n) =>
      n.id === id ? { ...n, ...data, updatedAt: new Date().toISOString() } : n
    );
    return notes.find((n) => n.id === id)!;
  },

  async deleteNote(id: string): Promise<void> {
    await delay(300);
    notes = notes.filter((n) => n.id !== id);
  },
};
