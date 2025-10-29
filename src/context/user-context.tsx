"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserMeResponse } from "../types/user/user-me-response.type";
import { ThemeEnum } from "../enum/theme.enum";

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
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          document.documentElement.classList.toggle("dark", data.user.theme === ThemeEnum.DARK);
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
    setUser({ ...user, theme: newTheme });

    await fetch("/api/theme", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, theme: newTheme }),
    });

    document.documentElement.classList.toggle("dark", newTheme === ThemeEnum.DARK);
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
