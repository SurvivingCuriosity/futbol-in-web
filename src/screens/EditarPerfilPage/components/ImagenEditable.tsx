"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface ImagenEditableProps {
  url: string;
  onNewImage: (file: File) => void;
  width?: number;
  height?: number;
  loading?: boolean;
}

export const ImagenEditable: React.FC<ImagenEditableProps> = ({
  url,
  onNewImage,
  width = 100,
  height = 100,
  loading = false,
}) => {
  const [preview, setPreview] = useState(url);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(url);
  }, [url]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);
      onNewImage(file);
    },
    [onNewImage]
  );

  const handlePick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div
      className="relative inline-block"
      style={{
        width,
        height,
      }}
    >
      <div
        className="overflow-hidden rounded-full border border-neutral-700 relative group"
        style={{ width, height }}
      >
        <Image
          src={preview || "https://placehold.co/100x100?text=User"}
          alt="Imagen de usuario"
          width={width}
          height={height}
          className="object-cover w-full h-full"
        />

        {/* Capa semitransparente con icono */}
        <button
          type="button"
          onClick={handlePick}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Cambiar imagen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z"
            />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </button>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      {/* input oculto */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
