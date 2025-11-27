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
    // <header className="bg-foreground/10 border-foreground/10 border-b backdrop-blur-sm">
    //   <nav className="flex h-16 items-center justify-between px-6">
    //     <Link href="/homepage" className="flex items-center">
    //       <Image src="/NewLogo.png" alt="Logo" width={120} height={40} priority />
    //     </Link>

    //     <ul className="flex gap-10 text-sm font-medium">
    //       <li>
    //         <Link href="/" className="transition-colors hover:text-blue-700">
    //           Início
    //         </Link>
    //       </li>
    //       <li>
    //         <Link href="/explore" className="transition-colors hover:text-blue-700">
    //           Explorar
    //         </Link>
    //       </li>

    //       {user?.role === UserRole.ADMIN && (
    //         <>
    //           <li>
    //             <Link href="/admin/users" className="transition-colors hover:text-blue-700">
    //               Gerenciar Usuários
    //             </Link>
    //           </li>
    //         </>
    //       )}

    //       {user?.role === UserRole.USER && (
    //         <li>
    //           <Link href="/meus-servicos" className="transition-colors hover:text-blue-700">
    //             Meus Agendamentos
    //           </Link>
    //         </li>
    //       )}

    //       {establishmentsRelatedToUser.length > 0 && (
    //         <li>
    //           <Link href="/meus-estabelecimentos" className="transition-colors hover:text-blue-700">
    //             Área dos Profissionais
    //           </Link>
    //         </li>
    //       )}
    //     </ul>

    //     <Link
    //       // href="/profile"
    //       href=""
    //       className="flex items-center"
    //       onClick={() => {
    //         setUser(null);
    //         AuthService.logout();
    //       }}
    //     >
    //       <div className="border-foreground/30 h-10 w-10 overflow-hidden rounded-full border">
    //         <Image
    //           src={user?.photoUrl || "/default-profile-picture.png"}
    //           alt="Profile"
    //           width={40}
    //           height={40}
    //           className="h-full w-full object-cover"
    //           unoptimized
    //         />
    //       </div>
    //     </Link>
    //   </nav>
    // </header>
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
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
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
