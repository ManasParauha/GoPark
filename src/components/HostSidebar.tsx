"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MapPin,
  Inbox,
  Calendar,
  DollarSign,
  Star,
  Settings as SettingsIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: "Overview", href: "/Host", icon: Home },
  { name: "My Spots", href: "/Host/spots", icon: MapPin },
  { name: "Requests", href: "/Host/requests", icon: Inbox },
  { name: "Bookings", href: "/Host/bookings", icon: Calendar },
  { name: "Earnings", href: "/Host/earnings", icon: DollarSign },
  { name: "Reviews", href: "/Host/reviews", icon: Star },
  { name: "Settings", href: "/Host/settings", icon: SettingsIcon },
];

function NavGroup({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  return (
    <SidebarGroup className="mt-2 space-y-1  ">
      {navItems.map(({ name, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-muted"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="truncate">{name}</span>}
          </Link>
        );
      })}
    </SidebarGroup>
  );
}

export default function HostSidebar({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <Sidebar
      className={cn(
        "border-r transition-all duration-300 overflow-hidden ",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader className="h-16 flex items-center justify-center text-xl font-semibold border-b">
        {collapsed ? "🚗" : "GoPark"}
      </SidebarHeader>
      <SidebarContent>
        <NavGroup collapsed={collapsed} />
      </SidebarContent>
      <SidebarFooter className="pb-4" />
    </Sidebar>
  );
}
