"use client";

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
    <div className="bg-base-200 flex min-h-screen items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">Cadastro</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Nome Completo</legend>
              <input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                className="input input-bordered w-full"
                required
                value={register.name}
                onChange={(e) => setRegister({ ...register, name: e.target.value })}
              />
              <legend className="fieldset-legend">Email</legend>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                required
                value={register.email}
                onChange={(e) => setRegister({ ...register, email: e.target.value })}
              />
              <legend className="fieldset-legend">Senha</legend>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
                value={register.password}
                onChange={(e) => setRegister({ ...register, password: e.target.value })}
              />
              <legend className="fieldset-legend">Confirmar Senha</legend>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button type="submit" className="btn btn-primary mt-6">
                Cadastrar
              </button>
            </fieldset>
          </form>

          <div className="divider">OU</div>

          <div className="text-center">
            <Link href="/login" className="link link-primary">
              Já possui uma conta? Faça login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
