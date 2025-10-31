"use client";

import { UsuarioEnRanking } from "futbol-in-core/types";
import Image from "next/image";
import Link from "next/link";

export default function TablaRankingUsuariosMovil({
  users,
}: {
  users: UsuarioEnRanking[];
}) {
  return (
    <ul className="flex flex-col gap-1">
      {users.map((user) => (
        <Link href={`/app/user/${user.usuario}`} key={user.id}>
          <div className="flex items-center gap-2 p-2 px-4 justify-between border rounded-lg relative border-neutral-700 bg-neutral-950/80 backdrop-blur-xs">
            <span className="flex items-center gap-2">
              <p className="flex items-center justify-center rounded-full text-sm">
                #{user.posicion + 1}
              </p>
              <Image
                src={user.imagen ? user.imagen : "/default_user.svg"}
                width={32}
                height={32}
                className="size-8 rounded-full object-top object-cover flex items-center justify-center relative"
                alt="Imagen de usuario"
              />
              <p>{user.usuario}</p>
            </span>
            <div className="flex flex-col gap-0">
              <p className="text-xl text-primary text-right font-bold">
                {user.puntuacion}
              </p>
              <p className="text-sm text-neutral-700">futbolines</p>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
}
