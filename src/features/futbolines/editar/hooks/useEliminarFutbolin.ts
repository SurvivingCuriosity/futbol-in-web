import { useAuth } from "@/src/features/auth/context/AuthContext";
import { API_URL } from "@/src/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useEliminarFutbolinService() {
  const { token } = useAuth();

  return async (payload: {id:string}): Promise<number> => {
    const res = await fetch(`${API_URL}/futbolines/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Error al eliminar futboin");
    }

    return data.data;
  };
}


export function useEliminarFutbolin() {
  const eliminarFutbolin = useEliminarFutbolinService();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: eliminarFutbolin,
    onSuccess: () => {
      toast.success("Futbolín eliminado");
      qc.invalidateQueries({ queryKey: ["futbolines"] });
    },
    onError: (err) => {
      toast.error(err.message || "Error eliminando futbolin");
      console.error("[useCambiarEmail]", err);
    },
  });
}
