import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { Search } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">
        Bem vindo de volta, <span className="font-bold">Mateus</span>
      </h1>
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">X results</InputGroupAddon>
      </InputGroup>
      <p className="text-3xl">Meus Agendamentos</p>
    </div>
  );
}
