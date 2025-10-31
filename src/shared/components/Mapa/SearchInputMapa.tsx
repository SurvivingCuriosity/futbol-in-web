"use client";

import { SelectorMunicipio } from "../SelectorMunicipio/SelectorMunicipio";
import { TownOption } from "../SelectorMunicipio/types";

export const SearchInputMapa = ({
  onSelect,
  onNewCoords,
}: {
  onSelect: () => void;
  onNewCoords: (coords:google.maps.LatLngLiteral)=>void;
}) => {


  const handleSelectMunicipio = async (m: TownOption | null) => {
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
