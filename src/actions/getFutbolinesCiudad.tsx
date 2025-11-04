import { ApiResponse, Bar, SpotDTO } from "futbol-in-core/types";
import { API_URL } from "../config";

export const getFutbolinesCiudad = async (ciudad:string) => {
  const res = await fetch(`${API_URL}/futbolines/ciudad/${ciudad}`, {
    next: { revalidate: 60 },
  });
  const { data } = (await res.json()) as ApiResponse<SpotDTO[]>;
  return data || [];
};

export const getFutbolinesMarca = async (marca:string) => {
  const res = await fetch(`${API_URL}/futbolines/marca/${marca}`, {
    next: { revalidate: 60 },
  });
  const { data } = (await res.json()) as ApiResponse<SpotDTO[]>;
  return data || [];
};

export const getBaresFromPlaceIds = async (placeIds:string[]) => {
  const res = await fetch(`${API_URL}/maps/getBaresFromPlaceIds?placeIds=${placeIds.join(",")}`, {
    next: { revalidate: 60 },
  });
  const { data } = (await res.json()) as ApiResponse<Bar[]>;
  return data || [];
};
