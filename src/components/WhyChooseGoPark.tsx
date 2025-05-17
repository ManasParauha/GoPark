// components/WhyChooseGoPark.tsx
"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Coins, Shield } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Time‑Saving",
    desc: "Skip the endless parking hunt and get straight to your destination.",
    icon: Clock,
  },
  {
    title: "Real‑Time Convenience",
    desc: "See available spots instantly and reserve with one tap.",
    icon: CheckCircle,
  },
  {
    title: "Extra Income",
    desc: "Turn your empty driveway into a steady revenue stream.",
    icon: Coins,
  },
  {
    title: "Secure Payments",
    desc: "Verified users & encrypted transactions keep earnings safe.",
    icon: Shield,
  },
];

export default function WhyChooseGoPark() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Why <span className="text-primary">Choose&nbsp;GoPark</span>?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Discover what makes us different.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, desc, icon: Icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader className="flex flex-col items-center gap-4">
                  <Icon className="h-10 w-10" />
                  <h3 className="text-xl font-semibold">{title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
