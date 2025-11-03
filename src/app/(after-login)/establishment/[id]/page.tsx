"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function EstablishmentPage() {
  const params = useParams<{ id: string }>();

  return <div>Establishment Page for ID: {params.id}</div>;
}
