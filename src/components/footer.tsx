import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { CopyrightYear } from "@/components/copyright-year";
import { NewsletterForm } from "@/components/newsletter-form";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/bookings", label: "My Bookings" },
  { href: "/profile", label: "My Profile" },
];

const supportLinks = [
  { href: "/help", label: "Help Center" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

const socialLinks = [
  {
    href: "https://x.com",
    label: "X",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
        className="size-5"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const columnTitleClassName =
  "text-xs font-semibold uppercase tracking-widest text-white";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto w-full max-w-360 px-4 py-14 md:px-6 md:py-16">
        <Image
          src="/images/wanderlast-1.png"
          alt="Wanderlast"
          width={360}
          height={54}
          className="h-12 w-auto md:h-16"
        />
        <p className="mt-4 text-sm text-white/70 md:text-base">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <h2 className={columnTitleClassName}>Newsletter</h2>
            <p className="mt-3 text-sm text-white/70">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <NewsletterForm />
          </div>

          <nav aria-label="Quick links">
            <h2 className={columnTitleClassName}>Quick Links</h2>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <h2 className={columnTitleClassName}>Support</h2>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={columnTitleClassName}>Contact Us</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+17869011622"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderlust.com"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  info@wanderlust.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-white/60">
            <Suspense fallback="© Wanderlust. All rights reserved.">
              <CopyrightYear />
            </Suspense>
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="text-white/70 transition-colors hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
