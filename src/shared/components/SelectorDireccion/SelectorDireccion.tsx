"use client";
import { IMapItem } from "futbol-in-core/types";
import { CustomAsyncSelect } from "futbol-in-ui";
import { SingleValue } from "react-select";
import { getCoordinatesFromPlaceId } from "../SelectorBar/api";
import { fetchDirecciones } from "./api";

export interface OptionType {
  value: string;
  label: string;
}

export interface PlaceOption extends OptionType {
  data: google.maps.places.AutocompletePrediction;
}

export default function SelectorDireccion({
  onSelect,
  disabled,
  placeholder="Escribe para buscar..."
}: {
  onSelect: (
    val: Pick<
      IMapItem,
      "nombre" | "direccion" | "lat" | "lng" | "googlePlaceId"
    >
  ) => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  const handleSelect = async (place: SingleValue<PlaceOption>) => {
    if (!place) return;
    const coords = await getCoordinatesFromPlaceId(place.value);
    const selected: Pick<
      IMapItem,
      "nombre" | "direccion" | "lat" | "lng" | "googlePlaceId"
    > = {
      nombre: place.data.description || "Desconocido",
      direccion: place.data.description || "Desconocido",
      lat: coords.lat,
      lng: coords.lng,
      googlePlaceId: place.value || "Desconocido",
    };
    onSelect(selected);
  };

  return (
    <CustomAsyncSelect<PlaceOption>
      onSelect={handleSelect}
      loadOptions={fetchDirecciones}
      disabled={disabled}
      placeholder={placeholder}
      noOptionsMessage="No hay resultados"
      loadingMessage="Cargando..."
    />
  );
}
