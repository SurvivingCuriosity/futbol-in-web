import { useAuth } from "@/src/features/auth/context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IncidenciaDTO } from "./types";
import { API_URL } from "@/src/config";

export const incidenciaKeys = {
  root: ["incidencias"] as const,
  allAdmin: () => [...incidenciaKeys.root, "all"] as const,
  spot: (spotId: string) => [...incidenciaKeys.root, "spot", spotId] as const,
};

// 🔹 Crear incidencia
function useCrearIncidenciaService() {
  const { token } = useAuth();

  return async (payload: { spotId: string; texto?: string }): Promise<IncidenciaDTO> => {
    const res = await fetch(`${API_URL}/incidencias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || "Error creando incidencia");
    return data.data;
  };
}

// 🔹 Listar incidencias (solo admin)
function useListarIncidenciasAllAdminService() {
  const { token } = useAuth();

  return async (): Promise<IncidenciaDTO[]> => {
    const res = await fetch(`${API_URL}/incidencias`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || "Error obteniendo incidencias");
    return data.data;
  };
}

// 🔹 Listar incidencias por futbolín (pública)
function useListarIncidenciasPorSpotService() {
  const { token } = useAuth();

  return async (spotId: string): Promise<IncidenciaDTO[]> => {
    const res = await fetch(`${API_URL}/incidencias/spot/${spotId}`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const data = await res.json();
    if (!res.ok || !data.success)
      throw new Error(data.error || "Error cargando incidencias del futbolín");
    return data.data;
  };
}

// 🔹 Borrar incidencia (admin o creador)
function useBorrarIncidenciaService() {
  const { token } = useAuth();

  return async ({ id }: { id: string }): Promise<{ id: string }> => {
    const res = await fetch(`${API_URL}/incidencias/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || "Error borrando incidencia");
    return data.data;
  };
}

// -----------------------------
// 🔹 React Query hooks
// -----------------------------

export function useIncidenciasBySpot(spotId: string) {
  const listar = useListarIncidenciasPorSpotService();

  return useQuery({
    queryKey: incidenciaKeys.spot(spotId),
    queryFn: () => listar(spotId),
    enabled: !!spotId,
  });
}

export function useIncidenciasAllAdmin() {
  const listarAll = useListarIncidenciasAllAdminService();

  return useQuery({
    queryKey: incidenciaKeys.allAdmin(),
    queryFn: listarAll,
  });
}

export function useCrearIncidencia() {
  const crear = useCrearIncidenciaService();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: crear,
    onSuccess: (data) => {
      toast.success("Incidencia creada correctamente");
      qc.invalidateQueries({ queryKey: incidenciaKeys.spot(data.spotId) });
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
    mutationFn: ({ id, spotId }: { id: string; spotId: string }) => borrar({ id }),

    onMutate: async ({ id, spotId }) => {
      await qc.cancelQueries({ queryKey: incidenciaKeys.spot(spotId) });
      const key = incidenciaKeys.spot(spotId);
      const prev = qc.getQueryData<IncidenciaDTO[]>(key);
      if (prev) {
        qc.setQueryData(
          key,
          prev.filter((i) => i.id !== id)
        );
      }
      return { prev, key };
    },

    onError: (err: any, _vars, ctx) => {
      if (ctx?.prev && ctx?.key) qc.setQueryData(ctx.key, ctx.prev);
      toast.error(err.message || "Error borrando incidencia");
      console.error("[useBorrarIncidencia]", err);
    },

    onSuccess: (_data, { spotId }) => {
      toast.success("Incidencia eliminada");
      qc.invalidateQueries({ queryKey: incidenciaKeys.allAdmin() });
      qc.invalidateQueries({ queryKey: incidenciaKeys.spot(spotId) });
    },
  });
}
