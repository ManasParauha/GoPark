'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Page = () => {
  const router = useRouter();
  const [tab, setTab] = useState("host")

  // Host states
  const [hostData, setHostData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    spaceType: '',
    pricePerHour: ''
  })

  // Parker states
  const [parkerData, setParkerData] = useState({
    name: '',
    email: '',
    password: '',
    vehicleType: ''
  })

  const handleHostRegister = async () => {
    try {
      const response = await axios.post('/api/user/registration', {
        ...hostData,
        role: 'host'
      })
      toast.success("Host registered successfully!")
      console.log(response.data)
      router.push('/Login');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Registration failed")
    }
  }

  const handleParkerRegister = async () => {
    try {
      const response = await axios.post('/api/user/registration', {
        ...parkerData,
        role: 'parker'
      })
      toast.success("Parker registered successfully!")
      router.push('/Login');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Registration failed")
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex justify-center items-center'>
        <Tabs defaultValue="host" value={tab} onValueChange={setTab}
          className={`md:w-[400px] w-[285px] ${tab === 'host' ? 'mt-40' : 'mt-3'}`}>
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
                <Label>Name</Label>
                <Input value={hostData.name} onChange={(e) => setHostData({ ...hostData, name: e.target.value })} placeholder="Full name" />

                <Label>Email</Label>
                <Input type="email" value={hostData.email} onChange={(e) => setHostData({ ...hostData, email: e.target.value })} placeholder="email@example.com" />

                <Label>Password</Label>
                <Input type="password" value={hostData.password} onChange={(e) => setHostData({ ...hostData, password: e.target.value })} placeholder="Password" />

                <Label>Parking Address</Label>
                <Input value={hostData.address} onChange={(e) => setHostData({ ...hostData, address: e.target.value })} placeholder="123 MG Road, Delhi" />

                <Label>Space Type</Label>
                <Select onValueChange={(value) => setHostData({ ...hostData, spaceType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="covered">Covered</SelectItem>
                  </SelectContent>
                </Select>

                <Label>Price per Hour (₹)</Label>
                <Input type="number" value={hostData.pricePerHour} onChange={(e) => setHostData({ ...hostData, pricePerHour: e.target.value })} placeholder="e.g. 50" />
              </CardContent>
              <CardFooter>
                <Button onClick={handleHostRegister}>Register as Host</Button>
              </CardFooter>
              <Button onClick={() => router.push('/Login')} variant="link">Already registered? Login here</Button>
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
                <Label>Name</Label>
                <Input value={parkerData.name} onChange={(e) => setParkerData({ ...parkerData, name: e.target.value })} placeholder="Full name" />

                <Label>Email</Label>
                <Input type="email" value={parkerData.email} onChange={(e) => setParkerData({ ...parkerData, email: e.target.value })} placeholder="email@example.com" />

                <Label>Password</Label>
                <Input type="password" value={parkerData.password} onChange={(e) => setParkerData({ ...parkerData, password: e.target.value })} placeholder="Password" />

                <Label>Vehicle Type</Label>
                <Select onValueChange={(value) => setParkerData({ ...parkerData, vehicleType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bike">Bike</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
              <CardFooter>
                <Button onClick={handleParkerRegister}>Register as Parker</Button>
              </CardFooter>
              <Button onClick={() => router.push('/Login')} variant="link">Already registered? Login here</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Page
