import { ThemeEnum } from "@/src/enum/theme.enum";
import { UserRole } from "@/src/enum/user-role.enum";
import { UserMeResponse } from "./user-me-response.type";

//TODO: colocar o resto
export type UserMeResponsePage = {
  content: UserMeResponse[];
}
