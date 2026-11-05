"use client";

import { ArrowUpRight } from "lucide-react";

export function NewsletterForm() {
  return (
    <form
      className="relative mt-4 max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="Enter email"
        className="h-11 w-full rounded-md border border-white/15 bg-white/10 pr-12 pl-4 text-sm text-white outline-none placeholder:text-white/50 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="absolute inset-y-0 right-1 my-auto inline-flex size-8 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </button>
    </form>
  );
}
