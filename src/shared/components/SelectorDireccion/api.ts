import { API_URL } from "@/src/config";
import { PlaceOption } from "./SelectorDireccion";


export async function fetchDirecciones(input: string|number): Promise<PlaceOption[]> {
  if (!input) return [];
  const res = await fetch(
    `${API_URL}/maps/direcciones-autocomplete?input=${encodeURIComponent(input)}`
  );
  const {data} = await res.json();
  if (data.status !== "OK") return [];

  return (data as google.maps.places.AutocompleteResponse).predictions.map(
    (p) => ({
      value: p.place_id,
      label: p.description,
      data: p,
    })
  );
}