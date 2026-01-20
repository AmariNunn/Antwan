import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 border border-primary/20 mb-8"
              data-testid="badge-speaker"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Speaker + Coach in Education</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-tight mb-6" data-testid="text-hero-title">
              Reimagining the{" "}
              <span className="relative inline-block pb-2">
                <span className="text-gradient">Future</span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
              </span>{" "}
              of Education
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10" data-testid="text-hero-description">
              Inspiring students, student-athletes, and educators through powerful 
              keynotes and transformational coaching that unlock potential and build 
              self-equity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto" data-testid="button-hero-book">
                  Book Antwon to Speak
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a 
                href="https://www.a24x7.co/?R*T4JO6_==R" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-hero-disc">
                  <Play className="mr-2 w-4 h-4" />
                  Take the DISC Assessment
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 z-10" />
              <img
                src="https://static.wixstatic.com/media/98920f_95a87405a9ac44a9a5ec04c29d9a6d98~mv2.jpg/v1/fill/w_828,h_431,al_c,q_80,enc_avif,quality_auto/98920f_95a87405a9ac44a9a5ec04c29d9a6d98~mv2.jpg"
                alt="Antwon Harris speaking"
                className="w-full h-full object-cover"
                data-testid="img-hero"
              />
              
              <motion.div
                className="absolute bottom-4 left-4 glass rounded-lg p-4 z-20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md bg-accent flex items-center justify-center">
                    <span className="text-accent-foreground font-bold text-lg">15+</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" data-testid="text-experience-years">Years of</p>
                    <p className="text-muted-foreground text-xs">Experience</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-4 right-4 glass rounded-lg p-4 z-20"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">1K+</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" data-testid="text-students-impacted">Students</p>
                    <p className="text-muted-foreground text-xs">Impacted</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
