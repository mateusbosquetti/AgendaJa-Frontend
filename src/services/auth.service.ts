import { api } from "@/lib/api";
import { Login } from "../types/login.type";

export class AuthService {
  public static async login(dto: Login): Promise<string> {
    const response = await api.post("/auth/login", dto);
    return response.data;
  }

  public static async register(data: { name: string; email: string; password: string }) {
    const response = await api.post("/auth/register", data);
    return response.data;
  }

  public static async logout() {
    await api.post("/auth/logout");
  }
}
