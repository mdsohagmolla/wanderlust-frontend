import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: "michael-chen",
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    id: "sarah-johnson",
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
  {
    id: "amelia-martin",
    quote:
      "A Seamless Journey From Start To Finish. Every Transfer, Hotel And Excursion Was Handled With Care, Leaving Us Free To Simply Enjoy The Adventure.",
    name: "Amelia Martin",
    location: "London, UK",
    image: "/images/person1.png",
  },
  {
    id: "david-okafor",
    quote:
      "The Kyoto Cultural Tour Was Thoughtfully Curated. Our Local Guide Shared Stories And Hidden Spots We Never Would Have Found On Our Own.",
    name: "David Okafor",
    location: "Lagos, Nigeria",
    image: "/images/person2.png",
  },
];

export function Testimonials() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 md:px-6 md:py-24">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                Real experiences from our happy travelers
              </p>
            </div>

            <div className="flex items-center gap-3">
              <CarouselPrevious className="static! size-10" />
              <CarouselNext className="static! size-10" />
            </div>
          </div>

          <CarouselContent className="mt-8">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="basis-full md:basis-1/2"
              >
                <figure className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card sm:flex-row">
                  <div className="flex flex-1 flex-col justify-between gap-6 p-6 md:p-7">
                    <blockquote className="text-sm leading-relaxed text-foreground md:text-base">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="text-sm">
                      <span className="flex items-center gap-2 font-semibold text-brand">
                        <span
                          aria-hidden="true"
                          className="h-px w-6 bg-brand"
                        />
                        {testimonial.name}
                      </span>
                      <span className="mt-1 block pl-8 text-xs text-muted-foreground">
                        {testimonial.location}
                      </span>
                    </figcaption>
                  </div>
                  <div className="relative aspect-square w-full shrink-0 sm:aspect-auto sm:w-44 md:w-56">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="(min-width: 768px) 224px, (min-width: 640px) 176px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
