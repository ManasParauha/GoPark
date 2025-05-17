'use client'
import Image from "next/image";
import parkingHeroImage from '@/../public/CarParked1.jpg'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen w-screen ">
      <main className=" w-screen h-[50vh] sm:h-[60vh] md:h-[70vh] relative overflow-hidden flex items-center justify-center flex-col  ">
        <Image src={parkingHeroImage} alt='parkingHero' fill priority className="object-cover opacity-60" />
        <h1 className="text-3xl  sm:text-5xl md:text-6xl text-foreground z-10  font-bold">Park Smater.Earn Easier</h1>
        <span className="text-foreground z-10 text-xs sm:text-sm font-semibold">GoPark connects residents who have unused parking spots <br className="block md:hidden"></br> with drivers looking for hassle-free parking.</span>
        <Button className="z-10 mt-10" onClick={() => router.push('/Login')} >Get Started</Button>
      </main>
    </div>
  );
}
