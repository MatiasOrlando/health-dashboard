import { Suspense } from "react";
import { PatientDetail } from "@/components/PatientDetail";
import { PatientDetailSkeleton } from "@/components/PatientDetailSkeleton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PatientPage({ params }: Props) {
  const { id } = await params;
  return (
    <Suspense fallback={<PatientDetailSkeleton />}>
      <PatientDetail id={id} />
    </Suspense>
  );
}
