import { CalendarDays, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DestinationImage } from "@/components/destination-image";
import { formatPrice } from "@/components/destination-card";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { BookingCardActions } from "./BookingCardActions";
import { formatDepartureDate, getBookingId, type IBooking } from "./types";

/** Horizontal booking card: image, status, trip details, price and actions. */
function MyBookingCard({ booking }: { booking: IBooking }) {
  const title = booking.name ?? booking.title ?? "Untitled trip";
  const priceLabel = formatPrice(booking.price);
  const departureLabel = formatDepartureDate(booking.departureDate);
  const bookingId = getBookingId(booking);
  const imageSrc = booking.imageUrl ?? booking.image;

  return (
    <Card className="gap-0 py-0 shadow-sm">
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-5 md:p-5">
        {/* Trip image */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:aspect-[4/3] sm:w-56 md:w-64">
          <DestinationImage src={imageSrc} alt={title} />
        </div>

        {/* Details */}
        <div className="flex min-w-0 flex-1 flex-col">
          <BookingStatusBadge status={booking.status} />

          <h2 className="mt-2 font-heading text-2xl leading-snug font-semibold text-foreground">
            {title}
          </h2>

          <div className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
            {departureLabel ? (
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4" aria-hidden="true" />
                Departure: {departureLabel}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" />
              Booking ID: {bookingId ?? "N/A"}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-3 sm:mt-auto">
            {priceLabel ? (
              <p className="text-3xl leading-none font-bold text-brand">{priceLabel}</p>
            ) : (
              <span aria-hidden="true" />
            )}
            <BookingCardActions booking={booking} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { MyBookingCard };
