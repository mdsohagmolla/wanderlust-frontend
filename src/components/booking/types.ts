/** Fields returned by GET /my-bookings/:email; the API leaves many optional. */
export interface IBooking {
  _id?: string;
  /** Fallback id field in case the API does not use Mongo's _id. */
  id?: string;
  /** Destination name the booking was made for. */
  name?: string;
  title?: string;
  price?: string | number;
  imageUrl?: string;
  image?: string;
  departureDate?: string;
  bookingDate?: string;
  /** Raw status from the API, e.g. "Confirmed" or "pending". */
  status?: string;
  /** Set when the API sends the destination reference separately from _id. */
  destinationId?: string;
}

export type BookingStatus = "confirmed" | "pending" | "cancelled";

/**
 * The API does not set a status column yet, so a missing or unknown value
 * reads as "confirmed" until the backend grows one.
 */
export function normalizeBookingStatus(status?: string): BookingStatus {
  switch (status?.trim().toLowerCase()) {
    case "pending":
      return "pending";
    case "cancelled":
    case "canceled":
      return "cancelled";
    default:
      return "confirmed";
  }
}

/** Booking documents may carry _id (Mongo) or a plain id. */
export function getBookingId(booking: IBooking): string | null {
  return booking._id ?? booking.id ?? null;
}

/** "2026-05-15" -> "May 15, 2026"; anything unparseable passes through. */
export function formatDepartureDate(date?: string): string | null {
  if (!date) return null;

  // Date-only ISO strings are parsed as UTC, which can shift the day in
  // negative offsets, so rebuild them as local dates instead.
  const isoDate = /^(\d{4})-(\d{2})-(\d{2})/.exec(date);
  if (isoDate) {
    const [, year, month, day] = isoDate;
    return new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString(
      "en-US",
      { month: "long", day: "numeric", year: "numeric" },
    );
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
