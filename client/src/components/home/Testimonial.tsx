import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "On behalf of the Jefferson Freshman Academy, we wanted to reach out and say thank you SO much for speaking at our Commitment to Graduate ceremony! We have received great feedback from students and staff about the ceremony and the information you shared with them. Your small group students were also very excited to see you in your element and speaking to the whole academy. We will definitely pass along a recommendation for when other academies are looking for engaging speakers!",
    author: "Savanah Proscia",
    role: "RPS 205",
    initials: "SP",
  },
  {
    quote: "Antwon Harris is our annual speaker for the Academy Expo. He speaks to eight groups of 9th graders as they arrive for our annual career exploration event. He immediately connects with each individual student as they walk through the door. Antwon speaks with students about the importance of showing up and taking advantage of everything the day had to offer. We typically have 102 booths with industry experts ready to demonstrate their career to over 2,000 students. Antwon encourages students to interact with our business partners and instructs them to ask questions, be present, and engage with the men and women who were there for them. He creates an instant rapport with our students, and they take Antwon serious. This year's event was the best to date, and that is due in part to Antwon's presence.",
    author: "Bridget French",
    role: "Executive Director for College & Career Readiness, Rockford Public Schools",
    initials: "BF",
  },
];

export function Testimonial() {
  return (
    <section className="section-padding bg-gradient-to-b from-card/50 to-background" data-testid="section-testimonial">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 h-full">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Quote className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <blockquote className="text-base md:text-lg text-center leading-relaxed mb-6 flex-grow" data-testid={`text-testimonial-quote-${index}`}>
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex flex-col items-center mt-auto">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3">
                      <span className="text-white text-lg font-semibold">{testimonial.initials}</span>
                    </div>
                    <p className="font-semibold text-lg text-center" data-testid={`text-testimonial-author-${index}`}>{testimonial.author}</p>
                    <p className="text-muted-foreground text-center text-sm" data-testid={`text-testimonial-role-${index}`}>{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
