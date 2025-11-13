import { FunctionRole } from "@/src/enum/function-role.enum";
import { UserEstablishmentResponseDTO } from "@/src/types/user-establishment/user-establishment-response.type";

interface ProfessionalCardProps {
  userEstablishment: UserEstablishmentResponseDTO;
}

export default function ProfessionalCard({ userEstablishment }: ProfessionalCardProps) {
  const translateRole = (role: FunctionRole) => {
    switch (role) {
      case FunctionRole.OWNER:
        return "Dono";
      case FunctionRole.EMPLOYEE:
        return "Funcionário";
      default:
        return "Desconhecido";
    }
  };

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h2 className="text-xl font-semibold">{userEstablishment.userName}</h2>
      <p className="text-muted-foreground">{translateRole(userEstablishment.role)}</p>
    </div>
  );
}
