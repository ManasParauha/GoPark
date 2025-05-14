'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const page = () => {
  const [tab, setTab] = useState("host");
  return (
    <div className='flex justify-center items-center  h-screen '>
      <div className='flex justify-center items-center '>
        <Tabs
          defaultValue="host"
          value={tab}
          onValueChange={setTab}
          className={`md:w-[400px] w-[285px] ${tab === 'host' ? 'mt-10' : ''}`}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="host">Host</TabsTrigger>
            <TabsTrigger value="parker">Parker</TabsTrigger>
          </TabsList>

          {/* Host Tab */}
          <TabsContent value="host">
            <Card>
              <CardHeader>
                <CardTitle>Become a Host</CardTitle>
                <CardDescription>
                  Have an empty parking spot? List it here and earn by helping others park.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="host-name">Full Name</Label>
                  <Input id="host-name" placeholder="Your full name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="host-email">Email</Label>
                  <Input id="host-email" placeholder="your@email.com" type="email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="host-password">Password</Label>
                  <Input id="host-password" placeholder="Password" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="host-address">Parking Address</Label>
                  <Input id="host-address" placeholder="123 MG Road, Delhi" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="host-type">Parking Space Type</Label>
                  <Select>
                    <SelectTrigger id="host-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="covered">Covered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="host-price">Price per Hour (₹)</Label>
                  <Input id="host-price" placeholder="e.g. 50" type="number" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Register as Host</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Parker Tab */}
          <TabsContent value="parker">
            <Card>
              <CardHeader>
                <CardTitle>Find a Parking Spot</CardTitle>
                <CardDescription>
                  Looking for a place to park? Register here and book nearby spots easily.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="parker-name">Full Name</Label>
                  <Input id="parker-name" placeholder="Your full name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="parker-email">Email</Label>
                  <Input id="parker-email" placeholder="your@email.com" type="email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="parker-password">Password</Label>
                  <Input id="parker-password" placeholder="Password" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="parker-vehicle">Vehicle Type</Label>
                  <Select>
                    <SelectTrigger id="parker-vehicle">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bike">Bike</SelectItem>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Register as Parker</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default page
