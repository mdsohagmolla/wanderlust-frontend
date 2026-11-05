import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Destination } from "@/components/destination-card";
import { FeaturedCarousel } from "@/components/featured-carousel";

const FEATURED_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/featured-destination`;

async function getFeaturedDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch(FEATURED_API_URL);
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    const data: unknown = await res.json();
    if (!Array.isArray(data)) throw new Error("Unexpected response shape");
    return data as Destination[];
  } catch (error) {
    console.error("Could not load featured destinations:", error);
    return [];
  }
}

const Featured = async () => {
  const destinations = await getFeaturedDestinations();

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-360 px-4 py-16 md:px-6 md:py-24">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div>
            <h2 className="text-4xl font-medium leading-tight text-foreground md:text-5xl">
              Featured Destinations
            </h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-brand px-5 text-xs font-bold tracking-wider text-brand uppercase transition-colors hover:bg-brand hover:text-brand-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            All Destinations
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        {destinations.length > 0 ? (
          <FeaturedCarousel
            destinations={destinations}
            className="mt-10 md:mt-12"
          />
        ) : (
          <div className="mt-10 rounded-xl border border-dashed bg-card p-10 text-center md:mt-12">
            <p className="font-medium">No featured destinations right now.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Make sure the API is running on localhost:5000, then refresh the page.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Featured;
