import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import HostSidebar from "@/components/HostSidebar";

export default function HostLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex">
        <HostSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
