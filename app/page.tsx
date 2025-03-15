import hero from "@/public/hero.png";

import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="space-y-5 place-self-center">
      <h1 className="font-believe-heart text-center text-3xl md:text-5xl">
        BubblyBooth
      </h1>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="self-center">
          <div className="flex flex-col gap-5">
            <Button
              asChild
              className="bg-vintage-gold px-8 py-6 text-xl font-bold uppercase"
            >
              <Link href="/camera">
                <Camera />
                Use Camera
              </Link>
            </Button>
            <Button
              asChild
              className="bg-vintage-green px-8 py-6 text-xl font-bold uppercase"
            >
              <Link href="/upload">
                <Upload /> Upload Photos
              </Link>
            </Button>
          </div>
        </div>
        <div className="mx-auto w-[250px] md:w-[350px]">
          <Image src={hero} alt="" />
        </div>
      </div>
    </main>
  );
}
