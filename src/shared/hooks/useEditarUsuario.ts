import { useAuth } from "@/src/client/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditarUserBody } from "futbol-in-core/schemas";
import { UserDTO } from "futbol-in-core/types";
import toast from "react-hot-toast";

function useEditarUsuarioService() {
  const { token } = useAuth();

  return async (payload: EditarUserBody): Promise<UserDTO> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/editar`, {
      method: "PATCH",
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

    return data.data as UserDTO;
  };
}

export function useEditarUsuario() {
  const editar = useEditarUsuarioService();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: editar,
    onSuccess: (data) => {
      toast.success("Perfil actualizado correctamente");
      qc.invalidateQueries({ queryKey: ["fullUser", data.id] });
    },
    onError: (err) => {
      const msg =
        err instanceof Error ? err.message : "Error desconocido al actualizar";
      toast.error(msg);
      console.error(err);
    },
  });
}
