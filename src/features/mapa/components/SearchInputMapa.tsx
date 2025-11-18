"use client";

import { API_URL } from "@/src/config";
import { SelectorMunicipio } from "@/src/shared/components/SelectorMunicipio/SelectorMunicipio";
import { OptionType } from "futbol-in-ui";

export const SearchInputMapa = ({
  onSelect,
  onNewCoords,
  value
}: {
  onSelect: (m: OptionType | null) => void;
  onNewCoords: (coords:google.maps.LatLngLiteral)=>void;
  value: (OptionType & { subLabel: string; }) | undefined;
}) => {

  const handleSelectMunicipio = async (m: OptionType | null) => {
    if (!m) return;
    onSelect(m)
    const res = await fetch(
      `${API_URL}/maps/getCoordinatesFromString?string=` + encodeURIComponent(m.value),
    );
    const {data} = await res.json();
    onNewCoords({ lat: data.lat, lng: data.lng });
  }

  return (
    <div style={{ zIndex: 2 }}>
      <SelectorMunicipio onSelect={handleSelectMunicipio} value={value}/>
    </div>
  );
};
