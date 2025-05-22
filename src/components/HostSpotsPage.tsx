"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Drawer,
    DrawerContent,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

interface Spot {
    id: number;
    address: string;
    type: "Open" | "Covered";
    rate: number;
    status: boolean;
}

const dummySpots: Spot[] = [
    { id: 1, address: "123 Main St, Indore", type: "Open", rate: 20, status: true },
    { id: 2, address: "456 Oak Ave, Indore", type: "Covered", rate: 35, status: false },
    { id: 3, address: "789 Pine Rd, Indore", type: "Open", rate: 25, status: true },
    { id: 4, address: "321 Maple Dr, Indore", type: "Covered", rate: 30, status: true },
];

const steps = ["Details", "Photos", "Pricing"];

export default function HostSpotsPage() {
    const [spots, setSpots] = useState(dummySpots);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [step, setStep] = useState(0);

    const toggleStatus = (id: number) => {
        setSpots((spots) =>
            spots.map((spot) =>
                spot.id === id ? { ...spot, status: !spot.status } : spot
            )
        );
    };

    const deleteSpot = (id: number) => {
        setSpots((spots) => spots.filter((spot) => spot.id !== id));
    };

    const nextStep = () => {
        if (step < steps.length - 1) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>My Parking Spots</CardTitle>
                    <Button
                        onClick={() => {
                            setDrawerOpen(true);
                            setStep(0);
                        }}
                    >
                        Add Spot
                    </Button>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Address</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Rate (₹/hr)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {spots.map((spot, idx) => (
                                <TableRow
                                    key={spot.id}
                                    className={cn(
                                        idx % 2 === 0 ? "bg-muted/50" : "",
                                        "hover:bg-muted cursor-pointer"
                                    )}
                                >
                                    <TableCell>{spot.address}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={spot.type === "Open" ? "secondary" : "default"}
                                            className="capitalize"
                                        >
                                            {spot.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>₹{spot.rate}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={spot.status}
                                            onCheckedChange={() => toggleStatus(spot.id)}
                                            aria-label="Toggle spot status"
                                        />
                                    </TableCell>
                                    <TableCell className="flex gap-3">
                                        <Button variant="ghost" size="sm" aria-label="Edit spot">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            aria-label="Delete spot"
                                            onClick={() => deleteSpot(spot.id)}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <div className="flex gap-2">
                        <Button disabled>Prev</Button>
                        <Button>1</Button>
                        <Button>2</Button>
                        <Button>Next</Button>
                    </div>
                </CardFooter>
            </Card>

            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent className="w-96 fixed right-0 top-0 h-full flex flex-col">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Add Parking Spot</h2>
                        <Button variant="ghost" onClick={() => setDrawerOpen(false)}>
                            Close
                        </Button>
                    </div>

                    {/* Custom Step Indicator */}
                    <div className="flex justify-around p-4 border-b">
                        {steps.map((label, i) => (
                            <div
                                key={label}
                                className={cn(
                                    "text-sm font-medium",
                                    i === step ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {label}
                            </div>
                        ))}
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto">
                        {step === 0 && (
                            <form className="space-y-4">
                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" placeholder="Enter spot address" />
                                </div>
                                <div>
                                    <Label htmlFor="type">Type</Label>
                                    <Select defaultValue="Open">
                                        <SelectTrigger id="type">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Open">Open</SelectItem>
                                            <SelectItem value="Covered">Covered</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </form>
                        )}

                        {step === 1 && (
                            <div>
                                <Label>Upload Photos (not implemented)</Label>
                                <div className="border border-dashed border-muted rounded p-8 text-center text-muted-foreground">
                                    Photo upload UI goes here
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <form className="space-y-4">
                                <div>
                                    <Label htmlFor="rate">Rate (₹/hr)</Label>
                                    <Input id="rate" type="number" placeholder="Enter hourly rate" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="status">Active</Label>
                                    <Switch id="status" defaultChecked />
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="p-4 border-t flex justify-between">
                        <Button variant="ghost" disabled={step === 0} onClick={prevStep}>
                            Back
                        </Button>
                        {step < steps.length - 1 ? (
                            <Button onClick={nextStep}>Next</Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    // TODO: Save spot logic here
                                    setDrawerOpen(false);
                                }}
                            >
                                Save
                            </Button>
                        )}
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}
