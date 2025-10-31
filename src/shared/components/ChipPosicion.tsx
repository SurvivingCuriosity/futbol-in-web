
import { faFighterJet, faShieldAlt, faThumbsUp, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Posicion } from "futbol-in-core/enum";


export type PosicionConValor = Exclude<Posicion, Posicion.NOT_SET>;

export default function ChipPosicion({ posicion }: { posicion: PosicionConValor }) {

    const colorMap: Record<PosicionConValor, string> = {
      [Posicion.DELANTERO]: "#fb2c36",
      [Posicion.PORTERO]: "#2b7fff",
      [Posicion.POLIVALENTE]: "#06d16c",
    };

    const bgColorMap: Record<PosicionConValor, string> = {
      [Posicion.DELANTERO]: "#fb2c3633",
      [Posicion.PORTERO]: "#2b7fff33",
      [Posicion.POLIVALENTE]: "#022e23",
    };

    const iconMap: Record<PosicionConValor, IconDefinition> = {
      [Posicion.DELANTERO]: faFighterJet,
      [Posicion.PORTERO]: faShieldAlt,
      [Posicion.POLIVALENTE]: faThumbsUp,
    };
  
  
  return (
    <div style={{backgroundColor: bgColorMap[posicion]}} className="flex items-center gap-2 px-3 p-0.5 rounded-lg">
      <FontAwesomeIcon icon={iconMap[posicion]} size="sm" color={colorMap[posicion]} />
      <p className="text-sm" style={{color:colorMap[posicion]}}>{posicion}</p>
    </div>
  );
}

