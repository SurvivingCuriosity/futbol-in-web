import { useAuth } from "@/src/features/auth/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_URL } from "@/src/config";

// Clave del cache de futbolines — invalidar aquí refresca el mapa entero
const FUTBOLINES_ALL_KEY = ["futbolines", "all"];

// 🔹 Crear incidencia — POST /futbolines/:spotId/incidencias
function useCrearIncidenciaService() {
  const { token } = useAuth();

  return async (payload: { spotId: string; texto?: string }) => {
    const res = await fetch(
      `${API_URL}/futbolines/${payload.spotId}/incidencias`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ texto: payload.texto }),
      }
    );

    const data = await res.json();
    if (!res.ok || !data.success)
      throw new Error(data.error || "Error creando incidencia");
    return data.data as { spotId: string };
  };
}

// 🔹 Borrar incidencia — DELETE /futbolines/:spotId/incidencias/:id
function useBorrarIncidenciaService() {
  const { token } = useAuth();

  return async ({ id, spotId }: { id: string; spotId: string }) => {
    const res = await fetch(
      `${API_URL}/futbolines/${spotId}/incidencias/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    if (!res.ok || !data.success)
      throw new Error(data.error || "Error borrando incidencia");
    return data.data as { id: string };
  };
}

// -----------------------------
// 🔹 React Query hooks
// -----------------------------

export function useCrearIncidencia() {
  const crear = useCrearIncidenciaService();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: crear,
    onSuccess: () => {
      toast.success("Incidencia creada correctamente");
      qc.invalidateQueries({ queryKey: FUTBOLINES_ALL_KEY });
    },
    onError: (err: any) => {
      toast.error(err.message || "Error creando incidencia");
      console.error("[useCrearIncidencia]", err);
    },
  });
}

export function useBorrarIncidencia() {
  const borrar = useBorrarIncidenciaService();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: borrar,
    onSuccess: () => {
      toast.success("Incidencia eliminada");
      qc.invalidateQueries({ queryKey: FUTBOLINES_ALL_KEY });
    },
    onError: (err: any) => {
      toast.error(err.message || "Error borrando incidencia");
      console.error("[useBorrarIncidencia]", err);
    },
  });
}
