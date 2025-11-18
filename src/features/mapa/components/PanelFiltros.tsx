import { TipoFutbolin } from "futbol-in-core/enum";
import { useMapaStore } from "../store/useMapaStore";

export const PanelFiltros = ({
  closeCallback,
}: {
  closeCallback?: () => void;
}) => {
  const filters = useMapaStore((s) => s.filters);
  const setFilters = useMapaStore((s) => s.setFilters);

  return (
    <div className="p-4">
      <div className="flex flex-col gap-3 mt-5">
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Marca</label>
          <select
            value={filters.marca || ""}
            onChange={(e) => {
              setFilters({
                marca: (e.target.value as TipoFutbolin) || undefined,
              });
              closeCallback?.();
            }}
            className="bg-neutral-800 text-white border border-neutral-600 rounded-lg px-3 py-1.5 w-full"
          >
            <option value="">Todas</option>
            {
              // exclude opcion cualquiera
              Object.values(TipoFutbolin)
                .filter((t) => t !== TipoFutbolin.CUALQUIERA)
                .map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))
            }
          </select>
        </div>

      </div>
    </div>
  );
};
