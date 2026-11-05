import { DestinationCard, type Destination } from "@/components/destination-card";


const DESTINATION_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/destination`;

const gridClassName = "grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8";

async function getDestinations(): Promise<Destination[] | null> {
  try {
    const res = await fetch(DESTINATION_API_URL);
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    const data: unknown = await res.json();
    if (!Array.isArray(data)) throw new Error("Unexpected response shape");
    return data as Destination[];
  } catch (error) {
    console.error("Could not load destinations:", error);
    return null;
  }
}


async function DestinationGrid() {
  const destinations = await getDestinations();
  console.log('destination', destinations)

  if (destinations === null) {
    return (
      <div className="rounded-xl border border-dashed bg-card p-10 text-center">
        <p className="font-medium">We could not load your destinations.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Make sure the API is running on localhost:5000, then refresh the page.
        </p>
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-card p-10 text-center">
        <p className="font-medium">No destinations published yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your first destination and it will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className={gridClassName}>
      {destinations.map((destination, index) => (
        <DestinationCard key={destination._id} destination={destination} priority={index === 0} />
      ))}

      

      
    </div>
  );
}

function DestinationGridSkeleton() {
  return (
    <div className={gridClassName} aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-7/5 w-full rounded-lg bg-muted" />
          <div className="flex flex-col gap-2 pt-4">
            <div className="h-3 w-16 rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
            <div className="h-3 w-24 rounded bg-muted" />
            <div className="mt-1 h-3 w-20 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export { DestinationGrid, DestinationGridSkeleton };
