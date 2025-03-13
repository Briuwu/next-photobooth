import { useFiltersStore } from "@/providers/filters-store-provider";
import { Check } from "lucide-react";

import { colors, filters } from "@/lib/constant";
import { cn } from "@/lib/utils";

export const Filters = () => {
  const {
    photostrip,
    setPhotostrip,
    background,
    setBackground,
    filter,
    setFilter,
  } = useFiltersStore((store) => store);
  return (
    <div className="order-1 max-w-[350px] divide-y-2">
      <div className="py-5">
        <p>Photostrip</p>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              className={`flex aspect-square w-8 items-center justify-center rounded-full border md:w-12 ${
                photostrip === color
                  ? `border-2 border-[#72b86d] ${color}`
                  : `${color} ${color}`
              }`}
              onClick={() => setPhotostrip(color)}
            >
              {photostrip === color && (
                <Check className="h-5 w-5 text-[#72b86d]" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="py-5">
        <p>Background</p>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              className={`flex aspect-square w-8 items-center justify-center rounded-full border md:w-12 ${
                background === color
                  ? `border-2 border-[#72b86d] ${color}`
                  : `${color} ${color}`
              }`}
              onClick={() => setBackground(color)}
            >
              {background === color && (
                <Check className="h-5 w-5 text-[#72b86d]" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="py-5">
        <p>Filters</p>
        <div className="flex flex-wrap gap-3">
          {filters.map((filt) => (
            <button
              key={filt}
              onClick={() => setFilter(filt)}
              className={cn(
                "rounded-full bg-black px-2 text-white",
                filter === filt && "bg-white text-black",
              )}
            >
              {filt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
