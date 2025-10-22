import { api } from "@/lib/api";
import { Login } from "../types/login.type";
import { Register } from "../types/register.type";

export class AuthService {
  public static async login(dto: Login): Promise<string> {
    const response = await api.post("/auth/login", dto);
    return response.data;
  }

  public static async register(dto: Register): Promise<string> {
    const response = await api.post("/auth/register", dto);
    return response.data;
  }

  public static async logout() {
    //TODO: Implement logout functionality
  }
}
