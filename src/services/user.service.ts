import { api } from "@/lib/api";
import { UserMeResponse } from "../types/user/user-me-response.type";
import { ThemeEnum } from "../enum/theme.enum";
import { UserResponse } from "../types/user/user-response.type";

export class UserService {
  public static async me(): Promise<UserMeResponse> {
    const response = await api.get("/users/me");
    return response.data;
  }

  public static async updateTheme(userId: number, theme: ThemeEnum): Promise<UserResponse> {
    const response = await api.patch(`/users/${userId}/theme`, { theme });
    return response.data;
  }
}
