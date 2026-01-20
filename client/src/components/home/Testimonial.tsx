import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function Testimonial() {
  return (
    <section className="section-padding bg-gradient-to-b from-card/50 to-background" data-testid="section-testimonial">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm" data-testid="text-testimonial-subtitle">Testimonials</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold" data-testid="text-testimonial-title">
            What People Are{" "}
            <span className="text-gradient">Saying</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardContent className="p-8 md:p-12">
              <div className="flex justify-center mb-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary" />
                </div>
              </div>

              <blockquote className="text-lg md:text-xl lg:text-2xl text-center leading-relaxed mb-8" data-testid="text-testimonial-quote">
                "On behalf of the Jefferson Freshman Academy, we wanted to reach out and 
                say thank you SO much for speaking at our Commitment to Graduate ceremony! 
                We have received great feedback from students and staff about the ceremony 
                and the information you shared with them. Your small group students were 
                also very excited to see you in your element and speaking to the whole academy.
                <br /><br />
                We will definitely pass along a recommendation for when other academies 
                are looking for engaging speakers!"
              </blockquote>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-semibold">SP</span>
                </div>
                <p className="font-semibold text-lg" data-testid="text-testimonial-author">Savanah Proscia</p>
                <p className="text-muted-foreground" data-testid="text-testimonial-role">RPS 205</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
