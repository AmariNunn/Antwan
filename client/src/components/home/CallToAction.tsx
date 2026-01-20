import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

export function CallToAction() {
  return (
    <section className="relative section-padding overflow-hidden" data-testid="section-cta">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent/10 border border-accent/20 mb-8" data-testid="badge-cta">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Transform Your Event</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6" data-testid="text-cta-title">
            Ready to{" "}
            <span className="text-gradient">Inspire</span>{" "}
            Your Audience?
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10" data-testid="text-cta-description">
            Book Antwon for your next event and give your students, athletes, 
            or educators the motivation and tools they need to succeed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto" data-testid="button-cta-book">
                <Calendar className="mr-2 w-4 h-4" />
                Book a Speaking Engagement
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a 
              href="https://www.a24x7.co/?R*T4JO6_==R" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-cta-disc">
                Take the DISC Assessment
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
