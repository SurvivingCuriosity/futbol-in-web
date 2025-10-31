"use client";
import { useAuth } from "@/src/client/context/AuthContext";
import { UserStatus } from "futbol-in-core/enum";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImagenEditableConCrop } from "./ImagenEditableConCrop";

interface CambiarImagenPerfilProps {
  url: string;
  nombreImagen?: string | null;
  userStatus?: UserStatus;
  onImageChanged?: (newUrl: string | null) => void;
}

export function CambiarImagenPerfil({
  url,
  nombreImagen,
  onImageChanged,
}: CambiarImagenPerfilProps) {
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  async function handleNewImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("action", nombreImagen ? "replace" : "upload");
    if (nombreImagen) formData.append("currentImage", nombreImagen);

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/imagen`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error al actualizar la imagen (${res.status})`);
      }

      const data = await res.json();

      if (data.success && data.url) {
        toast.success("Imagen actualizada correctamente");
        onImageChanged?.(data.url);
      } else {
        toast.success("Imagen eliminada");
        onImageChanged?.(null);
      }
    } catch (err: unknown) {
      toast.error(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImagenEditableConCrop
      url={url || "/default_user.svg"}
      onNewImage={handleNewImage}
      width={130}
      height={130}
      loading={loading}
    />
  );
}
