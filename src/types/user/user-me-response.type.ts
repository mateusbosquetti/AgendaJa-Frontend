import { ThemeEnum } from "@/src/enum/theme.enum";
import { UserRole } from "@/src/enum/user-role.enum";

export type UserMeResponse = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  theme: ThemeEnum;
  photoUrl: string;
};
