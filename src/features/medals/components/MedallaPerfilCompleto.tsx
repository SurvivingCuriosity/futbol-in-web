import { Tooltip } from "@/src/shared/components/Tooltip";
import { UserDTO } from "futbol-in-core/types";
import { UserCheck } from "lucide-react";
import { Medal } from "../Medal";

interface MedallaPerfilCompletoProps {
  user?: UserDTO;
  precomputed?: boolean;
  size?: number;
  showTooltip?: boolean;
  showLabel?: boolean;
}

export const MedallaPerfilCompleto = ({
  user,
  precomputed,
  size = 50,
  showTooltip = true,
  showLabel = true,
}: MedallaPerfilCompletoProps) => {
  const isComplete =
    precomputed !== undefined
      ? precomputed
      : !!(user?.nombre && user?.ciudad && user?.posicion && user?.imagen);

  if (!isComplete) return null;

  const medal = (
    <Medal
      icon={UserCheck}
      tier="neutral"
      shape="rosette"
      label={showLabel ? "Perfil 100%" : ""}
      size={size}
    />
  );

  if (!showTooltip) return medal;

  return (
    <Tooltip content="Perfil completado al 100%" placement="bottom">
      {medal}
    </Tooltip>
  );
};
