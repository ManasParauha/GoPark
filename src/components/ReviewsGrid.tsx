"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Great host! Very responsive and the parking spot was perfect.",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "Spot was clean and easy to find. Would book again.",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    rating: 3,
    comment: "Location was okay, but the spot was a bit tight.",
  },
  // Add more dummy reviews if needed
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn("w-4 h-4", i < rating ? "fill-amber-500 text-amber-500" : "text-muted")}
      />
    ))}
  </div>
);

export default function ReviewsGrid() {
  const [replyOpen, setReplyOpen] = useState<{ [key: number]: boolean }>({});

  const toggleReply = (id: number) =>
    setReplyOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 p-4 space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="break-inside-avoid shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base font-medium">{review.name}</CardTitle>
            <StarRating rating={review.rating} />
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>{review.comment}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleReply(review.id)}
            >
              {replyOpen[review.id] ? "Cancel" : "Reply"}
            </Button>
            {replyOpen[review.id] && (
              <div className="mt-2">
                <Textarea placeholder="Write your reply..." rows={3} />
                <Button size="sm" className="mt-2">
                  Send Reply
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
