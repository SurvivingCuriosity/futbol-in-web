import { useAuth } from "@/src/client/context/AuthContext";
import { API_URL } from "@/src/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AgregarFutbolin } from "futbol-in-core/schemas";
import { SpotDTO } from "futbol-in-core/types";
import toast from "react-hot-toast";

function useAgregarFutbolinService() {
  const { token } = useAuth();

  return async (payload: AgregarFutbolin): Promise<SpotDTO> => {
    const res = await fetch(`${API_URL}/futbolines/agregar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      // El backend ya devuelve { success: false, message, error, ... }
      const msg = data?.message || data?.error || "Error al actualizar usuario";
      throw new Error(msg);
    }

    return data.data;
  };
}

export function useAgregarFutbolin() {
  const crearFutbolin = useAgregarFutbolinService();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: crearFutbolin,
    onSuccess: (data) => {
      toast.success("Futbolín agregado correctamente");
      qc.invalidateQueries({ queryKey: ["fullUser", data.id] });
    },
    onError: (err) => {
      const msg =
        err instanceof Error ? err.message : "Error desconocido al crear futbolín";
      toast.error(msg);
      console.error(err);
    },
  });
}
