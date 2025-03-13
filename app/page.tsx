import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-5 place-self-center">
      <h1 className="font-believe-heart text-center text-3xl">
        RetroPhotobooth
      </h1>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="self-center">
          <div className="flex flex-col gap-5">
            <Button
              asChild
              className="bg-vintage-gold px-8 py-6 text-xl font-bold uppercase"
            >
              <Link href="/camera">Use Camera</Link>
            </Button>
            <Button className="bg-vintage-gold px-8 py-6 text-xl font-bold uppercase">
              Upload Photos
            </Button>
          </div>
        </div>
        <div className="mx-auto w-[250px] md:w-[350px]">
          <AspectRatio ratio={1 / 1}>
            <div className="h-full w-full bg-neutral-200"></div>
          </AspectRatio>
        </div>
      </div>
    </main>
  );
}
