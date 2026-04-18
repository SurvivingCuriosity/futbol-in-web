import { Tooltip } from "@/src/shared/components/Tooltip";
import { Medal } from "../Medal";
import { Timer } from "lucide-react";

const CUTOFF = new Date("2025-05-17");

interface MedallaAntiguedadProps {
  createdAt?: Date | string;
  size?: number;
  showTooltip?: boolean;
  showLabel?: boolean;
}

export const MedallaAntiguedad = ({
  createdAt,
  size = 50,
  showTooltip = true,
  showLabel = true,
}: MedallaAntiguedadProps) => {
  if (!createdAt || new Date(createdAt) >= CUTOFF) return null;

  const medal = <Medal icon={Timer} tier={5} shape="rosette" label={showLabel ? "Fundador" : ""} size={size} />;

  if (!showTooltip) return medal;

  const content = `Miembro desde ${new Date(createdAt).toLocaleDateString()}`;
  return (
    <Tooltip content={content} placement="bottom">
      {medal}
    </Tooltip>
  );
};
