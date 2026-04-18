"use client";

import { useAllFutbolines } from "@/src/shared/hooks/useGetAllFutbolines";
import { Tooltip } from "@/src/shared/components/Tooltip";
import { Medal } from "../Medal";
import { Flag } from "lucide-react";
import { useMemo } from "react";

interface MedallaPioneroProvinciaProps {
  userId: string;
  size?: number;
  showTooltip?: boolean;
  showLabel?: boolean;
}

export const MedallaPioneroProvincia = ({
  userId,
  size = 50,
  showTooltip = true,
  showLabel = true,
}: MedallaPioneroProvinciaProps) => {
  const { data: allFutbolines = [] } = useAllFutbolines();

  const pioneroProvincias = useMemo(() => {
    if (!allFutbolines.length || !userId) return [];

    const byProvincia = new Map<string, typeof allFutbolines>();
    for (const f of allFutbolines) {
      const provincia = f.ciudad.split(",").at(-1)?.trim();
      if (!provincia) continue;
      if (!byProvincia.has(provincia)) byProvincia.set(provincia, []);
      byProvincia.get(provincia)!.push(f);
    }

    const provincias: string[] = [];
    for (const [provincia, spots] of byProvincia) {
      const primero = spots.reduce((earliest, s) =>
        new Date(s.createdAt!).getTime() < new Date(earliest.createdAt!).getTime()
          ? s
          : earliest
      );
      if (primero.addedByUserId === userId) provincias.push(provincia);
    }

    return provincias;
  }, [allFutbolines, userId]);

  if (!pioneroProvincias.length) return null;

  const count = pioneroProvincias.length;
  const tier = (count >= 10 ? 5 : count >= 7 ? 4 : count >= 5 ? 3 : count >= 3 ? 2 : 1) as 1 | 2 | 3 | 4 | 5;
  const tooltipText = `Ha agregado el primer futbolín de ${pioneroProvincias.join(", ")}`;

  const medal = (
    <Medal
      icon={Flag}
      tier={tier}
      shape="rosette"
      label={showLabel ? "Pionero" : ""}
      size={size}
    />
  );

  if (!showTooltip) return medal;

  return (
    <Tooltip content={tooltipText} placement="bottom">
      {medal}
    </Tooltip>
  );
};
