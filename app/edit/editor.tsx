"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFiltersStore } from "@/providers/filters-store-provider";
import { useImagesStore } from "@/providers/images-store-provider";
import Image from "next/image";
import Link from "next/link";
import { Filters } from "./filters";

export const Editor = () => {
  const { photostrip, background, filter, dateEnabled } = useFiltersStore(
    (store) => store,
  );
  const { images } = useImagesStore((store) => store);

  if (images.length === 0) {
    return (
      <div className="space-y-3 rounded-xl border border-black p-5">
        <p className="md:text-2xl">Take a picture first!</p>
        <Button asChild className="w-full md:text-xl">
          <Link href="/camera">Camera</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <div
        className={cn(
          "order-2 mx-auto max-w-[290px] -rotate-2 p-6 shadow md:order-1",
          background,
        )}
      >
        <div className={cn("grid gap-5 rounded p-3", photostrip)}>
          {images.map((image, index) => (
            <div key={index}>
              <Image
                src={image}
                width={225}
                height={225}
                alt=""
                className={cn("mx-auto rounded", filter)}
              />
            </div>
          ))}
          {dateEnabled && (
            <p className={cn("font-believe-heart bg-white text-center")}>
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>
      <Filters />
      <div className="order-3 flex flex-col gap-3 self-center">
        <Button className="bg-vintage-gold px-8 py-6 text-xl font-bold uppercase">
          Preview
        </Button>
        <Button className="bg-vintage-blue px-8 py-6 text-xl font-bold uppercase">
          Print Photostrip
        </Button>
        <Button
          variant="destructive"
          className="px-8 py-6 text-xl font-bold uppercase"
        >
          <Link href="/camera">Retake Photo</Link>
        </Button>
      </div>
    </div>
  );
};
