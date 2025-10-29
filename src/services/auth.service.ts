import { api } from "@/lib/api";
import { Login } from "../types/auth/login.type";
import { Register } from "../types/auth/register.type";

export class AuthService {
  public static async login(dto: Login) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });

    if (!res.ok) return null;
    return true;
  }

  public static async register(dto: Register) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });

    if (!res.ok) return null;
    return true;
  }

  public static async logout() {
    //TODO: Implement logout functionality
  }
}
