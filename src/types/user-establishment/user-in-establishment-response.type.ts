import { FunctionRole } from "@/src/enum/function-role.enum";

export type UserInEstablishmentResponseDTO = {
  userId: number;
  userName: string;
  role: FunctionRole;
};
