import Link from "next/link";
import {
  ArrowLeft,
 
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";



import { DestinationImage } from "@/components/destination-image";
import {
  FALLBACK_RATING,
  formatDuration,
  
  type Destination,
} from "@/components/destination-card";
import EditDestinatonDialog from "@/components/editDestinatonDialog";
import DeleteDestinationDialog from "@/components/DeleteDestinationDialog";
import BookingCard from "@/components/booking/BookingCard";


import { getTokenFromServer } from "@/lib/getTokenFromServer";

const DESTINATION_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/destination`;

/** The API has no highlights column yet; these keep the design intact until it does. */
const FALLBACK_HIGHLIGHTS = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
];



async function getDestination(id: string): Promise<Destination | null> {

  // access the token ;
  const token = await getTokenFromServer();
  
  

  
  try {
    const res = await fetch(`${DESTINATION_API_URL}/${id}`,{
      headers: {
        authorization: `Bearer ${token}`
      }

    });
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    const data: unknown = await res.json();
    if (!data || typeof data !== "object") throw new Error("Unexpected response shape");
    return data as Destination;
  } catch (error) {
    console.error("Could not load destination:", error);
    return null;
  }
}

function BackToDestinations() {
  return (
    <Link
      href="/destinations"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Back to Destinations
    </Link>
  );
}

async function DestinationDetailsPage({ params }: PageProps<"/destinations/[id]">) {
  const { id } = await params;
  const destination = await getDestination(id);

  if (destination === null) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-6 md:px-6 md:py-8">
          <BackToDestinations />
          <div className="mt-10 rounded-xl border border-dashed bg-card p-10 text-center">
            <p className="font-medium">We could not load this destination.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Make sure the API is running on localhost:5000, then refresh the page.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // price level akhane cilo
  const durationLabel = formatDuration(destination.duration);
  const rating = destination.rating ?? FALLBACK_RATING;
  const highlights = destination.highlights?.length
    ? destination.highlights
    : FALLBACK_HIGHLIGHTS;

  /** The API type has optional fields; the dialogs require fully populated strings. */
  const dialogDestination = {
    _id: destination._id,
    name: destination.name,
    country: destination.country ?? "",
    category: destination.category ?? "",
    price: destination.price != null ? String(destination.price) : "",
    duration: destination.duration ?? "",
    departureDate: destination.departureDate ?? "",
    imageUrl: destination.imageUrl ?? "",
    description: destination.description ?? "",
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 md:px-6 md:py-8">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <BackToDestinations />

          <div className="flex items-center gap-2">
            {/* Placeholder until an edit route exists. */}

            {/* dialog edit button */}
            <EditDestinatonDialog destination={dialogDestination}></EditDestinatonDialog>

            {/* Delete button */}
            <DeleteDestinationDialog destination={dialogDestination}></DeleteDestinationDialog>
            
            
          </div>
        </div>

        {/* Hero image */}
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted md:aspect-[18/6]">
          <DestinationImage src={destination.imageUrl} alt={destination.name} priority />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          {/* Main content */}
          <div className="flex min-w-0 flex-col gap-8">
            <div>
              <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" aria-hidden="true" />
                {destination.country ?? "Unknown location"}
              </p>

              <h1 className="mt-2 text-4xl leading-tight font-light tracking-tight text-foreground md:text-5xl">
                {destination.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="size-4 fill-green-600 text-green-600" aria-hidden="true" />
                  <span className="font-semibold">{rating}</span>
                  {destination.reviews != null ? (
                    <span className="text-muted-foreground">({destination.reviews} reviews)</span>
                  ) : null}
                </span>

                {durationLabel ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-4 text-muted-foreground" aria-hidden="true" />
                    <span className="font-medium">{durationLabel}</span>
                  </span>
                ) : null}
              </div>
            </div>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-medium tracking-tight md:text-2xl">Overview</h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {destination.description ??
                  "No description has been added for this destination yet."}
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-medium tracking-tight md:text-2xl">Highlights</h2>
              
              <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-600" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Booking card */}
         <BookingCard destination={dialogDestination}></BookingCard>
        </div>
      </div>
    </main>
  );
}

export default DestinationDetailsPage;
