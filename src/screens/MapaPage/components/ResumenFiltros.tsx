import { LogoFutbolin } from "@/src/shared/components/LogoFutbolin";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMapaStore } from "../store/useMapaStore";

export const ResumenFiltros = () => {
  const filters = useMapaStore((s) => s.filters);
  const setFilters = useMapaStore((s) => s.setFilters);

  if (!filters.marca && !filters.ciudad) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.marca && (
        <span className="bg-neutral-900 text-neutral-300 px-3 py-1 rounded-md flex items-center gap-1">
          {filters.marca}
          <LogoFutbolin tipo={filters.marca} size={23} />
          <button className="pointer-events-auto" onClick={() => setFilters({ marca: undefined })}>
            <FontAwesomeIcon icon={faXmark} className="text-neutral-300" />
          </button>
        </span>
      )}
      {filters.ciudad && (
        <span className="bg-neutral-900 text-neutral-300 px-3 py-1 rounded-md flex items-center gap-1">
          Ciudad: {filters.ciudad}
          <button className="pointer-events-auto" onClick={() => setFilters({ ciudad: undefined })}>
            <FontAwesomeIcon icon={faXmark} className="text-neutral-300" />
          </button>
        </span>
      )}
    </div>
  );
};
