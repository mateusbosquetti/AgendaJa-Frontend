"use client";

import { Button } from "@/components/ui/button";
import SearchBar from "@/src/components/search-bar/search-bar";
import { useUser } from "@/src/context/user-context";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function HomePage() {
  const router = useRouter();
  const { user, toggleTheme } = useUser();
  const mockData = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Raspberry",
    "Strawberry",
    "Tangerine",
    "Watermelon",
  ];

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">
          Bem vindo de volta, <span className="font-bold">{user?.name}</span>
        </h1>
        <p className="text-muted-foreground text-sm">{JSON.stringify(user, null, 2)}</p>
        <Button onClick={toggleTheme}>Toggle Theme</Button>
        <SearchBar
          data={mockData}
          onSelect={(item) => {
            router.push(`/item/${encodeURIComponent(item.toLowerCase())}`);
          }}
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
