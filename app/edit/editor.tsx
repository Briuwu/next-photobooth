"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFiltersStore } from "@/providers/filters-store-provider";
import { useImagesStore } from "@/providers/images-store-provider";
import Image from "next/image";
import Link from "next/link";
import { Filters } from "./filters";
import domtoimage from "dom-to-image";
import { Camera, Download } from "lucide-react";
import { Preview } from "./preview";
import { AxolotlStickers } from "./axolotl-stickers";
import { CatStickers } from "./cat-stickers";
import { PandaStickers } from "./panda-stickers";

export const Editor = () => {
  const { photostrip, background, filter, dateEnabled, stickers } =
    useFiltersStore((store) => store);
  const { images } = useImagesStore((store) => store);
  const elementRef = useRef<HTMLDivElement>(null);

  const downloadImage = () => {
    if (!elementRef.current) return;

    const scale = 2; // Double the size

    // Create options object
    const options = {
      height: elementRef.current.offsetHeight * scale,
      width: elementRef.current.offsetWidth * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: `${elementRef.current.offsetWidth}px`,
        height: `${elementRef.current.offsetHeight}px`,
      },
    };

    domtoimage
      .toPng(elementRef.current, options)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "bubblybooth-photostrip.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  const getInsetShadow = (backgroundColor: string) => {
    return `inset 0px 0px 15px 0px ${backgroundColor}`;
  };

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
      <div className={cn("order-2 md:order-1 md:-rotate-2")}>
        <div
          ref={elementRef}
          className="relative mx-auto p-6"
          style={{ backgroundColor: background }}
        >
          <div
            className="grid gap-4 rounded p-4"
            style={{
              backgroundColor: photostrip,
              boxShadow: getInsetShadow(background),
            }}
          >
            {images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className="relative h-[180px] w-full md:w-[240px]"
              >
                <Image
                  src={image}
                  fill
                  alt=""
                  className={cn(
                    "absolute mx-auto h-full w-full rounded object-cover",
                    filter,
                  )}
                />
              </div>
            ))}
            {dateEnabled && (
              <p className="font-believe-heart bg-white text-center">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
          {stickers === "axolotl" && <AxolotlStickers />}
          {stickers === "cat" && <CatStickers />}
          {stickers === "panda" && <PandaStickers />}
        </div>
      </div>
      <Filters />
      <div className="order-3 flex flex-col gap-3 self-center">
        <Preview
          background={background}
          filter={filter}
          getInsetShadow={getInsetShadow}
          images={images}
          photostrip={photostrip}
          dateEnabled={dateEnabled}
        />

        <Button
          onClick={downloadImage}
          className="bg-vintage-blue px-8 py-6 text-xl font-bold"
        >
          <Download /> Download Photostrip
        </Button>
        <Button
          asChild
          variant="destructive"
          className="px-8 py-6 text-xl font-bold"
        >
          <Link href="/camera">
            <Camera /> Retake Photo
          </Link>
        </Button>
      </div>
    </div>
  );
};
