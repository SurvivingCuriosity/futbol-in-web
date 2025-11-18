import dynamic from "next/dynamic";
import { useMapaStore } from "../store/useMapaStore";

const SearchInputMapa = dynamic(
  () =>
    import("@/src/features/mapa/components/SearchInputMapa").then(
      (mod) => mod.SearchInputMapa
    ),
  {
    ssr: false,
  }
);


export const BuscadorCiudad = () => {
  const setViajando = useMapaStore((s) => s.setViajando);
  const setFocusCoords = useMapaStore((s) => s.setFocusCoords);
  const filters = useMapaStore((s) => s.filters);
  const setFilters = useMapaStore((s) => s.setFilters);

  return (
    <div className="grow pointer-events-auto">
      <SearchInputMapa
        onSelect={(m) => {
          setViajando(true);
          setFilters({ ciudad: m?.label });
        }}
        onNewCoords={(coords) => {
          setViajando(false);
          setFocusCoords(coords);
        }}
        value={
          filters.ciudad
            ? {
                label: filters.ciudad || "",
                subLabel: filters.ciudad || "",
                value: filters.ciudad || "",
              }
            : undefined
        }
      />
    </div>
  );
};
