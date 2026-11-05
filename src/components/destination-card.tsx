import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { DestinationImage } from "@/components/destination-image";
import Link from "next/link";

export type Destination = {
  _id: string;
  name: string;
  country?: string;
  category?: string;
  price?: string | number;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  rating?: string | number;
  /** Not exposed by the API yet; the detail page renders it once it is. */
  reviews?: number;
  /** Not exposed by the API yet; the detail page renders it once it is. */
  highlights?: string[];
};

/** The API has no rating column yet, so the card badge falls back to this. */
export const FALLBACK_RATING = 4.5;

/** "4 days" -> "4 Days/3 Nights", passing anything else through untouched. */
export function formatDuration(duration?: string) {
  const days = Number.parseInt(String(duration ?? ""), 10);
  if (Number.isNaN(days)) return duration;
  return `${days} Days/${Math.max(days - 1, 0)} Nights`;
}

/** "4000" -> "$4000", "$4000" -> "$4000". */
export function formatPrice(price?: string | number) {
  if (price === undefined || price === null) return null;
  const value = String(price).trim();
  if (!value) return null;
  return value.startsWith("$") ? value : `$${value}`;
}

function DestinationCard({
  destination,
  priority = false,
}: {
  destination: Destination;
  priority?: boolean;
}) {
  const { name, country, duration, imageUrl } = destination;
  const rating = destination.rating ?? FALLBACK_RATING;
  const priceLabel = formatPrice(destination.price);
  const durationLabel = formatDuration(duration);

  return (
    <Card className="gap-0 py-0 shadow-none ring-0">
      <div className="relative aspect-7/5 w-full overflow-hidden rounded-lg bg-muted">
        <DestinationImage src={imageUrl} alt={name} priority={priority} />

        <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-md bg-background px-2 py-1 text-xs font-semibold shadow-sm">
          {rating}
          <Star className="size-3 fill-foreground text-foreground" aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-col gap-1.5 pt-3.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium">
          <MapPin className="size-3.5 text-muted-foreground" aria-hidden="true" />
          {country ?? "Unknown location"}
        </span>

        <div className="flex items-baseline justify-between gap-3">
          <CardTitle className="text-base font-semibold">{name}</CardTitle>
          {priceLabel ? (
            <p className="shrink-0 leading-none">
              <span className="text-base font-bold">{priceLabel}</span>
              <span className="text-[10px] font-normal text-muted-foreground">/Person</span>
            </p>
          ) : null}
        </div>

        {durationLabel ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            {durationLabel}
          </span>
        ) : null}

        <Link href={`/destinations/${destination._id}`}>
        <Button
          type="button"
          variant="link"
          size="xs"
          className="mt-1 self-start px-0 text-xs font-bold tracking-wide text-brand uppercase hover:no-underline"
        >
          Book now
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Button>
        </Link>
      </div>
    </Card>
  );
}

export { DestinationCard };
