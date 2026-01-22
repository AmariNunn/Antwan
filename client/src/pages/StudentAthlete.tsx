import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Mountain, 
  Repeat, 
  Target, 
  Compass, 
  ArrowRight,
  Quote,
  Trophy,
  Heart,
  Brain
} from "lucide-react";
import antwonImg from "@assets/Antwon_Harris_006_1769039740848.JPEG";

const keynotes = [
  {
    icon: Mountain,
    title: "Overcome Adversity",
    description: "This captivating keynote presentation tells the story of how Antwon Harris grew up less fortunate, became a first-generation college graduate, author, professional speaker and CEO of his own company. This transformational message will breakdown the tools needed for college students.",
    color: "primary",
  },
  {
    icon: Repeat,
    title: "Be Resilient",
    description: "Many college students have trouble recovering from academic and personal setbacks. This keynote presentation teaches students patience, mental toughness and ways to become more resilient in the event they face obstacles, challenges and the disappointment of not achieving their goal.",
    color: "copper",
  },
  {
    icon: Target,
    title: "College Student Success Strategy",
    description: "Many first year and first generation students don't understand the process to achieve the success they desire in college and life. This keynote presentation will inspire, empower and enable your students to move from a set goal to achievement.",
    color: "primary",
  },
  {
    icon: Compass,
    title: "Finding Your Purpose",
    description: "Students may view their life as worthless if they have not defined their purpose. Students need to feel like their life has value and meaning. Antwon's keynote presentation will inspire and teach college students how to identify their gifts and discover their purpose.",
    color: "copper",
  },
];

const benefits = [
  { icon: Trophy, text: "Develop winning mindset both on and off the court" },
  { icon: Brain, text: "Build mental toughness and resilience" },
  { icon: Heart, text: "Balance athletics with academic excellence" },
];

export default function StudentAthlete() {
  return (
    <div data-testid="page-student-athlete">
      <PageHeader
        subtitle="Student-Athlete Enrichment"
        title="Life In Their Court"
        description="Empowering student-athletes with the mindset, tools, and strategies to excel in athletics, academics, and life."
        backgroundImage="https://static.wixstatic.com/media/98920f_f01dfe45bcbc402aae04decd2683211a~mv2.jpg/v1/fill/w_1904,h_480,al_c,q_85,enc_avif,quality_auto/98920f_f01dfe45bcbc402aae04decd2683211a~mv2.jpg"
      />

      <section className="section-padding" data-testid="section-keynotes">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-copper font-medium mb-4 tracking-wide uppercase text-sm" data-testid="text-keynotes-subtitle">Keynote Presentations</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6" data-testid="text-keynotes-title">
              Transformational{" "}
              <span className="text-gradient">Keynotes</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg" data-testid="text-keynotes-description">
              Powerful presentations designed specifically for student-athletes 
              to help them thrive in all aspects of their journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {keynotes.map((keynote, index) => (
              <motion.div
                key={keynote.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate active-elevate-2 overflow-visible transition-all duration-300">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-lg ${keynote.color === "copper" ? "bg-copper" : "bg-primary"} flex items-center justify-center mb-6`}>
                      <keynote.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4" data-testid={`text-keynote-title-${index}`}>{keynote.title}</h3>
                    
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-keynote-description-${index}`}>{keynote.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-card/50" data-testid="section-benefits">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <p className="text-copper font-medium mb-4 tracking-wide uppercase text-sm" data-testid="text-why-subtitle">Why Choose Antwon</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" data-testid="text-why-title">
                A Coach Who{" "}
                <span className="text-gradient">Understands</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8" data-testid="text-why-description">
                Antwon's unique journey from student-athlete to Division 1 basketball 
                coach to motivational speaker gives him authentic insight into the 
                challenges facing today's student-athletes.
              </p>

              <ul className="space-y-6 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4"
                    data-testid={`benefit-item-${index}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-copper" />
                    </div>
                    <span className="text-foreground">{benefit.text}</span>
                  </motion.li>
                ))}
              </ul>

              <Link href="/contact">
                <Button data-testid="button-book-athlete">
                  Book for Your Team
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative order-1 lg:order-2"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={antwonImg}
                  alt="Antwon Harris"
                  className="w-full h-full object-cover"
                  data-testid="img-speaking"
                />
              </div>
              
              <motion.div
                className="absolute -bottom-6 -right-6 glass rounded-lg p-5 max-w-xs"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-start gap-3">
                  <Quote className="w-6 h-6 text-copper flex-shrink-0 mt-1" />
                  <p className="text-sm" data-testid="text-inline-quote">
                    "Antwon's message resonated deeply with our athletes and helped 
                    them see beyond the game."
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding" data-testid="section-cta-athlete">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" data-testid="text-cta-athlete-title">
              Ready to{" "}
              <span className="text-gradient">Elevate</span>{" "}
              Your Athletes?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto" data-testid="text-cta-athlete-description">
              Give your student-athletes the mental edge they need to succeed. 
              Book Antwon for your next team event, season kickoff, or athletic banquet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" data-testid="button-schedule-athlete">
                  Schedule a Session
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a 
                href="https://www.a24x7.co/?R*T4JO6_==R" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border-copper/50 text-copper" data-testid="button-disc-athlete">
                  Take the DISC Assessment
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
