import { NavLayout } from "@/src/shared/components/NavLayout/NavLayout";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <NavLayout>{children}</NavLayout>;
}