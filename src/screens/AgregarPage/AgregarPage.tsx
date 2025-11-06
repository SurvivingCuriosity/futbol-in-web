"use client";

import { FormField, FormLabel } from "@/src/shared/components/FormField";
import { useModal } from "@/src/shared/context/UIProvider/hooks/useUI";
import { faMap, faPlus } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DistribucionFutbolin,
  TipoFutbolin,
  TipoLugar,
} from "futbol-in-core/enum";
import { AgregarFutbolin, agregarFutbolinSchema } from "futbol-in-core/schemas";
import { IMapItem } from "futbol-in-core/types";
import { Button } from "futbol-in-ui";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Confetti from "react-confetti";
import { Controller, useForm } from "react-hook-form";
import { useAgregarFutbolin } from "./api";

const SelectorMunicipio = dynamic(
  () =>
    import("@/src/shared/components/SelectorMunicipio/SelectorMunicipio").then(
      (mod) => mod.SelectorMunicipio
    ),
  { ssr: false }
);
const SelectorTipoFutbolin = dynamic(
  () =>
    import(
      "@/src/shared/components/SelectorTipoFutbolin/SelectorTipoFutbolin"
    ).then((mod) => mod.default),
  { ssr: false }
);
const SelectorDistribucion = dynamic(
  () =>
    import(
      "@/src/shared/components/SelectorDistribucion/SelectorDistribucion"
    ).then((mod) => mod.default),
  { ssr: false }
);
const SelectorBar = dynamic(
  () =>
    import("@/src/shared/components/SelectorBar/SelectorBar").then(
      (mod) => mod.default
    ),
  { ssr: false }
);
const SelectorDireccion = dynamic(
  () =>
    import("@/src/shared/components/SelectorDireccion/SelectorDireccion").then(
      (mod) => mod.default
    ),
  { ssr: false }
);

export const AgregarPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<AgregarFutbolin>({
    resolver: zodResolver(agregarFutbolinSchema),
    defaultValues: {
      ciudad: "",
      nombre: "",
      direccion: "",
      tipoFutbolin: TipoFutbolin.TSUNAMI,
      distribucion: DistribucionFutbolin.F4,
      comentarios: "",
      googlePlaceId: "",
      tipoLugar: TipoLugar.FUBTOLIN,
      coordinates: [],
    },
  });

  const { openModal, closeModal } = useModal();
  const { mutate: agregarFutbolin } = useAgregarFutbolin();

  const ciudad = watch("ciudad");
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

  const [showConfetti, setShowConfetti] = useState(false);

  const onSubmit = (data: AgregarFutbolin) => {
    agregarFutbolin(data, {
      onSuccess: (res) => {
        // 🎉 feedback visual inmediato
        setShowConfetti(true);
        openModal(
          <div className="text-center py-4">
            <p className="text-neutral-300 text-sm">
              Gracias por contribuir a la comunidad de Futbol-In.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Button
                label="Ir al mapa"
                size="sm"
                icon={faMap}
                variant="outline"
                onClick={() => {
                  router.replace(`/app/mapa?selected=${res.id}`);
                  setShowConfetti(false);
                  closeModal();
                }}
              />
              <Button
                label="Agregar otro"
                size="sm"
                icon={faPlus}
                onClick={() => {
                  reset();
                  window.location.reload()
                  setShowConfetti(false);
                  closeModal();
                }}
              />
            </div>
          </div>,
          {
            title: "¡Futbolín agregado! 🎉",
            closeOnEsc: true,
            closeOnOverlay: true,
            showCloseButton: true,
            size: "md",
          }
        );
      },
    });
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          numberOfPieces={350}
          colors={["#6ed559", "#0f4900", "#94fa80"]}
        />
      )}
      <div className="overflow-y-auto p-3 flex flex-col h-full gap-2 max-w-2xl mx-auto bg-neutral-950/50 backdrop-blur-xs rounded-xl md:mt-12 md:border border-neutral-600 md:p-8">
        <h1 className="font-bold text-2xl text-primary mb-3">
          Agregar nuevo futbolín
        </h1>

        {/* CIUDAD */}
        <FormField>
          <FormLabel>Ciudad*</FormLabel>
          <Controller
            control={control}
            name="ciudad"
            render={({ field }) => (
              <SelectorMunicipio
                onSelect={(option) => field.onChange(String(option.value))}
              />
            )}
          />
          {errors.ciudad?.message && (
            <p className="text-sm text-red-500">{errors.ciudad?.message}</p>
          )}
        </FormField>

        {/* NOMBRE / DIRECCIÓN */}
        <div className="mb-2">
          {noEncuentraElBar ? (
            <FormField>
              <FormLabel>Dirección (incluye número)*</FormLabel>
              <Controller
                control={control}
                name="direccion"
                render={({ field }) => (
                  <SelectorDireccion
                    onSelect={(direccion) => {
                      setValue("coordinates", [direccion.lat, direccion.lng]);
                      setValue("googlePlaceId", direccion.googlePlaceId);
                      setValue("nombre", direccion.nombre);
                      field.onChange(String(direccion));
                      setDireccionOBar(direccion);
                    }}
                  />
                )}
              />
              {errors.direccion?.message && (
                <p className="text-sm text-red-500">
                  {errors.direccion?.message}
                </p>
              )}
            </FormField>
          ) : (
            <FormField>
              <FormLabel>Nombre del bar/sala de juegos etc.*</FormLabel>
              <Controller
                control={control}
                name="nombre"
                render={({ field }) => (
                  <SelectorBar
                    ciudad={ciudad}
                    onSelect={(bar) => {
                      setValue("coordinates", [bar.lat, bar.lng]);
                      setValue("googlePlaceId", bar.googlePlaceId);
                      setValue("nombre", bar.nombre);
                      setValue("direccion", bar.direccion);
                      field.onChange(bar.nombre);
                      setDireccionOBar(bar);
                    }}
                  />
                )}
              />
              {errors.nombre?.message && (
                <p className="text-sm text-red-500">{errors.nombre?.message}</p>
              )}
            </FormField>
          )}

          <label className="flex items-center text-sm text-neutral-400 mt-1">
            <input
              type="checkbox"
              className="mr-2 size-5 accent-primary"
              checked={noEncuentraElBar}
              onChange={(e) => setNoEncuentraElBar(e.target.checked)}
            />
            No aparece el bar que busco
          </label>
        </div>

        {/* SELECTORES DE TIPO Y DISTRIBUCIÓN */}
        <div className="flex items-center gap-2">
          <FormField>
            <FormLabel>Tipo futbolín</FormLabel>
            <SelectorTipoFutbolin
              value={tipoFutbolin}
              onSelect={(t) => {
                setTipoFutbolin(t);
                setValue("tipoFutbolin", t);
              }}
            />
          </FormField>

          <FormField>
            <FormLabel>Distribución</FormLabel>
            <SelectorDistribucion
              value={distribucion}
              onSelect={(d) => {
                setDistribucion(d);
                setValue("distribucion", d);
              }}
            />
          </FormField>
        </div>

        {/* COMENTARIOS */}
        <FormField>
          <FormLabel>Comentarios</FormLabel>
          <textarea
            value={comentarios}
            onChange={(e) => {
              setComentarios(e.target.value);
              setValue("comentarios", e.target.value);
            }}
            className="border border-neutral-500 rounded-xl min-h-20 max-h-40 p-2 text-sm"
            placeholder="Escribe aquí detalles útiles para el resto de usuarios"
          />
        </FormField>

        <Button
          label="Agregar"
          onClick={handleSubmit(onSubmit)}
          icon={faPlus}
          loading={isSubmitting}
        />
      </div>
    </>
  );
};
