import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="relative isolate flex min-h-105 items-center overflow-hidden md:min-h-105">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/45" />

      <div className="mx-auto flex w-full max-w-360 flex-col items-center px-4 py-16 text-center md:px-6 md:py-20">
        <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>

        <Link
          href="/destinations"
          className="mt-8 inline-flex h-12 items-center gap-3 rounded-md bg-white px-8 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
