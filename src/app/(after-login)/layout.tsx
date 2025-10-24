import Image from "next/image";
import Link from "next/link";

export default function AfterLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <header className="bg-foreground/10 border-foreground/10 border-b backdrop-blur-sm">
        <nav className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center">
            <Image src="/NewLogo.png" alt="Logo" width={120} height={40} priority />
          </Link>

          {/* Navegação principal */}
          <ul className="flex gap-10 text-sm font-medium">
            <li>
              <Link href="/z" className="transition-colors hover:text-blue-700">
                Lore
              </Link>
            </li>
            <li>
              <Link href="/y" className="transition-colors hover:text-blue-700">
                Ipsum
              </Link>
            </li>
            <li>
              <Link href="/x" className="transition-colors hover:text-blue-700">
                Dot
              </Link>
            </li>
          </ul>

          {/* Perfil */}
          <Link href="/profile" className="flex items-center">
            <Image
              src="https://api.dicebear.com/9.x/personas/svg?seed=Emery"
              alt="Profile"
              width={40}
              height={40}
              className="border-foreground/30 rounded-full border"
              unoptimized
            />
          </Link>
        </nav>
      </header>

      <main className="flex-1 px-48 py-24">{children}</main>

      <footer className="bg-foreground/5 border-foreground/10 text-foreground/60 border-t py-3 text-center text-sm">
        © {new Date().getFullYear()} Your App. All rights reserved.
      </footer>
    </div>
  );
}
