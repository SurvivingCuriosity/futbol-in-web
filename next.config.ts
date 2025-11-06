import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // Avatares de Google (p. ej. OAuth)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**", // cualquier ruta
      },
      {
        protocol: "https",
        hostname: "futbolin.app",
        pathname: "/**", // cualquier ruta
      },
      // Imágenes firmadas en tu bucket
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/futbolin/**", // carpeta del bucket
        // ⬆️  Al no declarar `search`, Next acepta cualquier query‑string
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        pathname: "/**", // carpeta del bucket
        // ⬆️  Al no declarar `search`, Next acepta cualquier query‑string
      },
    ],
  },
};

export default nextConfig;
