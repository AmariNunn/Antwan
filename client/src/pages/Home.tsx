import { Hero } from "@/components/home/Hero";
import { MediaFeatures } from "@/components/home/MediaFeatures";
import { Services } from "@/components/home/Services";
import { VideoSection } from "@/components/home/VideoSection";
import { Organizations } from "@/components/home/Organizations";
import { Testimonial } from "@/components/home/Testimonial";
import { CallToAction } from "@/components/home/CallToAction";

export default function Home() {
  return (
    <div data-testid="page-home">
      <Hero />
      <VideoSection />
      <Services />
      <Organizations />
      <Testimonial />
      <CallToAction />
    </div>
  );
}
