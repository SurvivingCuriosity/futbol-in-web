"use client";

import dynamic from "next/dynamic";
import { OptionType } from "../AsyncSelect/Select";
import { SelectorMunicipio } from "../SelectorMunicipio/SelectorMunicipio";

export const SearchInputMapa = ({
  onSelect,
  onNewCoords,
}: {
  onSelect: () => void;
  onNewCoords: (coords:google.maps.LatLngLiteral)=>void;
}) => {

  const handleSelectMunicipio = async (m: OptionType | null) => {
    if (!m) return;
    onSelect()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/maps/getCoordinatesFromString?string=` + encodeURIComponent(m.value),
    );
    const {data} = await res.json();
    onNewCoords({ lat: data.lat, lng: data.lng });
  }

  return (
    <div style={{ zIndex: 2 }}>
      <SelectorMunicipio onSelect={handleSelectMunicipio} />
    </div>
  );
};
