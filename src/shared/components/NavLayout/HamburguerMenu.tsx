import { useEffect } from "react";

export const HamburguerMenu = ({
  isOpen,
  onClose,
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {

    useEffect(() => {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen])

  return (
    <div
      className={`fixed top-15 -right-full h-[calc(100svh-60px)] w-full bg-neutral-950 ${
        isOpen ? "-translate-x-full" : "translate-x-0"
      } transition-transform duration-300 z-10`}
    >
        <div onClick={onClose}>
        {children}
        </div>
    </div>
  );
};
