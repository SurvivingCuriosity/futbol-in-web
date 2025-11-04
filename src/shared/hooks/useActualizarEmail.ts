import { useAuth } from "@/src/client/context/AuthContext";
import { API_URL } from "@/src/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CambiarEmailBody } from "futbol-in-core/schemas";
import { UserDTO } from "futbol-in-core/types";
import toast from "react-hot-toast";

export function useCambiarEmailService() {
  const { token } = useAuth();

  return async (payload: CambiarEmailBody): Promise<UserDTO> => {
    const res = await fetch(`${API_URL}/user/cambiar-email`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Error al cambiar el email");
    }

    return data.data;
  };
}


export function useCambiarEmail() {
  const cambiarEmail = useCambiarEmailService();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: cambiarEmail,
    onSuccess: (data) => {
      toast.success("Email actualizado. Revisa tu bandeja para confirmar el cambio.");
      // invalidar cache del usuario si procede
      qc.invalidateQueries({ queryKey: ["fullUser", data.id] });
    },
    onError: (err) => {
      toast.error(err.message || "Error al cambiar el email");
      console.error("[useCambiarEmail]", err);
    },
  });
}
