import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookingList, BookingListSkeleton } from "@/components/booking/BookingList";
import type { IBooking } from "@/components/booking/types";

const BOOKINGS_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/my-bookings`;

/**
 * Session and bookings both depend on the request, so this component streams
 * in behind <Suspense> instead of blocking the static page shell.
 */
 export async function BookingsSection() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user?.email) {
    return (
      <div className="rounded-xl border border-dashed bg-card p-10 text-center">
        <p className="text-lg font-medium">Sign in to see your bookings</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Your upcoming trips are tied to your account.
        </p>
        <Link href="/login" className="mt-5 inline-block">
          <Button type="button" size="lg" className="bg-brand px-5 font-semibold text-brand-foreground hover:bg-brand/90">
            Sign in
          </Button>
        </Link>
      </div>
    );
  }

  let bookings: IBooking[] = [];
  let loadFailed = false;
  try {
    const res = await fetch(
      `${BOOKINGS_API_URL}/${encodeURIComponent(user.email)}`,
    );
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    const data: unknown = await res.json();
    bookings = Array.isArray(data)
      ? data
      : ((data as { bookings?: IBooking[] })?.bookings ?? []);
  } catch (error) {
    console.error("Could not load bookings:", error);
    loadFailed = true;
  }

  if (loadFailed) {
    return (
      <div className="rounded-xl border border-dashed bg-card p-10 text-center">
        <p className="text-lg font-medium">We could not load your bookings</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Make sure the API is running on localhost:5000, then refresh the page.
        </p>
      </div>
    );
  }

  return <BookingList bookings={bookings} />;
}

export default function MyBookingsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-360 px-4 py-10 md:px-6 md:py-14">
        {/* Static header: ships in the shell while bookings stream in. */}
        <header className="mb-8 md:mb-10">
          <h1 className="text-4xl leading-tight font-light tracking-tight text-foreground md:text-5xl">
            My Bookings
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage and view your upcoming travel plans
          </p>
        </header>

        <Suspense fallback={<BookingListSkeleton />}>
          <BookingsSection />
        </Suspense>
      </div>
    </main>
  );
}
