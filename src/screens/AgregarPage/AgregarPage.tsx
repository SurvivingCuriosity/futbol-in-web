"use client"

import { FormField, FormLabel } from "@/src/shared/components/FormField";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  DistribucionFutbolin,
  TipoFutbolin,
  TipoLugar,
} from "futbol-in-core/enum";
import { AgregarFutbolin } from "futbol-in-core/schemas";
import { IMapItem } from "futbol-in-core/types";
import { Button, TextInput } from "futbol-in-ui";
import dynamic from "next/dynamic";
import { useState } from "react";

const SelectorMunicipio = dynamic(
  () => import("@/src/shared/components/SelectorMunicipio/SelectorMunicipio").then((mod) => mod.SelectorMunicipio),
  { ssr: false }
);
const SelectorTipoFutbolin = dynamic(
  () => import("@/src/shared/components/SelectorTipoFutbolin/SelectorTipoFutbolin").then((mod) => mod.default),
  { ssr: false }
);
const SelectorDistribucion = dynamic(
  () => import("@/src/shared/components/SelectorDistribucion/SelectorDistribucion").then((mod) => mod.default),
  { ssr: false }
);
const SelectorBar = dynamic(
  () => import("@/src/shared/components/SelectorBar/SelectorBar").then((mod) => mod.default),
  { ssr: false }
);
const SelectorDireccion = dynamic(
  () => import("@/src/shared/components/SelectorDireccion/SelectorDireccion").then((mod) => mod.default),
  { ssr: false }
);

export const AgregarPage = () => {
  const [ciudad, setCiudad] = useState<string>("");

  const [direccionOBar, setDireccionOBar] = useState<Pick<
    IMapItem,
    "direccion" | "nombre" | "lat" | "lng" | "googlePlaceId"
  > | null>(null);

  const [tipoFutbolin, setTipoFutbolin] = useState<TipoFutbolin>(
    TipoFutbolin.TSUNAMI
  );
  const [distribucion, setDistribucion] = useState<DistribucionFutbolin>(
    DistribucionFutbolin.F4
  );
  const [comentarios, setComentarios] = useState("");

  const [noEncuentraElBar, setNoEncuentraElBar] = useState(false);

  const handleSubmit = () => {
    if (!direccionOBar) return;

    const data: AgregarFutbolin = {
      nombre: direccionOBar.nombre || "",
      direccion: direccionOBar?.direccion || "",
      coordinates: [direccionOBar?.lng || 0, direccionOBar?.lat || 0],
      googlePlaceId: direccionOBar?.googlePlaceId || "",
      ciudad: ciudad || "",
      tipoLugar: TipoLugar.FUBTOLIN,
      tipoFutbolin: tipoFutbolin,
      distribucion: distribucion,
      comentarios: comentarios,
    };

  };

  return (
    <div className="p-3 flex flex-col gap-2 max-w-2xl mx-auto bg-neutral-950/50 backdrop-blur-xs rounded-xl md:mt-12 md:border border-neutral-600 md:p-8">
      <h1 className="font-bold text-2xl text-primary mb-3">
        Agregar nuevo futbolín
      </h1>
      <FormField>
        <FormLabel>Ciudad*</FormLabel>
        <SelectorMunicipio onSelect={(e) => setCiudad(String(e.value))} />
      </FormField>

      <div className="mb-2">
        {noEncuentraElBar ? (
          <FormField>
            <FormLabel>Dirección (incluye número)*</FormLabel>
            <SelectorDireccion onSelect={setDireccionOBar} />
          </FormField>
        ) : (
          <FormField>
            <FormLabel>Nombre del bar/sala de juegos etc.*</FormLabel>
            <SelectorBar onSelect={setDireccionOBar} ciudad={ciudad} />
          </FormField>
        )}

        <label className="flex items-center text-sm text-neutral-400">
          <input
            type="checkbox"
            className="mr-2 size-5 accent-primary"
            checked={noEncuentraElBar}
            onChange={(e) => setNoEncuentraElBar(e.target.checked)}
          />
          No aparece el bar que busco
        </label>
      </div>
      <div className="flex items-center gap-2">
        <FormField>
          <FormLabel>Tipo futbolín</FormLabel>
          <SelectorTipoFutbolin
            value={tipoFutbolin}
            onSelect={setTipoFutbolin}
          />
        </FormField>
        <FormField>
          <FormLabel>Distribución</FormLabel>
          <SelectorDistribucion
            value={distribucion}
            onSelect={setDistribucion}
          />
        </FormField>
      </div>
      <FormField>
        <FormLabel>Comentarios</FormLabel>
        <TextInput
          placeholder="Ciudad"
          className="w-full"
          value={comentarios}
          onChangeText={setComentarios}
        />
      </FormField>
      <Button label="Agregar" onClick={handleSubmit} icon={faPlus} />
    </div>
  );
};