import { Suspense } from "react";
import { PatientsList } from "@/components/PatientsList";
import { PatientsListSkeleton } from "@/components/PatientsListSkeleton";

export const metadata = {
  title: "Health Dashboard",
};

export default function PatientsPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Patients</h1>
          <p className="page-subtitle">Manage and track your patient roster</p>
        </div>
      </div>

      <Suspense fallback={<PatientsListSkeleton />}>
        <PatientsList />
      </Suspense>
    </div>
  );
}
