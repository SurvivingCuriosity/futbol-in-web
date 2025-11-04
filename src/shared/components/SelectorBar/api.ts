import { API_URL } from "@/src/config";
import { PlaceOption } from "./SelectorBar";


export async function fetchBares(inputValue: string|number, ciudad:string = ""): Promise<PlaceOption[]> {
  if (!inputValue) return [];
  const res = await fetch(
    `${API_URL}/maps/bares-autocomplete?input=${encodeURIComponent(ciudad+' '+inputValue)}`
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

export const getCoordinatesFromPlaceId = async (placeId: string) => {
  const res = await fetch(`${API_URL}/maps/getCoordinatesFromPlaceId?placeId=${placeId}`);
  const {data} = await res.json();
  return data;
}