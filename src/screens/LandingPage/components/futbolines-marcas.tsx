"use client";

import { marcas } from "@/src/app/(public)/marcas/[marca]/page";
import Image from "next/image";
import Link from "next/link";



export const FutbolinesMarcas = () => {
  return (
    <section id="marcas" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            ¿Tienes tus preferencias? Encuentra tu{" "}
            <span className="text-primary">marca favorita</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marcas.map((marca, index) => (
            <Link
              href={`/marcas/${marca.label}`}
              key={index}
              className={`relative overflow-hidden rounded-2xl aspect-video flex items-end justify-start group border border-neutral-800 hover:border-primary transition-colors duration-300`}
            >
              <Image
                src={marca.fondo}
                alt={marca.label}
                width={400}
                height={300}
                className="aspect-video absolute w-full h-full object-cover object-top scale-110 group-hover:scale-100 transition-transform duration-300"
              />

              <Image
                src={marca.logo}
                alt={marca.label}
                width={200}
                height={200}
                className="aspect-square absolute z-10 size-40 top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 group-hover:scale-120 transition-transform duration-300"
              />

              <div className="absolute inset-0 bg-linear-to-r to-transparent via-neutral-900/70 from-neutral-900" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
