"use client";

import { useUser } from "@/src/context/user-context";
import { UserRole } from "@/src/enum/user-role.enum";
import { AuthService } from "@/src/services/auth.service";
import { UserEstablishmentService } from "@/src/services/user-establishment.service";
import { UserEstablishmentResponseDTO } from "@/src/types/user-establishment/user-establishment-response.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, setUser } = useUser();
  const [establishmentsRelatedToUser, setEstablishmentsRelatedToUser] = useState<
    UserEstablishmentResponseDTO[]
  >([]);

  useEffect(() => {
    const fetchEstablishments = async () => {
      if (user) {
        UserEstablishmentService.getEstablishmentRelationsByUserId(user.id).then((data) => {
          setEstablishmentsRelatedToUser(data);
        });
      }
    };
    fetchEstablishments();
  }, [user]);

  return (
    <header className="bg-foreground/10 border-foreground/10 border-b backdrop-blur-sm">
      <nav className="flex h-16 items-center justify-between px-6">
        <Link href="/homepage" className="flex items-center">
          <Image src="/NewLogo.png" alt="Logo" width={120} height={40} priority />
        </Link>

        <ul className="flex gap-10 text-sm font-medium">
          <li>
            <Link href="/" className="transition-colors hover:text-blue-700">
              Início
            </Link>
          </li>
          <li>
            <Link href="/explore" className="transition-colors hover:text-blue-700">
              Explorar
            </Link>
          </li>

          {user?.role === UserRole.ADMIN && (
            <>
              <li>
                <Link href="/admin/users" className="transition-colors hover:text-blue-700">
                  Gerenciar Usuários
                </Link>
              </li>
            </>
          )}

          {user?.role === UserRole.USER && (
            <li>
              <Link href="/meus-servicos" className="transition-colors hover:text-blue-700">
                Meus Agendamentos
              </Link>
            </li>
          )}

          {establishmentsRelatedToUser.length > 0 && (
            <li>
              <Link href="/meus-estabelecimentos" className="transition-colors hover:text-blue-700">
                Área dos Profissionais
              </Link>
            </li>
          )}
        </ul>

        <Link
          // href="/profile"
          href=""
          className="flex items-center"
          onClick={() => {
            setUser(null);
            AuthService.logout();
          }}
        >
          <div className="border-foreground/30 h-10 w-10 overflow-hidden rounded-full border">
            <Image
              src={user?.photoUrl || "/default-profile-picture.png"}
              alt="Profile"
              width={40}
              height={40}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
        </Link>
      </nav>
    </header>
  );
}
