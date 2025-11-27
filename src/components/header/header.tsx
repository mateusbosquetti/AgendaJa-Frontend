"use client";

import { useUser } from "@/src/context/user-context";
import { UserRole } from "@/src/enum/user-role.enum";
import { ThemeEnum } from "@/src/enum/theme.enum";
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
    <header>
      <div className="navbar bg-base-300 px-4 py-2.5 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link href="/" className="">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/explore" className="">
                  Explorar
                </Link>
              </li>

              {user?.role === UserRole.ADMIN && (
                <>
                  <li>
                    <Link href="/admin/users" className="">
                      Gerenciar Usuários
                    </Link>
                  </li>
                </>
              )}

              {user?.role === UserRole.USER && (
                <li>
                  <Link href="/meus-servicos" className="">
                    Meus Agendamentos
                  </Link>
                </li>
              )}

              {establishmentsRelatedToUser.length > 0 && (
                <li>
                  <Link href="/meus-estabelecimentos" className="">
                    Área dos Profissionais
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <Link href="/homepage" className="flex items-center">
            <Image
              src="/NewLogo.png"
              alt="Logo"
              width={120}
              height={40}
              priority
              className={user?.theme === ThemeEnum.DARK ? "invert" : ""}
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/" className="">
                Início
              </Link>
            </li>
            <li>
              <Link href="/explore" className="">
                Explorar
              </Link>
            </li>

            {user?.role === UserRole.ADMIN && (
              <>
                <li>
                  <Link href="/admin/users" className="">
                    Gerenciar Usuários
                  </Link>
                </li>
              </>
            )}

            {user?.role === UserRole.USER && (
              <li>
                <Link href="/meus-servicos" className="">
                  Meus Agendamentos
                </Link>
              </li>
            )}

            {establishmentsRelatedToUser.length > 0 && (
              <li>
                <Link href="/meus-estabelecimentos" className="">
                  Área dos Profissionais
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={user?.photoUrl || "/default-profile-picture.png"} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
