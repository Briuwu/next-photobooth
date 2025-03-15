import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import Image from "next/image";

type Props = {
  background: string;
  photostrip: string;
  getInsetShadow: (backgroundColor: string) => string;
  filter: string;
  images: string[];
  dateEnabled: boolean;
};

export const Preview = ({
  background,
  filter,
  getInsetShadow,
  images,
  photostrip,
  dateEnabled,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-vintage-gold px-8 py-6 text-xl font-bold">
          <Eye /> Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[90svh] border-none bg-transparent shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Preview</DialogTitle>
          <DialogDescription>
            Click on the photostrip to close the preview.
          </DialogDescription>
        </DialogHeader>
        <div className="mx-auto p-6" style={{ backgroundColor: background }}>
          <div
            className="grid gap-4 rounded p-4"
            style={{
              backgroundColor: photostrip,
              boxShadow: getInsetShadow(background),
            }}
          >
            {images.slice(0, 3).map((image, index) => (
              <div key={index} className="relative h-[180px] w-[240px]">
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
  );
};
