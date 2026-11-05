"use client";

import Image from "next/image";
import { useState } from "react";
import { MapPin } from "lucide-react";

const SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

/**
 * Destination images are user-supplied: base64 payloads or any URL the API
 * accepted. They can be truncated or point at a non-image resource, so fall
 * back to a placeholder instead of leaving a broken image behind.
 */
function DestinationImage({
  src,
  alt,
  priority = false,
}: {
  src?: string;
  alt: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="absolute inset-0 grid place-items-center text-muted-foreground" aria-hidden="true">
        <MapPin className="size-7" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      // The optimizer cannot handle base64 payloads or arbitrary hosts.
      unoptimized
      sizes={SIZES}
      className="object-cover"
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
      onError={() => setFailed(true)}
    />
  );
}

export { DestinationImage };
