"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  gradientFrom: string;
  gradientTo: string;
  warning?: boolean;
}

function StatCard({ title, value, subtitle, gradientFrom, gradientTo, warning }: StatCardProps) {
  return (
    <Card className={cn("rounded-2xl shadow-md", warning && "border-destructive text-destructive-foreground")}>
      <CardHeader
        className="h-2 rounded-t-2xl"
        style={{
          backgroundImage: `linear-gradient(to right, var(--${gradientFrom}), var(--${gradientTo}))`,
        }}
      />
      <CardContent className="p-5 flex flex-col gap-1">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
      </CardContent>
    </Card>
  );
}

export default function HostStatCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Today's Earnings"
        value="₹2,450"
        subtitle="vs yesterday +8%"
        gradientFrom="primary"
        gradientTo="primary/70"
      />
      <StatCard
        title="Active Bookings"
        value={12}
        gradientFrom="secondary"
        gradientTo="secondary/70"
      />
      <StatCard
        title="Pending Requests"
        value={3}
        warning={true}
        gradientFrom="destructive"
        gradientTo="destructive/70"
      />
      <StatCard
        title="Available Spots"
        value="3 / 5"
        gradientFrom="accent"
        gradientTo="accent/70"
      />
    </div>
  );
}
