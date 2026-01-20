import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, Target, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Student-Athletes",
    subtitle: "Life In Their Court",
    description: "Helping student-athletes develop resilience, mental toughness, and the tools needed to succeed both on and off the court.",
    href: "/student-athlete",
    color: "primary",
  },
  {
    icon: GraduationCap,
    title: "Students & Schools",
    subtitle: "Building Self Equity",
    description: "Reimagining education through programs that develop mindfulness, emotional management, self-motivation, and perseverance.",
    href: "/students",
    color: "accent",
  },
  {
    icon: Target,
    title: "Speaking Engagements",
    subtitle: "Transform Your Event",
    description: "Powerful keynotes that inspire, empower, and enable audiences to break through barriers and achieve their goals.",
    href: "/contact",
    color: "primary",
  },
];

export function Services() {
  return (
    <section className="section-padding" data-testid="section-services">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm" data-testid="text-services-subtitle">What We Do</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6" data-testid="text-services-title">
            Transforming Lives Through
            <br />
            <span className="text-gradient">Education & Coaching</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg" data-testid="text-services-description">
            Comprehensive programs designed to help students, athletes, and educators 
            unlock their full potential and achieve lasting success.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="h-full hover-elevate active-elevate-2 overflow-visible transition-all duration-300">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-lg ${service.color === "accent" ? "bg-accent" : "bg-primary"} flex items-center justify-center mb-6`}>
                    <service.icon className={`w-7 h-7 ${service.color === "accent" ? "text-accent-foreground" : "text-primary-foreground"}`} />
                  </div>
                  
                  <p className={`text-sm font-medium mb-2 ${service.color === "accent" ? "text-accent" : "text-primary"}`} data-testid={`text-service-subtitle-${index}`}>
                    {service.subtitle}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4" data-testid={`text-service-title-${index}`}>{service.title}</h3>
                  
                  <p className="text-muted-foreground mb-6" data-testid={`text-service-description-${index}`}>{service.description}</p>
                  
                  <Link href={service.href}>
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto font-medium"
                      data-testid={`button-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
