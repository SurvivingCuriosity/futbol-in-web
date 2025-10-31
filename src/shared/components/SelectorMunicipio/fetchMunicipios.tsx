

export class MapsClient {
  static async searchMunicipio(q: string) {
    if (!q.trim()) return [];
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/maps/searchMunicipio?q=${encodeURIComponent(q)}`,
    );
    const data = await res.json();
    return data.data;
  }
}
