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
import { Camera, Download, Eye } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Editor = () => {
  const { photostrip, background, filter, dateEnabled } = useFiltersStore(
    (store) => store,
  );
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
      <div className={cn("order-2 -rotate-2 md:order-1")}>
        <div
          ref={elementRef}
          className="mx-auto max-w-[290px] p-6"
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
              <div key={index} className="relative h-[180px] w-[200px]">
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
        </div>
      </div>
      <Filters />
      <div className="order-3 flex flex-col gap-3 self-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-vintage-gold px-8 py-6 text-xl font-bold">
              <Eye /> Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="border-none bg-transparent shadow-none">
            <DialogHeader className="sr-only">
              <DialogTitle>Preview</DialogTitle>
              <DialogDescription>
                Click on the photostrip to close the preview.
              </DialogDescription>
            </DialogHeader>
            <div
              ref={elementRef}
              className="mx-auto max-w-[290px] p-6"
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
                  <div key={index} className="relative aspect-square w-[200px]">
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
            </div>
          </DialogContent>
        </Dialog>

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
