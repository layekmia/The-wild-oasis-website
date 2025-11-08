import SideNavigation from "@/components/SideNavigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] gap-12 h-full">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}
