import { Suspense } from "react";
import { DestinationGrid, DestinationGridSkeleton } from "./destination-grid";


export default function DestinationsPage({}) {
    
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-360 px-4 py-10 md:px-6 md:py-14">
        {/* Static: kept outside <Suspense> so it ships in the shell instead of
            waiting on the destinations fetch. */}
        <header className="mb-8 md:mb-10">
          <h1 className="text-4xl leading-tight font-light tracking-tight text-foreground md:text-5xl">
            Explore All Destinations
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Find your perfect travel experience from our curated collection
          </p>
          <p>Showing {} destination</p>
        </header>

        <Suspense fallback={<DestinationGridSkeleton />}>
          <DestinationGrid />
        </Suspense>
      </div>
    </main>
  );
}
