import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  GraduationCap,
  Lightbulb,
  Target,
  Rocket,
  Brain,
  Star,
  HandHeart,
  Trophy,
  School,
  Calendar,
  ArrowRight,
  Play,
  Quote,
  CheckCircle,
  Globe,
  Volleyball,
  BookOpen,
  Building2,
  Clock,
  Award,
} from "lucide-react";
import heroImg from "@assets/Antwon_Harris_009_1769039738636.JPEG";

// ─── Data ───────────────────────────────────────────────────────────────────

const gearsAcronym = [
  {
    letter: "G",
    word: "Goal Setting",
    description: "Teaching students to set clear, achievable goals that drive purposeful action.",
    icon: Target,
  },
  {
    letter: "E",
    word: "Execution Mindset",
    description: "Building the discipline and focus to follow through on plans with consistency.",
    icon: Rocket,
  },
  {
    letter: "A",
    word: "Action Plan",
    description: "Creating structured roadmaps that turn vision into measurable steps forward.",
    icon: CheckCircle,
  },
  {
    letter: "R",
    word: "Reimagining the Future",
    description: "Expanding what students believe is possible for themselves and their communities.",
    icon: Lightbulb,
  },
  {
    letter: "S",
    word: "Solution-Based Thinking",
    description: "Developing the critical thinking skills to solve problems with confidence.",
    icon: Brain,
  },
];

const initiatives = [
  { title: "Student Mentorship", icon: Users },
  { title: "Emotional Intelligence", icon: Heart },
  { title: "Self-Equity™", icon: Star },
  { title: "Scholarships", icon: GraduationCap },
  { title: "Leadership Development", icon: Trophy },
  { title: "Family Engagement", icon: HandHeart },
  { title: "Athletics", icon: Volleyball },
  { title: "School Partnerships", icon: School },
  { title: "Community Events", icon: Globe },
];

const impactStats = [
  { value: 1000, suffix: "+", label: "Students Served", icon: Users },
  { value: 15, suffix: "+", label: "School Partnerships", icon: School },
  { value: 500, suffix: "+", label: "Volunteer Hours", icon: Clock },
  { value: 25, suffix: "+", label: "Scholarships Awarded", icon: Award },
  { value: 30, suffix: "+", label: "Community Events", icon: Calendar },
  { value: 5000, suffix: "+", label: "Lives Impacted", icon: Heart },
];

const programs = [
  {
    title: "Self-Equity™",
    description:
      "Our signature mentorship program that helps students build identity, emotional intelligence, and self-worth through structured weekly sessions and DISC-based coaching.",
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Dreaming Big Initiative",
    description:
      "An immersive experience designed to unlock ambition and purpose in students who have been told their dreams are too big or out of reach.",
    color: "from-copper/20 to-copper/5",
  },
  {
    title: "Beyond the Basketball Court",
    description:
      "Supporting student-athletes in discovering their identity beyond sports — building the mindset, character, and skills that translate to every area of life.",
    color: "from-primary/20 to-copper/5",
  },
  {
    title: "Student Leadership",
    description:
      "Developing the next generation of servant leaders through workshops, peer mentorship training, and real-world leadership opportunities.",
    color: "from-copper/20 to-primary/5",
  },
  {
    title: "College & Career Readiness",
    description:
      "Equipping students with the tools, knowledge, and confidence to navigate post-secondary pathways — from applications to professional development.",
    color: "from-primary/15 to-copper/10",
  },
  {
    title: "Family Engagement",
    description:
      "Bridging the gap between school and home by empowering families with resources, tools, and community connections that support student success.",
    color: "from-copper/15 to-primary/10",
  },
];

const testimonials = [
  {
    quote:
      "The G.E.A.R.S. Foundation has transformed how our students see themselves. The mentorship and programming gave my son the confidence to believe in his future.",
    author: "Parent",
    role: "Parent of Program Graduate",
  },
  {
    quote:
      "I walked in not knowing who I was. Now I have a goal, a plan, and people who believe in me. G.E.A.R.S. changed my life.",
    author: "Student Participant",
    role: "Self-Equity™ Program",
  },
  {
    quote:
      "Partnering with the G.E.A.R.S. Foundation has had a measurable impact on student behavior, attendance, and academic engagement. This is exactly what our school needed.",
    author: "School Principal",
    role: "Partner School District",
  },
  {
    quote:
      "What Antwon and his team have built is rare — a program that truly meets students where they are and walks alongside them toward transformation.",
    author: "School Counselor",
    role: "School Partner",
  },
];

const involvementOptions = [
  { label: "Volunteer", icon: HandHeart, href: "/contact", description: "Give your time and expertise" },
  { label: "Become a Mentor", icon: Users, href: "/contact", description: "Walk alongside a student weekly" },
  { label: "Sponsor a Student", icon: GraduationCap, href: "#donate", description: "Fund a scholarship opportunity" },
  { label: "Corporate Partnership", icon: Building2, href: "/contact", description: "Align your brand with impact" },
  { label: "Golf Tournament", icon: Trophy, href: "/contact", description: "Sponsor the Education Classic" },
];

const events = [
  {
    title: "G.E.A.R.S. Foundation Education Classic Golf Tournament",
    description:
      "Our annual fundraiser bringing together community leaders, educators, and supporters to fund scholarships and programs for students in need.",
    type: "Annual Fundraiser",
    icon: Trophy,
  },
  {
    title: "Student Leadership Conference",
    description:
      "A full-day immersive experience where students develop leadership skills, hear from inspiring speakers, and connect with mentors from across the community.",
    type: "Annual Conference",
    icon: Star,
  },
  {
    title: "Back-to-School Initiative",
    description:
      "Providing students and families with resources, school supplies, and community support to start the academic year strong.",
    type: "Annual Event",
    icon: BookOpen,
  },
  {
    title: "Scholarship Celebration",
    description:
      "Honoring outstanding students with scholarships and recognizing the families, educators, and mentors who helped them get there.",
    type: "Annual Ceremony",
    icon: Award,
  },
];

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Gears() {
  return (
    <div data-testid="page-gears">

      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-testid="section-gears-hero"
      >
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="G.E.A.R.S. Foundation"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* decorative glows */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-copper/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-32 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-copper/10 border border-copper/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
            <span className="text-sm font-medium text-copper uppercase tracking-wider">
              Nonprofit · 501(c)(3)
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-tight mb-6"
          >
            Reimagining the{" "}
            <span className="relative inline-block pb-2">
              <span className="text-gradient">Future</span>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-copper rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>{" "}
            of Education—Together.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Helping students discover who they are before the world tells them who they should become.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-copper/50 text-copper hover:bg-copper/10" data-testid="button-hero-partner">
                Become a Partner
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" data-testid="button-hero-sponsor">
                Sponsor a Student
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── About ── */}
      <section className="section-padding" data-testid="section-about">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-4">
                <Building2 className="w-3 h-3 mr-1" />
                About the Foundation
              </Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                The Nonprofit Arm of the Antwon Harris Group
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                The G.E.A.R.S. Foundation is the nonprofit arm of the Antwon Harris Group, created
                to expand access to mentorship, emotional intelligence, leadership development,
                scholarships, and educational opportunities for students and families.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Founded on the belief that every student deserves to discover their potential before
                the world defines their limits, we partner with schools, communities, and organizations
                to create transformational experiences that last a lifetime.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Mentorship", icon: Users, color: "bg-primary/10 text-primary" },
                { label: "Scholarships", icon: GraduationCap, color: "bg-copper/10 text-copper" },
                { label: "Leadership", icon: Star, color: "bg-copper/10 text-copper" },
                { label: "Community", icon: Globe, color: "bg-primary/10 text-primary" },
              ].map((item, i) => (
                <Card key={item.label} className="hover-elevate">
                  <CardContent className="pt-6 pb-5 flex flex-col items-center text-center gap-3">
                    <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <p className="font-medium">{item.label}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="section-padding bg-muted/30" data-testid="section-mission">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4">
              <Target className="w-3 h-3 mr-1" />
              Our Mission
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
              Why We Exist
            </h2>
            <div className="relative">
              <div className="absolute -top-4 -left-2 text-7xl text-copper/10 font-serif select-none">"</div>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-serif italic px-8">
                Empowering students through mentorship, education, emotional intelligence, leadership
                development, scholarships, and community partnerships.
              </p>
              <div className="absolute -bottom-4 -right-2 text-7xl text-copper/10 font-serif select-none rotate-180">"</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What G.E.A.R.S. Means ── */}
      <section className="section-padding" data-testid="section-gears-acronym">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              <Lightbulb className="w-3 h-3 mr-1" />
              The Framework
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              What G.E.A.R.S. Means
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Five principles that form the foundation of everything we do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {gearsAcronym.map((item, index) => (
              <motion.div
                key={item.letter}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover-elevate group">
                  <CardContent className="pt-8 pb-6 flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-copper/20 border border-copper/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-copper/30 transition-all">
                      <span className="text-2xl font-serif font-bold text-gradient">{item.letter}</span>
                    </div>
                    <item.icon className="w-6 h-6 text-copper" />
                    <h3 className="font-semibold text-sm">{item.word}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="section-padding bg-muted/30" data-testid="section-what-we-do">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              <CheckCircle className="w-3 h-3 mr-1" />
              Our Work
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">What We Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our initiatives are designed to meet students where they are and walk alongside them
              toward transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {initiatives.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <Card className="h-full hover-elevate group cursor-default">
                  <CardContent className="pt-6 pb-5 flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors">
                      <item.icon className="w-6 h-6 text-copper" />
                    </div>
                    <p className="font-medium text-sm md:text-base">{item.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact Counters ── */}
      <section className="section-padding" data-testid="section-impact">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              <Star className="w-3 h-3 mr-1" />
              Our Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Measuring What Matters
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every number represents a real student, a real family, a real life changed.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="pt-8 pb-6">
                    <stat.icon className="w-8 h-8 text-copper mx-auto mb-4" />
                    <div className="text-3xl md:text-4xl font-bold text-copper mb-2">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section className="section-padding bg-muted/30" data-testid="section-programs">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              <BookOpen className="w-3 h-3 mr-1" />
              Signature Programs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each program is built around the belief that every student has untapped potential
              waiting to be unlocked.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate overflow-hidden group">
                  <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                  <CardContent className="pt-6 pb-6">
                    <h3 className="font-serif font-semibold text-lg mb-3 group-hover:text-copper transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {program.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Success Stories ── */}
      <section className="section-padding" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              <Quote className="w-3 h-3 mr-1" />
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Stories of Transformation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear directly from the students, families, principals, and partners who have
              witnessed G.E.A.R.S. in action.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <Quote className="w-8 h-8 text-copper/30 mb-4" />
                    <p className="text-muted-foreground leading-relaxed mb-6 italic">
                      "{item.quote}"
                    </p>
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold">{item.author}</p>
                      <p className="text-sm text-copper">{item.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ways to Get Involved ── */}
      <section className="section-padding bg-muted/30" data-testid="section-get-involved">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              <HandHeart className="w-3 h-3 mr-1" />
              Take Action
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ways to Get Involved
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              There's a role for everyone in this movement. Choose how you want to make a difference.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {involvementOptions.map((option, index) => (
              <motion.div
                key={option.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <a
                  href={option.href}
                  className="block h-full"
                  data-testid={`button-involve-${option.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Card className="h-full hover-elevate group cursor-pointer border-border hover:border-copper/30 transition-colors">
                    <CardContent className="pt-6 pb-6 flex flex-col items-center text-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-copper/10 flex items-center justify-center group-hover:bg-copper/20 transition-colors">
                        <option.icon className="w-7 h-7 text-copper" />
                      </div>
                      <h3 className="font-semibold">{option.label}</h3>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events ── */}
      <section className="section-padding" data-testid="section-events">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              <Calendar className="w-3 h-3 mr-1" />
              Events
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Annual Events</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join us throughout the year as we celebrate students, raise resources, and build
              community together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate group">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <event.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2 text-xs">{event.type}</Badge>
                        <h3 className="font-serif font-semibold mb-2 group-hover:text-copper transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Inquire About Events
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Video ── */}
      <section className="section-padding bg-muted/30" data-testid="section-video">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <Play className="w-3 h-3 mr-1" />
              Our Story
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              See G.E.A.R.S. in Action
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A 2–3 minute look at why the G.E.A.R.S. Foundation exists and the students whose
              lives it has transformed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-xl overflow-hidden border border-border"
          >
            <iframe
              src="https://www.youtube.com/embed/06kx9S5D1cM"
              title="G.E.A.R.S. Foundation Story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              data-testid="iframe-foundation-video"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Donation ── */}
      <section
        id="donate"
        className="section-padding bg-gradient-to-br from-copper/10 via-background to-primary/5"
        data-testid="section-donate"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4">
              <Heart className="w-3 h-3 mr-1" />
              Make a Difference
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              Invest in a Student's Future.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your donation directly funds programs that change the trajectory of students' lives.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 text-left max-w-2xl mx-auto">
              {[
                { label: "Mentorship sessions & training", icon: Users },
                { label: "Student scholarships", icon: GraduationCap },
                { label: "Learning resources & materials", icon: BookOpen },
                { label: "Leadership development", icon: Trophy },
                { label: "Community programming", icon: Globe },
                { label: "Family engagement events", icon: HandHeart },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-copper mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-copper/50 text-copper">
                Explore Partnership
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>

            <p className="text-xs text-muted-foreground mt-8">
              The G.E.A.R.S. Foundation is a registered 501(c)(3) nonprofit organization.
              All donations are tax-deductible to the extent allowed by law.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
