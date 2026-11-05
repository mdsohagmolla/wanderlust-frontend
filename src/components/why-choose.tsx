import { Headphones, Map, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const reasons: { id: string; icon: LucideIcon; title: string; description: string }[] = [
  {
    id: "safe-secure",
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    id: "expert-guides",
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    id: "support",
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-[#EDFCFF]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 md:px-6 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-3">
          {reasons.map(({ id, icon: Icon, title, description }) => (
            <div
              key={id}
              className="rounded-lg border border-border bg-card p-6 text-left shadow-sm transition-shadow hover:shadow-md md:p-7"
            >
              <Icon className="size-8 text-brand" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
