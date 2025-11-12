"use client";

import { EstablishmentSummaryResponse } from "@/src/types/establishment/establishment-all-response.type";
import { useRouter } from "next/navigation";

interface EstablishmentCardProps {
  establishment: EstablishmentSummaryResponse;
}

export default function EstablishmentCard({ establishment }: EstablishmentCardProps) {
  const router = useRouter();

  return (
    <div
      className="bg-foreground/10 hover:bg-foreground/20 transition-colors duration-200 cursor-pointer rounded-lg p-4"
      onClick={() => {
        router.push(`/establishment/${establishment.id}`);
      }}
    >
      <p>{establishment.id}</p>
      <p>{establishment.name}</p>
      <p>{establishment.cnpj}</p>
    </div>
  );
}
