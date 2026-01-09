export const HamburguerIcon = ({ isOpen, onClick }: { isOpen: boolean, onClick: () => void }) => {
  return (
    <button aria-label="Menu" className="size-4 flex flex-col justify-between" onClick={onClick}>
      <span className={`transition-transform duration-300 w-full h-0.5 bg-neutral-500 origin-top-left ${isOpen ? 'rotate-45 scale-125' : 'rotate-0'}`}></span>
      <span className={`transition-transform duration-300 w-full h-0.5 bg-neutral-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
      <span className={`transition-transform duration-300 w-full h-0.5 bg-neutral-500 origin-bottom-left ${isOpen ? '-rotate-45 scale-125' : 'rotate-0'}`}></span>
    </button>
  );
};
