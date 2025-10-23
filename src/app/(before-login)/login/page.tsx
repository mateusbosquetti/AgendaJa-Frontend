"use client";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Login } from "@/src/types/auth/login.type";
import { useRouter } from "next/navigation";
import { AuthService } from "@/src/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState<Login>({
    email: "mateushb123@gmail.com",
    password: "123",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = await AuthService.login(login);
    if (token) {
      console.log("Login successful, token:", token);
      router.push("/homepage");
    } else {
      console.log("Login failed");
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="bg-card w-full max-w-md space-y-6 rounded-2xl p-6 shadow-lg">
        <div className="flex justify-center">
          <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full">
            <User className="text-foreground h-8 w-8" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-foreground text-2xl font-semibold">Acesse sua conta</h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full"
              required
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full"
              required
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            className="bg-foreground hover:bg-foreground/90 w-full text-white hover:cursor-pointer"
          >
            Entrar
          </Button>
        </form>

        <div className="text-center">
          <Link
            href="/register"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Não possui uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
