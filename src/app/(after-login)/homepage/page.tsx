"use client";

import { Button } from "@/components/ui/button";
import SearchBar from "@/src/components/search-bar/search-bar";
import { useUser } from "@/src/context/user-context";
import { EstablishmentService } from "@/src/services/establishment.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const { user, toggleTheme } = useUser();
  
  const [establishments, setEstablishments] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchEstablishments = async () => {
      EstablishmentService.getEstablishments(0, 5, query).then((data) => {
        setEstablishments(data.content.map((est) => est.name));
      });
    };
    fetchEstablishments();
  }, [query]);

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
          data={establishments}
          onSelect={(item) => {
            router.push(`/establishment/1}`);
          }}
          onChange={handleQueryChange}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-3xl">Meus Agendamentos</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-3xl">Estabelecimentos Próximos</p>
      </div>
    </div>
  );
}
