export class StorageClient {
  static async getImageUrl(imageName: string): Promise<string> {
    if (!imageName) return "";
    const response = await fetch(
      `/api/storage/files?path=${encodeURIComponent(imageName)}`
    );
    if (!imageName) {
      throw new Error("Intentando buscar imagen sin url");
    }
    if (!response.ok) {
      throw new Error("StorageClient: Error al obtener imagen");
    }
    const { url } = await response.json();

    return url;
  }

  static async upload(file: File, type: "user" | "equipo"): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const response = await fetch("/api/storage/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("StorageClient: Error al subir imagen");
    }

    const { path } = await response.json();
    return path;
  }

  static async delete(path: string): Promise<string> {
    const response = await fetch("/api/storage/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    });

    if (!response.ok) {
      throw new Error("StorageClient: Error al eliminar imagen");
    }

    const data = await response.json();
    return data.path;
  }
}
