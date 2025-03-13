"use client";

import { Button } from "@/components/ui/button";
import { useImagesStore } from "@/providers/images-store-provider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTimer } from "react-timer-hook";
import Webcam from "react-webcam";

const TIMER = 4000;

export const WebcamCapture = () => {
  const { images, addImage, resetImages } = useImagesStore((store) => store);
  const time = new Date(new Date().getTime() + TIMER);
  const [started, setStarted] = useState(false);
  const { totalSeconds, start, restart, isRunning } = useTimer({
    interval: 1000,
    onExpire: () => {
      const imageSrc = webcamRef.current!.getScreenshot()!;
      addImage(imageSrc);
    },
    expiryTimestamp: time,
    autoStart: false,
  });

  const webcamRef = useRef<Webcam | null>(null);

  const handleStart = () => {
    if (!started) {
      start();
      setStarted(true);
    } else {
      restart(new Date(new Date().getTime() + TIMER));
    }
  };

  const handleRetake = () => {
    resetImages();
    setStarted(false);
  };

  useEffect(() => {
    if (started && images.length < 3) {
      restart(new Date(new Date().getTime() + TIMER));
    }
  }, [images.length, restart, started]);

  return (
    <div className="space-y-5">
      {!started && images.length < 3 && (
        <Button
          className="bg-vintage-gold w-full px-8 py-6 text-xl font-bold uppercase"
          onClick={handleStart}
        >
          Take a Photo
        </Button>
      )}
      {images.length === 3 && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            asChild
            className="bg-vintage-gold text-xl font-bold uppercase"
          >
            <Link href="/edit">Edit Photos</Link>
          </Button>
          <Button
            onClick={handleRetake}
            variant="destructive"
            className="text-xl font-bold uppercase"
          >
            Retake
          </Button>
        </div>
      )}
      <div className="relative overflow-hidden rounded-xl">
        <Webcam
          ref={webcamRef}
          mirrored={true}
          audio={false}
          screenshotFormat="image/jpeg"
          className="relative"
          width={500}
        />
        {isRunning && (
          <div className="absolute inset-0 z-50 grid place-content-center bg-black/35 text-center text-3xl text-white">
            {totalSeconds === 4 && images.length === 0
              ? "Ready!?"
              : images.length === 0 && totalSeconds}
            {totalSeconds === 4 && images.length === 1
              ? "Here's another one!"
              : images.length === 1 && totalSeconds}
            {totalSeconds === 4 && images.length === 2
              ? "Get ready for the last photo!"
              : images.length === 2 && totalSeconds}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-5">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-20 w-20 overflow-hidden rounded-xl border border-black shadow-[3px_3px_0px_0px_#1a202c]"
          >
            <Image src={image} layout="fill" objectFit="cover" alt="" />
          </div>
        ))}
        {Array.from({ length: 3 - images.length }).map((_, index) => (
          <div
            key={index + images.length}
            className="relative h-20 w-20 rounded-xl border border-black bg-gray-200 shadow-[3px_3px_0px_0px_#1a202c]"
          />
        ))}
      </div>
    </div>
  );
};
