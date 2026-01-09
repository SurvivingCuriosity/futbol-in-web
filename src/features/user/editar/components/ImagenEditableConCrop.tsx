"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImagenEditableConCropProps {
  url: string;
  onNewImage: (file: File) => void;
  width?: number;
  height?: number;
  loading?: boolean;
}

export const ImagenEditableConCrop: React.FC<ImagenEditableConCropProps> = ({
  url,
  onNewImage,
  width = 150,
  height = 150,
  loading = false,
}) => {
  const [src, setSrc] = useState<string>(url);
  const [crop, setCrop] = useState<Crop>({ unit: "%", width: 80, height: 80, x: 0, y: 0 });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cuando se cambia la imagen inicial
  useEffect(() => {
    setSrc(url);
  }, [url]);

  const handlePick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const localUrl = URL.createObjectURL(file);
      setSrc(localUrl);
      setShowCropper(true);
    },
    []
  );

  // Recortar al confirmar
  const getCroppedImage = useCallback(async () => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) return;

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx!.imageSmoothingQuality = "high";

    ctx!.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Convertir a File
    return new Promise<File | null>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(null);
          const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
          resolve(file);
        },
        "image/jpeg",
        0.9
      );
    });
  }, [completedCrop]);

  const handleConfirmCrop = useCallback(async () => {
    const file = await getCroppedImage();
    if (file) {
      onNewImage(file);
      setShowCropper(false);
    }
  }, [getCroppedImage, onNewImage]);

  return (
    <div className="relative inline-block">
      <div
        className="relative overflow-hidden rounded-full border border-neutral-700 group"
        style={{ width, height }}
      >
        <Image
          src={src || "/default_user.svg"}
          alt="Avatar"
          width={width}
          height={height}
          className="object-cover w-full h-full"
        />
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

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      {/* File input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Modal de recorte */}
      {showCropper && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 p-4 rounded-lg shadow-lg flex flex-col items-center">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop
            >
              <img
                ref={imgRef}
                src={src}
                alt="Recortar"
                className="max-h-[70vh] max-w-[90vw]"
              />
            </ReactCrop>

            <canvas ref={canvasRef} className="hidden" />

            <div className="flex gap-4 mt-4">
              <button
                className="px-4 py-2 bg-neutral-700 rounded hover:bg-neutral-600"
                onClick={() => setShowCropper(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500"
                onClick={handleConfirmCrop}
              >
                Confirmar recorte
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
