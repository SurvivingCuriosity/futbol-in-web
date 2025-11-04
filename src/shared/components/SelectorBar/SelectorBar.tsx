"use client";
import { IMapItem } from "futbol-in-core/types";
import { CustomAsyncSelect } from "futbol-in-ui";
import { SingleValue } from "react-select";
import { fetchBares, getCoordinatesFromPlaceId } from "./api";


export interface OptionType {
  value: string;
  label: string;
}

export interface PlaceOption extends OptionType {
  data?: google.maps.places.AutocompletePrediction;
}

export default function SelectorBar({
  ciudad = "",
  onSelect,
  onSelectPlaceOption,
  disabled,
  value,
  placeholder = "Escribe para buscar..."
}: {
  ciudad?:string
  onSelect: (
    val: Pick<
      IMapItem,
      "nombre" | "direccion" | "lat" | "lng" | "googlePlaceId"
    >
  ) => void;
  onSelectPlaceOption?: (val: PlaceOption|undefined) => void;
  disabled?: boolean;
  value?: PlaceOption
  placeholder?: string;
}) {
  const handleSelect = async (place: SingleValue<PlaceOption>) => {
    if (!place) return;
    const coords = await getCoordinatesFromPlaceId(place.value);
    if(!place.data) return
    const selected: Pick<
      IMapItem,
      "nombre" | "direccion" | "lat" | "lng" | "googlePlaceId"
    > = {
      nombre: place.data.terms[0].value || "Desconocido",
      direccion: (`${place.data.terms[1].value} ${place.data.terms[2].value}`) || "Desconocido",
      lat: coords.lat,
      lng: coords.lng,
      googlePlaceId: place.value || "Desconocido",
    };
    onSelect(selected);
    if(onSelectPlaceOption) onSelectPlaceOption(place)
  };

  return (
    <CustomAsyncSelect
      value={value}
      onSelect={handleSelect}
      loadOptions={(input)=>fetchBares(input, ciudad)}
      disabled={disabled}
      placeholder={placeholder}
      noOptionsMessage="No hay resultados"
      loadingMessage="Cargando..."
    />
  );
}
