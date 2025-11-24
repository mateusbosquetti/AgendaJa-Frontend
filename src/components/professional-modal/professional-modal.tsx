"use client";

import { X } from "lucide-react";
import SearchBar from "../search-bar/search-bar";
import { useEffect, useState } from "react";
import { UserService } from "@/src/services/user.service";
import { UserResponse } from "@/src/types/user/user-response.type";
import { set } from "zod";
import { UserMeResponse } from "@/src/types/user/user-me-response.type";
import { UserEstablishmentService } from "@/src/services/user-establishment.service";
import { FunctionRole } from "@/src/enum/function-role.enum";

interface ProfessionalModalProps {
  onClose: () => void;
  establishmentId: number;
}

export default function ProfessionalModal({ onClose, establishmentId }: ProfessionalModalProps) {
  const [users, setUsers] = useState<UserMeResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchProfessionals = async () => {
      const data = await UserService.getAllUsers(0, 5, searchQuery);
      setUsers(data.content);
    };
    fetchProfessionals();
  }, [searchQuery]);

  const handleSelect = async (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      const data = await UserEstablishmentService.addUserToEstablishment({
        userId: user.id,
        establishmentId: establishmentId, // Replace with actual establishment ID
        role: FunctionRole.EMPLOYEE, // Replace with actual role
      });
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background relative w-full max-w-2xl rounded-lg p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mt-2">
          <h2 className="text-2xl font-bold">Novo Profissional</h2>
          <p className="text-muted-foreground mt-2">
            Adicione um novo profissional ao estabelecimento.
          </p>
          <SearchBar
            data={users.map((user) => ({ id: user.id, label: user.name }))}
            placeholder="Digite o nome de alguém"
            onChange={(e) => setSearchQuery(e)}
            onSelect={(id) => handleSelect(id)}
          />
        </div>
      </div>
    </div>
  );
}
