"use client";

import { Button } from "@/components/ui/button";
import EstablishmentCard from "@/src/components/establishment/card/establishment-card";
import SearchBar from "@/src/components/search-bar/search-bar";
import { useUser } from "@/src/context/user-context";
import { EstablishmentService } from "@/src/services/establishment.service";
import {
  EstablishmentSummaryResponse,
} from "@/src/types/establishment/establishment-all-response.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const { user, toggleTheme } = useUser();

  const [establishments, setEstablishments] = useState<EstablishmentSummaryResponse[]>([]);
  const [establishmentsQuery, setEstablishmentsQuery] = useState<EstablishmentSummaryResponse[]>(
    []
  );
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchEstablishments = async () => {
      EstablishmentService.getEstablishments(0, 5, query).then((data) =>
        setEstablishmentsQuery(data.content)
      );
    };
    fetchEstablishments();
  }, [query]);

  useEffect(() => {
    const fetchEstablishments = async () => {
      EstablishmentService.getEstablishments(0, 5).then((data) => setEstablishments(data.content));
    };
    fetchEstablishments();
  }, []);

  const handleQueryChange = (item: string) => {
    setQuery(item);
  };

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">
          Bem vindo de volta, <span className="font-bold">{user?.name}</span>
        </h1>
        <p className="text-muted-foreground text-sm">{JSON.stringify(user, null, 2)}</p>
        <Button onClick={toggleTheme}>Toggle Theme</Button>
        <SearchBar
          data={establishmentsQuery.map((establishment) => ({
            id: establishment.id,
            label: establishment.name,
          }))}
          placeholder="Digite o nome do estabelecimento"
          onSelect={(item) => {
            router.push(`/establishment/${item}`);
          }}
          onChange={handleQueryChange}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-3xl">Meus Agendamentos</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-3xl">Estabelecimentos Próximos</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {establishments.map((establishment) => (
            <div key={establishment.id}>
              <EstablishmentCard establishment={establishment} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
