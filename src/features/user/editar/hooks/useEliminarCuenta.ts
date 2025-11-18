import { useAuth } from "@/src/features/auth/context/AuthContext";
import { API_URL } from "@/src/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserDTO } from "futbol-in-core/types";
import toast from "react-hot-toast";

export function useEliminarCuentaService() {
  const { token } = useAuth();

  return async (): Promise<UserDTO> => {
    const res = await fetch(`${API_URL}/user/eliminar`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Error al eliminar cuenta");
    }

    return data.data;
  };
}

export function useEliminarCuenta() {
  const { logout } = useAuth();
  const cambiarEmail = useEliminarCuentaService();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: cambiarEmail,
    onSuccess: (data) => {
        logout()
      toast.success(
        "Se han eliminiado tus datos."
      );
      // invalidar cache del usuario si procede
      qc.invalidateQueries({ queryKey: ["fullUser", data.id] });
    },
    onError: (err) => {
      toast.error(err.message || "Error al eliminar la cuenta");
      console.error("[useEliminarCuenta]", err);
    },
  });
}
