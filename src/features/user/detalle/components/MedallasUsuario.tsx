import { MedallaAntiguedad } from "../../../medals/components/MedallaAntiguedad";
import { MedallaExplorador } from "../../../medals/components/MedallaExplorador";
import { MedallaPerfilCompleto } from "../../../medals/components/MedallaPerfilCompleto";
import { MedallaPioneroProvincia } from "../../../medals/components/MedallaPioneroProvincia";
import { SpotDTO, UserDTO } from "futbol-in-core/types";

interface MedallasUsuarioProps {
  createdAt?: Date | string;
  user?: UserDTO;
  userId?: string;
  futbolines?: SpotDTO[];
  provincias?: string[];
  perfilCompleto?: boolean;
  size?: number;
  showTooltip?: boolean;
  showLabel?: boolean;
}

export const MedallasUsuario = ({
  createdAt,
  user,
  userId,
  futbolines,
  provincias,
  perfilCompleto,
  size = 50,
  showTooltip = true,
  showLabel = true,
}: MedallasUsuarioProps) => {
  const resolvedUserId = user?.id ?? userId;

  return (
    <div className="flex gap-2">
      {(futbolines || provincias) && (
        <MedallaExplorador futbolines={futbolines} provincias={provincias} size={size} showTooltip={showTooltip} showLabel={showLabel} />
      )}
      {resolvedUserId && (
        <MedallaPioneroProvincia userId={resolvedUserId} size={size} showTooltip={showTooltip} showLabel={showLabel} />
      )}
      <MedallaAntiguedad createdAt={createdAt} size={size} showTooltip={showTooltip} showLabel={showLabel} />
      {(user || perfilCompleto !== undefined) && (
        <MedallaPerfilCompleto user={user} precomputed={perfilCompleto} size={size} showTooltip={showTooltip} showLabel={showLabel} />
      )}
    </div>
  );
};
