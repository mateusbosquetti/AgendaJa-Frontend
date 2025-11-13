import { FunctionRole } from "@/src/enum/function-role.enum";

export type UserEstablishmentResponseDTO = {
  establishmentId: number;
  userId: number;
  userName: string;
  role: FunctionRole;
};
