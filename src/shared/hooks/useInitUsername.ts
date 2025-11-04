import { useAuth } from "@/src/client/context/AuthContext";
import { API_URL } from "@/src/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SetUsernameBody } from "futbol-in-core/schemas";
import { UserDTO } from "futbol-in-core/types";
import toast from "react-hot-toast";

export function useInitUsernameService() {
  const { token } = useAuth();

  return async (payload: SetUsernameBody): Promise<UserDTO> => {
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


export function useInitUsername() {
  const cambiarUsername = useInitUsernameService();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: cambiarUsername,
    onSuccess: (data) => {
      toast.success("Nombre establecido. Te damos la bienvenida!");
      // invalidar cache del usuario si procede
      qc.invalidateQueries({ queryKey: ["fullUser", data.id] });
    },
    onError: (err) => {
      toast.error(err.message || "Error estableciendo el nombre");
      console.error("[useCambiarEmail]", err);
    },
  });
}
