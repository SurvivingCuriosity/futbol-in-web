import { TopNav } from "./TopNav";

export function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh w-full">
      <TopNav />
      <main className=" md:max-w-7xl md:mx-auto z-1 ">
        <div className="z-1 relative w-full py-4">{children}</div>
      </main>
    </div>
  );
}
