"use client";

import Header from "@/src/components/header/header";
import { UserProvider } from "@/src/context/user-context";

export default function AfterLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="bg-background flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 px-48 py-24">{children}</main>
        <footer className="bg-foreground/5 border-foreground/10 text-foreground/60 border-t py-3 text-center text-sm">
          © {new Date().getFullYear()} Your App. All rights reserved.
        </footer>
      </div>
    </UserProvider>
  );
}
