import { useAuth } from "@/src/client/context/AuthContext";
import { API_URL } from "@/src/config";
import { useMutation } from "@tanstack/react-query";
import { EditarFutbolinBody } from "futbol-in-core/schemas";
import toast from "react-hot-toast";

export function useEditarFutbolin() {
  const { token } = useAuth();

  const mutation = useMutation({
    mutationFn: async (payload: EditarFutbolinBody & {idFutbolin:string}) => {
      const res = await fetch(
        `${API_URL}/futbolines/${payload.idFutbolin}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || "Error al actualizar futbolin");

      return data;
    },
    onSuccess: () => {
      toast.success("Futbolín actualizado");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Error inesperado");
    },
  });

  return mutation;
}
