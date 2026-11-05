"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "cn";
import { DestinationCard, type Destination } from "@/components/destination-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

function FeaturedCarousel({
  destinations,
  className,
}: {
  destinations: Destination[];
  className?: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [total, setTotal] = useState(destinations.length);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
    setTotal(api.scrollSnapList().length);
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
      api?.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const progress = total > 0 ? ((selected + 1) / total) * 100 : 0;

  return (
    <Carousel
      setApi={setApi}
      // loop keeps every destination its own snap; when the slides are too
      // narrow to fill the viewport embla drops it, and keepSnaps stops the
      // trimmed tail snaps from shrinking the counter below "1/N".
      opts={{ align: "start", loop: true, containScroll: "keepSnaps" }}
      className={cn("w-full", className)}
    >
      <CarouselContent className="-ml-6">
        {destinations.map((destination, index) => (
          <CarouselItem
            key={destination._id}
            // ~2.1 cards per view so the next card peeks, as in the design.
            className="basis-full pl-6 sm:basis-[46%]"
          >
            <DestinationCard destination={destination} priority={index === 0} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex items-center gap-4 md:mt-10">
        <span
          className="shrink-0 text-sm font-medium text-foreground tabular-nums"
          aria-live="polite"
        >
          {selected + 1}/{total}
        </span>

        <div
          className="h-px flex-1 overflow-hidden rounded-full bg-border"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous destinations"
            className="grid size-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next destinations"
            className="grid size-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Carousel>
  );
}

export { FeaturedCarousel };
