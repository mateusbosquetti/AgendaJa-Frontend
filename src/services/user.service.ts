import { api } from "@/lib/api";
import { UserMeResponse } from "../types/user/user-me-response.type";

export class UserService {
  public static async me(): Promise<UserMeResponse> {
    const response = await api.get("/users/me");
    return response.data;
  }
}
