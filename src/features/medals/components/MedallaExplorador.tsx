import { Tooltip } from "@/src/shared/components/Tooltip";
import { SpotDTO } from "futbol-in-core/types";
import { Compass } from "lucide-react";
import { useMemo } from "react";
import { Medal, MedalTier } from "../Medal";

interface MedallaExploradorProps {
  futbolines?: SpotDTO[];
  provincias?: string[];
  size?: number;
  showTooltip?: boolean;
  showLabel?: boolean;
}

const TIERS: { min: number; tier: MedalTier; label: string }[] = [
  { min: 15, tier: 5, label: "Explorador" },
  { min: 10, tier: 4, label: "Explorador" },
  { min: 7,  tier: 3, label: "Explorador" },
  { min: 5,  tier: 2, label: "Explorador" },
  { min: 2,  tier: 1, label: "Explorador" },
];

export const MedallaExplorador = ({
  futbolines,
  provincias,
  size = 50,
  showTooltip = true,
  showLabel = true,
}: MedallaExploradorProps) => {
  const { tier, provinciasCount } = useMemo(() => {
    const count = provincias
      ? provincias.length
      : new Set(
          (futbolines ?? []).map((f) => f.ciudad.split(",")[1]?.trim()).filter(Boolean)
        ).size;
    return { tier: TIERS.find((t) => count >= t.min) ?? null, provinciasCount: count };
  }, [futbolines, provincias]);

  if (!tier) return null;

  const medal = (
    <Medal
      icon={Compass}
      tier={tier.tier}
      shape="rosette"
      label={showLabel ? tier.label : ""}
      size={size}
    />
  );

  if (!showTooltip) return medal;

  return (
    <Tooltip
      content={`Ha agregado futbolines en ${provinciasCount} provincia${provinciasCount !== 1 ? "s" : ""} distintas`}
      placement="bottom"
    >
      {medal}
    </Tooltip>
  );
};
