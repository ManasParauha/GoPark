"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const earningsData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  revenue: Math.floor(200 + Math.random() * 500),
}));

const balance = 470; // Change this value to test CTA state

export default function EarningsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle>Last 30 Days Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <XAxis dataKey="day" hide />
                <YAxis hide />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1E40AF"
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="shadow-md rounded-2xl flex flex-col justify-between h-full">
          <CardHeader>
            <CardTitle>Your Balance</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-4xl font-bold text-primary">₹{balance}</div>
            <Button disabled={balance < 500}>
              Request Payout
            </Button>
            {balance < 500 && (
              <p className="text-sm text-muted-foreground">
                Minimum ₹500 required to request a payout.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
