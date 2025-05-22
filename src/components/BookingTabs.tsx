"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, List as ListIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type Booking = {
  id: number;
  name: string;
  spot: string;
  start: Date;
  end: Date;
  startFormatted?: string;
  endFormatted?: string;
};

export default function BookingTabs() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const now = new Date();
    const future = new Date(now.getTime() + 2 * 60 * 60 * 1000); // +2 hours
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    const sampleBookings: Booking[] = [
      {
        id: 1,
        name: "John Doe",
        spot: "A1",
        start: now,
        end: future,
      },
      {
        id: 2,
        name: "Jane Smith",
        spot: "B2",
        start: new Date(tomorrow),
        end: new Date(tomorrow),
      },
    ];

    // Format times safely on the client
    const formatted = sampleBookings.map((b) => ({
      ...b,
      startFormatted: format(b.start, "p"), // e.g., 3:30 PM
      endFormatted: format(b.end, "p"),
    }));

    setBookings(formatted);
  }, []);

  return (
    <Tabs defaultValue="list" className="w-full p-4">
      <TabsList className="mb-4">
        <TabsTrigger value="list" className="flex items-center gap-2">
          <ListIcon className="w-4 h-4" /> List
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" /> Calendar
        </TabsTrigger>
      </TabsList>

      <TabsContent value="list">
        <div className="relative border-l-2 border-muted pl-6 space-y-6">
          {bookings.map((b) => (
            <div key={b.id} className="relative">
              <span className="absolute -left-[10px] top-1 w-4 h-4 bg-primary rounded-full"></span>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${b.name}`} />
                  <AvatarFallback>{b.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{b.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Spot {b.spot} — {b.startFormatted} to {b.endFormatted}
                  </p>
                </div>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="ml-auto"
                      onClick={() => setSelectedBooking(b)}
                    >
                      View
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="p-4 w-[400px]">
                    <h2 className="text-lg font-semibold mb-2">{b.name}'s Booking</h2>
                    <p>Spot: {b.spot}</p>
                    <p>Start: {format(b.start, "PPpp")}</p>
                    <p>End: {format(b.end, "PPpp")}</p>
                    <Button variant="destructive" className="mt-4">
                      End Early
                    </Button>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="calendar">
        <div className="h-[500px]">
          <Calendar
            localizer={localizer}
            events={bookings.map((b) => ({
              ...b,
              title: `${b.name} - Spot ${b.spot}`,
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            eventPropGetter={() => ({
              style: {
                backgroundColor: "#1E40AF",
                color: "white",
                borderRadius: "8px",
                padding: "4px",
              },
            })}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
