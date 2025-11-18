"use client";

import { useScrollThreshold } from "@/src/shared/hooks/ui/useScrollThreshold";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ScrollTopBtn = () => {
  const show = useScrollThreshold(400);

  return (
    <button
      type="button"
      aria-label="Scroll top button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`transition-transform duration-500 fixed bottom-3 right-3 ${
        show ? "translate-y-0" : "translate-y-20"
      } bg-neutral-800 size-10 z-20 rounded-full flex items-center justify-center text-neutral-400`}
    >
      <FontAwesomeIcon icon={faChevronUp} />
    </button>
  );
};
