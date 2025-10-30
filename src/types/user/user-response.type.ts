import { ThemeEnum } from "@/src/enum/theme.enum";

export type UserResponse = {
  id: number;
  name: string;
  phone: string;
  cpf: string;
  theme: ThemeEnum;
};
