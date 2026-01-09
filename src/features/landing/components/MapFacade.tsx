"use client";

import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpotDTO } from "futbol-in-core/types";
import Image from "next/image";
import { useState } from "react";
import { MapaLandingClient } from "./MapaLanding";

interface MapFacadeProps {
    markers: SpotDTO[];
}

export const MapFacade = ({ markers }: MapFacadeProps) => {
    const [showMap, setShowMap] = useState(false);

    if (showMap) {
        return <MapaLandingClient markers={markers} />;
    }

    return (
        <div className="relative w-full h-full group cursor-pointer" onClick={() => setShowMap(true)}>
            <Image
                src="/map-placeholder.jpg"
                alt="Mapa de futbolines"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Overlay to darken and show CTA */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex flex-col items-center justify-center gap-3">
                <div className="p-4 bg-background/10 backdrop-blur-md rounded-full border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <FontAwesomeIcon icon={faMapLocationDot} className="w-8 h-8 text-accent" />
                </div>
                <span className="font-semibold text-white/90 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                    Ver mapa interactivo
                </span>
            </div>
        </div>
    );
};
