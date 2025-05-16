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
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState("host");

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/user/login', credentials);

      const role = response.data.role;

      if (role === 'host') {
        toast.success("Host login successful!");
        router.push('/Host');
      } else if (role === 'parker') {
        toast.success("Parker login successful!");
        router.push('/Parker');
      } else {
        toast.error("Unknown user role!");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex justify-center items-center'>
        <Tabs
          defaultValue="host"
          value={tab}
          onValueChange={setTab}
          className="md:w-[400px] w-[285px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="host">Host</TabsTrigger>
            <TabsTrigger value="parker">Parker</TabsTrigger>
          </TabsList>

          {/* Host Login Tab */}
          <TabsContent value="host">
            <Card>
              <CardHeader>
                <CardTitle>Host Login</CardTitle>
                <CardDescription>Login to manage your parking spot.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="email@example.com"
                />
                <Label>Password</Label>
                <Input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Password"
                />
              </CardContent>
              <CardFooter>
                <Button onClick={handleLogin}>Login as Host</Button>
              </CardFooter>
              <Button onClick={() => router.push('/Registration')} variant="link">Don't have an account? Register here</Button>
            </Card>
          </TabsContent>``

          {/* Parker Login Tab */}
          <TabsContent value="parker">
            <Card>
              <CardHeader>
                <CardTitle>Parker Login</CardTitle>
                <CardDescription>Login to find and book parking spots.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="email@example.com"
                />
                <Label>Password</Label>
                <Input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Password"
                />
              </CardContent>
              <CardFooter>
                <Button onClick={handleLogin}>Login as Parker</Button>
              </CardFooter>
              <Button onClick={() => router.push('/Registration')} variant="link">Don't have an account? Register here</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
