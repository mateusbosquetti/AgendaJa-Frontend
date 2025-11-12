"use client";

import { EstablishmentService } from "@/src/services/establishment.service";
import { EstablishmentResponse } from "@/src/types/establishment/establishment-response.type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EstablishmentPage() {
  const params = useParams<{ id: string }>();

  const [establishment, setEstablishment] = useState<EstablishmentResponse | null>(null);

  useEffect(() => {
    const fetchEstablishment = async () => {
      EstablishmentService.getEstablishmentById(Number(params.id)).then((data) =>
        setEstablishment(data)
      );
    };

    fetchEstablishment();
  }, [params.id]);

  if (!establishment) {
    return <div>Loading...</div>;
  }

  return <div>Establishment Page for ID: {params.id}</div>;
}
