"use client";

import { fondosFutbolinesSinDeg } from "@/public/fondos";
import { useAuth } from "@/src/client/context/AuthContext";
import { GoBackWrapper } from "@/src/shared/components/GoBackWrapper";
import { LogoFutbolin } from "@/src/shared/components/LogoFutbolin";
import {
  faBuilding,
  faLocationArrow,
  faLocationDot,
  faPen,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpotDTO, UserDTO } from "futbol-in-core/types";
import { Button } from "futbol-in-ui";
import Image from "next/image";
import Link from "next/link";
import { BotoneraCompartir } from "./components/BotoneraCompartir";

const DetalleFutbolinScreen = ({
  futbolin,
  owner,
}: {
  futbolin: SpotDTO;
  owner: UserDTO;
}) => {
  const { user } = useAuth();
  const isOwner = user?.id === owner.id;

  return (
    <GoBackWrapper>
      <div className="max-w-xl mx-auto w-full flex flex-col gap-1">
        <div className="flex items-center gap-2 p-2">
          <LogoFutbolin tipo={futbolin.tipoFutbolin} size={50} />
          <h1 className="text-2xl font-bold md:text-3xl">
            {futbolin.tipoFutbolin}
          </h1>
        </div>
        <div className="relative h-full w-full">
          <div className="absolute top-2 left-2 z-3">
            <div className="flex flex-col gap-1 text-sm md:text-base md:grid md:gap-x-4 grid-cols-2 grid-rows-2 bg-neutral-950/60 backdrop-blur-xs p-2 rounded-xl w-fit">
              <div className="flex items-center gap-2 text-neutral-300">
                <FontAwesomeIcon icon={faLocationDot} className="w-4" />
                <p className="max-w-60 whitespace-pre-line">
                  {futbolin.ciudad}
                </p>
              </div>

              <div className="flex items-center gap-2 text-neutral-300">
                <FontAwesomeIcon icon={faLocationArrow} className="w-4" />
                <p className="max-w-60 whitespace-pre-line">
                  {futbolin.direccion}
                </p>
              </div>

              <div className="flex items-center gap-2 text-neutral-300 ">
                <FontAwesomeIcon icon={faBuilding} className="w-4" />
                <p className="max-w-60 whitespace-pre-line">
                  {futbolin.nombre}
                </p>
              </div>

              <div className="flex items-center gap-2 text-neutral-300">
                <FontAwesomeIcon icon={faPerson} className="w-4" />
                <p className="max-w-60 whitespace-pre-line">
                  Distribución: {futbolin.distribucion}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 left-0 z-3 w-full px-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm">
                <p className="text-neutral-300">
                  {new Date(
                    futbolin.createdAt as unknown as string
                  ).toLocaleDateString()}{" "}
                  por{" "}
                </p>
                <Link href={`/app/user/${owner.name}`}>
                  <p className="text-primary underline">{owner.name}</p>
                </Link>
              </span>

              <BotoneraCompartir
                googlePlaceId={futbolin.googlePlaceId}
                idSpot={futbolin.id}
              />
            </div>
          </div>

          <Image
            src={fondosFutbolinesSinDeg[futbolin.tipoFutbolin]}
            alt={futbolin.tipoFutbolin}
            width={200}
            height={200}
            className="w-full"
          />
          <div className="absolute inset-0 bg-linear-to-b from-neutral-950 via-neutral-950/10 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
        </div>
        <div className="flex items-center gap-2 p-3 mt-10">
          {isOwner && (
            <Button label="Editar" icon={faPen} variant="neutral" size="sm" />
          )}
          <Button
            size="sm"
            label="Reportar"
            variant="danger-outline"
          />
        </div>
      </div>
    </GoBackWrapper>
  );
};

export default DetalleFutbolinScreen;
