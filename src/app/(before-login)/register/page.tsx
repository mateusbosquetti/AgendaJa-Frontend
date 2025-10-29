"use client";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/src/services/auth.service";
import { Register } from "@/src/types/auth/register.type";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [register, setRegister] = useState<Register>({
    name: "Mateus Bosquetti",
    email: "mateushb123@gmail.com",
    password: "123",
    cpf: "07756162900",
    phone: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (register.password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    const token = await AuthService.register(register);
    if (token) {
      router.push("/homepage");
    } else {
      console.log("Registration failed");
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
          <h1 className="text-foreground text-2xl font-semibold">Crie sua conta</h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Nome Completo
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              className="w-full"
              required
              value={register.name}
              onChange={(e) => setRegister({ ...register, name: e.target.value })}
            />
          </div>
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
              value={register.email}
              onChange={(e) => setRegister({ ...register, email: e.target.value })}
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
              value={register.password}
              onChange={(e) => setRegister({ ...register, password: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-foreground">
              Confirmar Senha
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              className="w-full"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="bg-foreground hover:bg-foreground/90 w-full text-white hover:cursor-pointer"
          >
            Cadastrar
          </Button>
        </form>

        <div className="text-center">
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Já possui uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}
