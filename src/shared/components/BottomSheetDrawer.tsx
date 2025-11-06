import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ReactNode, useEffect } from "react";

type BottomSheetDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export const BottomSheetDrawer = ({
  isOpen,
  onClose,
  children,
  title,
}: BottomSheetDrawerProps) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div
      className={`text-neutral-500 font-medium placeholder:text-neutral-500 fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      {/* Sheet */}
      <div
        className={`max-w-lg overflow-hidden absolute ml-auto md:h-screen bottom-0 left-0 right-0 bg-neutral-900 rounded-t-2xl md:rounded-t-none md:rounded-l-2xl shadow-lg transition-transform duration-300 transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="relative">
          <button onClick={onClose} className="pointer-events-auto absolute top-2 right-2 p-2 bg-neutral-800/50 size-10 rounded-full aspect-square z-10 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faXmark}
              className="text-neutral-400 hover:text-neutral-700"
            />
          </button>
          {title && <h2 className="text-xl font-bold mb-2 text-primary p-3 pb-0">{title}</h2>}
          {children}
        </div>
      </div>
    </div>
  );
};
