"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserMeResponse } from "../types/user/user-me-response.type";
import { ThemeEnum } from "../enum/theme.enum";
import { UserService } from "../services/user.service";

interface UserContextType {
  user: UserMeResponse | null;
  setUser: (user: UserMeResponse | null) => void;
  toggleTheme: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserMeResponse | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await UserService.me();
        if (res) {
          setUser(res);
          // document.documentElement.classList.toggle("dark", res.theme === ThemeEnum.DARK);
          document.documentElement.setAttribute(
            "data-theme",
            res.theme === ThemeEnum.DARK ? "dark" : "light"
          );
        }
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const toggleTheme = async () => {
    if (!user) return;

    const newTheme = user.theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;

    // Atualiza o DOM imediatamente para feedback visual rápido
    document.documentElement.setAttribute(
      "data-theme",
      newTheme === ThemeEnum.DARK ? "dark" : "light"
    );

    // Atualiza o estado local
    setUser({ ...user, theme: newTheme });

    // Persiste no backend (em background)
    try {
      await UserService.updateTheme(user.id, newTheme);
    } catch (error) {
      // Reverte em caso de erro
      console.error("Erro ao atualizar tema:", error);
      setUser({ ...user, theme: user.theme });
      document.documentElement.setAttribute(
        "data-theme",
        user.theme === ThemeEnum.DARK ? "dark" : "light"
      );
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, toggleTheme }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
};
