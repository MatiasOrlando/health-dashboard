export type Condition =
  | "Type 2 Diabetes"
  | "Hypertension"
  | "Obesity"
  | "COPD"
  | "Heart Disease"
  | "Asthma";

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: Condition;
  email: string;
  phone: string;
  enrolledAt: string;
  lastCheckIn: string;
}

export interface Note {
  id: string;
  patientId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  mood: "positive" | "neutral" | "concerning";
}
