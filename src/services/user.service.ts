import { api } from "@/lib/api";
import { UserResponse } from "../types/user/user-response.type";
import { UserMeResponse } from "../types/user/user-me-response.type";
import { ThemeEnum } from "../enum/theme.enum";
import { UserMeResponsePage } from "../types/user/user-me-response-page.type";

export class UserService {
  public static async getAllUsers(
    page: number,
    size: number,
    name?: string
  ): Promise<UserMeResponsePage> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(name && { name }),
    });

    const res = await api.get(`users?${params.toString()}`);
    if (!res) throw new Error("Failed to fetch users");

    return res.data;
  }

  public static async me(): Promise<UserMeResponse> {
    const res = await api.get("users/me");
    if (!res) throw new Error("Failed to fetch user data");

    return res.data;
  }

  public static async updateTheme(userId: number, theme: string): Promise<UserResponse> {
    const res = await api.patch(`users/${userId}/theme`, { theme });
    if (!res) throw new Error("Failed to update user theme");

    return res.data;
  }
}
