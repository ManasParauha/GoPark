// components/HowItWorks.tsx
"use client";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Car,
  MapPin,
  CreditCard,
  ParkingCircle,
  Send,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";

const parkerSteps = [
  {
    icon: MapPin,
    title: "Search nearby spaces",
    desc: "Find open driveways or garages around your destination.",
  },
  {
    icon: ParkingCircle,
    title: "Reserve & park",
    desc: "Lock in your spot and pull in stress‑free.",
  },
  {
    icon: CreditCard,
    title: "Pay securely",
    desc: "One‑tap checkout with encrypted payments.",
  },
];

const hostSteps = [
  {
    icon: Car,
    title: "List your spot",
    desc: "Add an unused driveway, garage, or parking bay in minutes.",
  },
  {
    icon: Send,
    title: "Accept bookings",
    desc: "Approve requests and keep track in your dashboard.",
  },
  {
    icon: Wallet,
    title: "Earn income",
    desc: "Payouts land automatically—no chasing invoices.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-muted py-16">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          How&nbsp;<span className="text-primary">It Works</span>
        </h2>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-12 px-4 md:grid-cols-2">
        {/* Parkers */}
        <StepsColumn
          header="For Parkers"
          steps={parkerSteps}
          offset={0}
        />

        {/* Hosts */}
        <StepsColumn
          header="For Hosts"
          steps={hostSteps}
          offset={0.15}
        />
      </div>
    </section>
  );
}

function StepsColumn({
  header,
  steps,
  offset = 0,
}: {
  header: string;
  steps: {
    icon: React.ElementType;
    title: string;
    desc: string;
  }[];
  offset?: number;
}) {
  return (
    <div>
      <h3 className="mb-6 text-center text-2xl font-semibold md:text-left">
        {header}
      </h3>

      <div className="space-y-6">
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: offset + i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Icon className="h-8 w-8 text-primary" />
                <h4 className="text-lg font-medium">{title}</h4>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
