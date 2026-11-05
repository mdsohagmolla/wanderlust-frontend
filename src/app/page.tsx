import { Banner } from "@/components/banner";
import { CallToAction } from "@/components/call-to-action";
import Featured from "@/components/featured";


import { Testimonials } from "@/components/testimonials";
import { WhyChoose } from "@/components/why-choose";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      
      <Banner />
      <Featured></Featured>
      <WhyChoose />

      <Testimonials />
      <CallToAction />
      
    </div>
  );
}
