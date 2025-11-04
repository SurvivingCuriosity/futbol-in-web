import { API_URL } from "@/src/config";
import { useQuery } from "@tanstack/react-query";
import { SpotDTO, UserDTO } from "futbol-in-core/types";

export interface FullUser {
  user: UserDTO;
  futbolines: SpotDTO[];
  imagen: string | null;
}

export const fetchFullUser = async (userId: string) =>
  (await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/full?userId=" + userId)).json()

export function useGetFullUser(idUser: string) {
  return useQuery({
    queryKey: ["fullUser", idUser],
    queryFn: () => fetchFullUser(idUser),
    select: (data) => data.data,
    staleTime: 60_000,
    enabled: !!idUser
  });
}


export const fetchFullUserByUsername = async (username: string) =>
  (await fetch(`${API_URL}/user/byUsername?username=${username}`)).json()

export function useGetFullUserByUsername(username: string) {
  return useQuery({
    queryKey: ["fullUser", username],
    queryFn: () => fetchFullUserByUsername(username),
    select: (data) => data.data,
    staleTime: 60_000,
    enabled: !!username
  });
}
