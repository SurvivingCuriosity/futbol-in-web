import { API_URL } from "@/src/config";


export class MapsClient {
  static async searchMunicipio(q: string) {
    if (!q.trim()) return [];
    const res = await fetch(
      `${API_URL}/maps/searchMunicipio?q=${encodeURIComponent(q)}`,
    );
    const data = await res.json();
    return data.data;
  }
}
