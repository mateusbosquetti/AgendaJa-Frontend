"use client";

import { useState } from "react";
import { Login } from "@/src/types/auth/login.type";
import { useRouter } from "next/navigation";
import { AuthService } from "@/src/services/auth.service";
import Link from "next/link";

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
      router.push("/homepage");
    } else {
      console.log("Login failed");
    }
  };

  return (
    <div className="bg-base-200 flex min-h-screen items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                autoComplete="username"
                placeholder="seu@email.com"
                className="input input-bordered w-full"
                value={login.email}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
              />
              <legend className="fieldset-legend">Senha</legend>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={login.password}
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
              />

              <button type="submit" className="btn btn-primary mt-6">
                Entrar
              </button>
            </fieldset>
          </form>

          <div className="divider">OU</div>

          <div className="text-center">
            <Link href="/register" className="link link-primary">
              Não possui uma conta? Faça cadastro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
