import { api } from "@/lib/api";
import Cookies from "js-cookie";
import { Login } from "../types/auth/login.type";
import { Register } from "../types/auth/register.type";

export class AuthService {
  public static async login(dto: Login) {
    const res = await api.post("auth/login", dto);
    if (!res) return null;

    Cookies.set("token", res.data.token, { expires: 1, secure: true, sameSite: "strict" });
    return true;
  }

  public static async register(dto: Register) {
    const res = await api.post("auth/register", dto);
    if (!res) return null;

    Cookies.set("token", res.data.token, { expires: 1, secure: true, sameSite: "strict" });
    return true;
  }

  public static async logout() {
    //TODO: Implement logout functionality
  }
}
