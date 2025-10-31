"use client";

import { DataTable } from "@/src/shared/components/Tabla/Table";
import { Column } from "@/src/shared/components/Tabla/types";
import { UsuarioEnRanking } from "futbol-in-core/types";
import Link from "next/link";

const columns: Column<UsuarioEnRanking>[] = [
  {
    key: "posicion",
    header: (sortState) => (
      <span>
        Posicion
        {sortState.columnKey === "posicion" && (
          <span className="ml-1">
            {sortState.direction === "asc" ? "▲" : "▼"}
          </span>
        )}
      </span>
    ),
    accessor: (row) => row.posicion,
    sortable: true,
    cell: ({ row }) => {
      // JSX personalizado en la celda
      return <strong className="text-primary">#{row.posicion + 1 || 0}</strong>;
    },
  },
  {
    key: "usuario",
    header: "Usuario",
    accessor: (row) => row.usuario,
    sortable: false,
    cell: ({ row }) => {
      // JSX personalizado en la celda
      return (
        <Link
          className="underline"
          href={`/app/user/${row.usuario}`}
        >
          {row.usuario}
        </Link>
      );
    },
  },
  {
    key: "spotsCreados",
    header: (sortState) => (
      <span>
        Futbolines agregados
        {sortState.columnKey === "age" && (
          <span className="ml-1">
            {sortState.direction === "asc" ? "▲" : "▼"}
          </span>
        )}
      </span>
    ),
    accessor: (row) => row.spotsCreados,
    sortable: true,
    sortFn: (a, b) => a.spotsCreados - b.spotsCreados, // Ejemplo de sortFn personalizado
    cell: ({ row }) => {
      // JSX personalizado en la celda
      return <div>{row.spotsCreados}</div>;
    },
  }
];

export default function TablaRankingUsuarios({
  users,
}: {
  users: UsuarioEnRanking[];
}) {
  return <DataTable data={users} columns={columns} />;
}
