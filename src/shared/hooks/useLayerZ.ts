import { useEffect, useRef, useState } from "react";

const BASE = 1000;
let openCount = 0;

export function useLayerZ() {
  const [z, setZ] = useState(BASE);
  const idxRef = useRef<number | null>(null);

  useEffect(() => {
    openCount += 1;
    idxRef.current = openCount;
    const newZ = BASE + openCount * 10;
    setZ(newZ);
    
    return () => {
      openCount = Math.max(0, openCount - 1);
    };
  }, []);

  return z;
}
