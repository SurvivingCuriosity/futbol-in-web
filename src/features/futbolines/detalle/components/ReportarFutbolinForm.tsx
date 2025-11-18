import { useConfirmDialog } from "@/src/shared/context/UIProvider/hooks/useUI";
import { faBuilding, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpotDTO } from "futbol-in-core/types";
import { Button } from "futbol-in-ui";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCrearIncidencia } from "../../incidencias/hooks";

export const ReportarFutbolinForm = ({
  futbolin,
  onClose,
}: {
  futbolin: SpotDTO;
  onClose?: () => void;
}) => {
  const [text, setText] = useState("");

  const { confirm } = useConfirmDialog();
  const { mutate: crearIncidencia, isPending, error } = useCrearIncidencia();

  const handleReportar = async () => {
    if(text.trim() === "") {
      toast.error("Debes escribir el motivo");
      return;
    }
    const acepta = await confirm({
      title: "¿Estás seguro?",
      description: "Esta acción no se puede deshacer",
      confirmText: "Reportar",
      cancelText: "Cancelar",
    });
    if (acepta) {
      crearIncidencia({
        spotId: futbolin.id,
        texto: text,
      });
    }
    onClose?.();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBuilding} />
          <p className="truncate">{futbolin.nombre}</p>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLocationDot} />
          <p>{futbolin.ciudad}</p>
        </div>
      </div>
      {error && <p className="text-red-500">{error.message}</p>}
      <textarea
        autoFocus={true}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Indica si el futbolín ya no se encuentra en el lugar o si encuentras alguna información errónea."
        className="bg-transparent border border-neutral-500 w-full rounded-xl p-2 text-neutral-200 min-h-20 max-h-40 placeholder:font-light placeholder:text-neutral-500 text-sm"
      ></textarea>
      <div className="flex items-center gap-1">
        <Button
          label="Cancelar"
          variant="neutral-outline"
          onClick={onClose}
          disabled={isPending}
        />
        <Button
          label="Reportar"
          variant="danger-outline"
          onClick={handleReportar}
          loading={isPending}
        />
      </div>
    </div>
  );
};
