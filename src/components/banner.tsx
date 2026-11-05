import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";

const searchFields = [
  { id: "location", label: "Location", placeholder: "Address, City Or Zip" },
  { id: "date-duration", label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { id: "budget", label: "Budget", placeholder: "$0-$3000" },
  { id: "people", label: "People", placeholder: "5-10" },
];

export function Banner() {
  return (
    <section className="relative isolate flex min-h-[600px] flex-col overflow-hidden md:min-h-[max(600px,calc(100vh_-_4rem))]">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 "
      />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-4 pb-12 pt-16 text-center md:pb-16 md:pt-20">
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.1] text-white md:text-5xl">
          Discover Your <br className="hidden sm:block" />
          Next Adventure
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-brand px-6 text-xs font-bold uppercase tracking-wider text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            Explore Now
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex h-11 items-center rounded-md border border-white/40 bg-white/10 px-6 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            View Destination
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-6 md:px-6">
        <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-white/25 bg-white/10 backdrop-blur-md md:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
          {searchFields.map((field, index) => (
            <div
              key={field.id}
              className={cn(
                "border-b border-white/20 px-5 py-3 text-left md:border-b-0 md:border-white/20",
                index < searchFields.length - 1 && "md:border-r"
              )}
            >
              <label
                htmlFor={field.id}
                className="block text-sm font-semibold text-white"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type="text"
                placeholder={field.placeholder}
                className="mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
              />
            </div>
          ))}

          <button
            type="button"
            className="w-full bg-brand px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand/90 md:w-auto md:px-10"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
