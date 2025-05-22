"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Car, User } from "lucide-react";

interface BookingRequest {
  id: string;
  name: string;
  avatarUrl?: string;
  vehicleType: "car" | "bike" | "truck";
  timeRange: string;
  price: string;
}

const initialRequests: BookingRequest[] = [
  {
    id: "1",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/40?img=1",
    vehicleType: "car",
    timeRange: "10:00 AM - 12:00 PM",
    price: "₹250",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatarUrl: "https://i.pravatar.cc/40?img=2",
    vehicleType: "bike",
    timeRange: "01:00 PM - 03:00 PM",
    price: "₹150",
  },
  {
    id: "3",
    name: "Alice Johnson",
    avatarUrl: "https://i.pravatar.cc/40?img=3",
    vehicleType: "truck",
    timeRange: "04:00 PM - 06:00 PM",
    price: "₹400",
  },
];

export default function BookingRequestsQueue() {
  const [requests, setRequests] = useState(initialRequests);
  const [accepting, setAccepting] = useState<string | null>(null);

  // Handler for Accept button
  const handleAccept = (id: string) => {
    setAccepting(id);
    // Animate and remove after 400ms
    setTimeout(() => {
      setRequests((prev) => prev.filter((r) => r.id !== id));
      setAccepting(null);
      // TODO: Add "move to upcoming bookings" logic here
    }, 400);
  };

  // Handler for Decline button
  const handleDecline = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "car":
        return <Car className="h-5 w-5 text-muted-foreground" />;
      case "bike":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ); // Replace with better bike icon if available
      case "truck":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect width="16" height="10" x="4" y="7" rx="2" ry="2" />
            <path d="M10 17v2M14 17v2" />
          </svg>
        ); // Replace with better truck icon if available
      default:
        return <Car className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Booking Requests</h2>
      {requests.length === 0 && (
        <p className="text-muted-foreground text-center">No booking requests.</p>
      )}
      <Accordion type="single" collapsible>
        {requests.map(({ id, name, avatarUrl, vehicleType, timeRange, price }) => (
          <AccordionItem
            key={id}
            value={id}
            className={cn(
              "mb-2 rounded-lg border border-border shadow-sm",
              accepting === id && "opacity-50 pointer-events-none transition-opacity duration-300"
            )}
          >
            <AccordionTrigger className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={name} />
                  ) : (
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-medium">{name}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    {getVehicleIcon(vehicleType)}
                    <span>{timeRange}</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg font-semibold">
                {price}
              </Badge>
            </AccordionTrigger>
            <AccordionContent className="flex justify-end gap-3 px-4 pb-4 pt-0">
              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                onClick={() => handleDecline(id)}
                disabled={accepting === id}
              >
                Decline
              </Button>
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleAccept(id)}
                disabled={accepting === id}
              >
                {accepting === id ? "Accepting..." : "Accept"}
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
