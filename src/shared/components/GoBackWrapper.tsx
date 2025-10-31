"use client";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { AppLogo } from "./NavLayout/AppLogo";

export const GoBackWrapper = ({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading?: string;
}) => {
  const router = useRouter();

  return (
    <div className="md:pb-12 flex flex-col h-full">
      <div className="flex items-center justify-between gap-2 p-3 border-b border-neutral-800 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <button
            aria-label="Volver"
            onClick={() => router.back()}
            className="size-10 shrink-0 rounded-full bg-neutral-800 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          {heading && <p>{heading}</p>}
        </div>
        <div className="block md:hidden">
          <AppLogo />
        </div>
      </div>
      {children}
    </div>
  );
};
