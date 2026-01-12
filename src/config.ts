export const API_URL =
  process.env.NODE_ENV === "development"
    ? `http://192.168.0.19:4000`
    : process.env.NEXT_PUBLIC_API_URL;


