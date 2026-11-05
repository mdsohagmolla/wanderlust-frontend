import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MyBookingCard } from "./MyBookingCard";
import { getBookingId, type IBooking } from "./types";

/** Vertical list of booking cards with an empty state. */
function BookingList({ bookings }: { bookings: IBooking[] }) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-card p-10 text-center">
        <p className="text-lg font-medium">You have no bookings yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Book a trip and it will show up here so you can manage it anytime.
        </p>
        <Link href="/destinations" className="mt-5 inline-block">
          <Button type="button" size="lg" className="bg-brand px-5 font-semibold text-brand-foreground hover:bg-brand/90">
            Explore destinations
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-5">
      {bookings.map((booking, index) => (
        <li key={getBookingId(booking) ?? `booking-${index}`}>
          <MyBookingCard booking={booking} />
        </li>
      ))}
    </ul>
  );
}

/** Shown while the session + bookings fetch streams in. */
function BookingListSkeleton() {
  return (
    <ul className="flex flex-col gap-5" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <li
          key={index}
          className="h-56 animate-pulse rounded-xl bg-muted"
        />
      ))}
    </ul>
  );
}

export { BookingList, BookingListSkeleton };
