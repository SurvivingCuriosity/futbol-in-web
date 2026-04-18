import { MedallaAntiguedad } from "../../../medals/components/MedallaAntiguedad";

interface MedallasUsuarioProps {
  createdAt?: Date | string;
  size?: number;
  showTooltip?: boolean;
  showLabel?: boolean;
}

export const MedallasUsuario = ({
  createdAt,
  size = 50,
  showTooltip = true,
  showLabel = true,
}: MedallasUsuarioProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <MedallaAntiguedad createdAt={createdAt} size={size} showTooltip={showTooltip} showLabel={showLabel}/>
    </div>
  );
};