"use client";

import SearchBar from "@/src/components/search-bar/search-bar";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
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
          Bem vindo de volta, <span className="font-bold">Mateus</span>
        </h1>
        <SearchBar
          data={mockData}
          onSelect={(item) => {
            console.log(item);

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
