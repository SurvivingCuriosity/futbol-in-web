import { useModal } from "@/src/shared/context/UIProvider/hooks/useUI";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpotDTO } from "futbol-in-core/types";
import { DetalleIncidencia } from "./DetalleIncidencia";
import { useIncidenciasBySpot } from "./hooks";
import { IncidenciaDTO } from "./types";

export const Incidencias = ({ futbolin }: { futbolin: SpotDTO }) => {
  const { data: incidencias, isLoading } = useIncidenciasBySpot(futbolin.id);

  const { openModal, closeModal } = useModal();

  if (isLoading) return <p>Cargando incidencias...</p>;
  if (!incidencias || incidencias.length === 0) return null;

  const handleOpenDetalleIncidencia = (i: IncidenciaDTO) => {
    openModal(
      <DetalleIncidencia
        futbolin={futbolin}
        incidencia={i}
        onClose={closeModal}
      />, {
        title: "Incidencia",
      }
    );
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden w-fit">
      {incidencias.length > 0 &&
        incidencias?.map((i) => (
          <div
            onClick={() => handleOpenDetalleIncidencia(i)}
            key={i.id}
            className={`max-h-18 ${
              incidencias.length > 1 ? "w-10/12" : "w-full"
            } bg-red-800/20 p-2 px-3 rounded-lg shrink-0 flex items-center gap-2`}
          >
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-red-500"
            />
            <div>
              <p className="text-sm line-clamp-2 text-neutral-400">{i.texto}</p>
              <p className="text-xs font-light">{new Date(i.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
