import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ArrowRight,
  Brain,
  Heart,
  Sparkles,
  Users,
  Target,
  Lightbulb,
  CheckCircle,
  ExternalLink
} from "lucide-react";

const selfEquityAreas = [
  "Mindfulness",
  "Perseverance", 
  "Emotional Management",
  "Self Motivation",
  "Self-Care",
  "Gratitude",
  "Resilience",
  "Reflection",
];

const discBirds = [
  { name: "Eagle", letter: "D", subtitle: "Dominant", motto: "I got this!", color: "text-red-500" },
  { name: "Parrot", letter: "I", subtitle: "Interactive", motto: "We can do it!", color: "text-yellow-500" },
  { name: "Dove", letter: "S", subtitle: "Supportive", motto: "Let's help each other!", color: "text-green-500" },
  { name: "Owl", letter: "C", subtitle: "Conscientious", motto: "Be smart about it!", color: "text-blue-500" },
];

const discBenefits = [
  { icon: Target, text: "Create an action plan for success" },
  { icon: Sparkles, text: "Earn good grades through self-awareness" },
  { icon: Lightbulb, text: "Learn amazing things about themselves" },
  { icon: Brain, text: "Overcome challenges at school and home" },
  { icon: Users, text: "Become aware of how to help their community" },
];

const relationshipBenefits = [
  "Relationship with self",
  "Relationship with family",
  "Relationship with friends",
  "Relationship with teachers",
];

export default function Students() {
  return (
    <div data-testid="page-students">
      <PageHeader
        subtitle="Reimagining Education"
        title="Building Self Equity"
        description="Committed to LEAD students: Lead, Educate, Access, Develop"
      />

      <section className="section-padding" data-testid="section-self-equity">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm" data-testid="text-self-equity-subtitle">Self-Equity Program</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" data-testid="text-self-equity-title">
                Understanding{" "}
                <span className="text-gradient">Yourself</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed" data-testid="text-self-equity-description">
                Self-equity is understanding yourself by solving your problems using 
                your own thoughts, ideas, creativity, experiences, knowledge, and self 
                control. Through several exercises, students will be able to grow their 
                self-equity and become more well rounded and balanced individuals.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {selfEquityAreas.map((area, index) => (
                  <motion.div
                    key={area}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center gap-3"
                    data-testid={`self-equity-area-${index}`}
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{area}</span>
                  </motion.div>
                ))}
              </div>

              <a 
                href="https://ec3a1232-d01e-4ec0-877d-24ac14a11b04.filesusr.com/ugd/98920f_a12d8abcd5694be3bbeb80e9a84c840d.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" data-testid="button-download-pdf">
                  Download Self-Equity PDF
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img
                  src="https://static.wixstatic.com/media/11062b_affad36e3187404f8a2dbe0ea8796676~mv2_d_4000_2158_s_2.jpg/v1/fill/w_476,h_546,al_c,q_80,enc_avif,quality_auto/11062b_affad36e3187404f8a2dbe0ea8796676~mv2_d_4000_2158_s_2.jpg"
                  alt="Students working together"
                  className="w-full h-full object-cover"
                  data-testid="img-students"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-card/50" data-testid="section-disc">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm" data-testid="text-disc-subtitle">DISC Assessment</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6" data-testid="text-disc-title">
              Which Bird Are{" "}
              <span className="text-gradient">You?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg" data-testid="text-disc-description">
              The DISC assessment helps students understand their personality type 
              and how to leverage their strengths.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {discBirds.map((bird, index) => (
              <motion.div
                key={bird.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover-elevate active-elevate-2 overflow-visible transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <span className={`text-3xl font-bold ${bird.color}`}>{bird.letter}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-1" data-testid={`disc-bird-name-${index}`}>{bird.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">({bird.subtitle})</p>
                    <p className={`font-medium ${bird.color}`} data-testid={`disc-bird-motto-${index}`}>"{bird.motto}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6" data-testid="text-disc-helps-title">How DISC Helps Students</h3>
                  <ul className="space-y-4">
                    {discBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-4" data-testid={`disc-benefit-${index}`}>
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-foreground pt-2">{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6" data-testid="text-relationships-title">Improving Relationships</h3>
                  <p className="text-muted-foreground mb-6">
                    Understanding your DISC profile helps students improve their 
                    relationships in all areas of life:
                  </p>
                  <ul className="space-y-4">
                    {relationshipBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-4" data-testid={`relationship-benefit-${index}`}>
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Heart className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <a 
                      href="https://youtu.be/ZMF-28iGMXo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full" data-testid="button-learn-disc">
                        Learn More About DISC
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding" data-testid="section-cta-students">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" data-testid="text-cta-students-title">
              Transform Your{" "}
              <span className="text-gradient">School</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto" data-testid="text-cta-students-description">
              Bring the Self-Equity program and DISC assessment to your school 
              and help students discover their potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" data-testid="button-book-students">
                  Book for Your School
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a 
                href="https://www.a24x7.co/?R*T4JO6_==R" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" data-testid="button-take-disc">
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
