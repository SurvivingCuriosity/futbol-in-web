export const API_URL =
  process.env.NODE_ENV === "development"
    ? `http://10.28.95.105:3000`
    : process.env.NEXT_PUBLIC_API_URL;

    
