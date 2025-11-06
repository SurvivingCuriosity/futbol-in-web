import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
};

const sizeToMaxW: Record<NonNullable<Props["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  size = "md",
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
  children,
}: Props) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // ESC para cerrar
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeOnEsc, onClose]);

  // Focus inicial + bloquear scroll
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panelRef.current?.focus(), 0);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-60 flex items-center justify-center transition-opacity duration-200 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={closeOnOverlay ? onClose : undefined}
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={panelRef}
        className={`relative bg-neutral-900 rounded-2xl shadow-xl px-1 w-full ${
          sizeToMaxW[size]
        } mx-4 outline-none transform transition-transform duration-200 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-3">
            <h2 className="text-lg font-semibold text-primary">{title}</h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="pointer-events-auto p-2 bg-neutral-800/50 size-10 rounded-full aspect-square z-10 flex items-center justify-center"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-neutral-400 hover:text-neutral-700"
                />
              </button>
            )}
          </div>
        )}

        <div className="p-3 pt-0">{children}</div>
      </div>
    </div>
  );
};
