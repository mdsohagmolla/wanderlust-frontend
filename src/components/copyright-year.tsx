"use client";

export function CopyrightYear() {
  return (
    <span suppressHydrationWarning>
      © {new Date().getFullYear()} Wanderlust. All rights reserved.
    </span>
  );
}
