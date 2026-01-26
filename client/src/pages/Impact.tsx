import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  TrendingUp,
  Users,
  GraduationCap,
  CheckCircle,
  BarChart3,
  FileText,
  Calendar,
  ArrowRight,
  School,
  Award,
  Handshake,
  ClipboardCheck,
  BookOpen
} from "lucide-react";
import { Link } from "wouter";

const keyStats = [
  { value: "15", label: "Schools Served", icon: School },
  { value: "94%", label: "Reduction in Work Aversion", icon: TrendingUp },
  { value: "88%", label: "Increase in Assignment Completion", icon: CheckCircle },
  { value: "100%", label: "Growth in Peer Conflict Improvement", icon: Users },
  { value: "73%", label: "Improvement in Attendance", icon: Calendar },
];

const focusAreas = [
  "Attendance",
  "Behavior & Attitude",
  "Peer Conflict",
  "Work Aversion",
  "Missing Assignments",
  "Communication Skills",
];

const discTypes = [
  { name: "Eagle", description: "Dominant leadership style" },
  { name: "Parrot", description: "Influential and expressive" },
  { name: "Dove", description: "Steady and supportive" },
  { name: "Owl", description: "Conscientious and analytical" },
];

export default function Impact() {
  return (
    <div data-testid="page-impact">
      <PageHeader
        subtitle="Measurable Results"
        title="Our Impact"
        description="Since 2022, The Antwon Harris Group has partnered with 15 schools across multiple districts to build measurable self-equity in students."
      />

      <section className="section-padding" data-testid="section-vision">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              <Target className="w-3 h-3 mr-1" />
              Impact Statement
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Our mission is to strengthen emotional intelligence, increase academic engagement, 
              and develop leadership identity through a structured mentorship ecosystem powered 
              by DISC-based self-awareness and weekly outcome tracking.
            </p>
            <p className="text-muted-foreground max-w-4xl mx-auto mt-4 leading-relaxed">
              We don't just deliver sessions — we implement measurable systems that improve attendance, 
              reduce work aversion, strengthen peer relationships, and build sustainable student leadership pipelines.
            </p>
            <p className="text-copper font-medium mt-6 text-lg">
              Our goal is simple: equip students to succeed academically today and thrive professionally tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-muted/30" data-testid="section-statistics">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <BarChart3 className="w-3 h-3 mr-1" />
              Key Statistics
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Impact Since 2022
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All data is measured using baseline-to-final progress tracking through our structured 
              weekly Focus Area Rubric aligned with MTSS indicators.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {keyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 text-copper mx-auto mb-3" />
                    <div className="text-3xl md:text-4xl font-bold text-copper mb-2">
                      {stat.value}
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid md:grid-cols-2 gap-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-copper" />
                  Self-Equity Impact Framework
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We measure student growth across key focus areas:
                </p>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <Badge key={area} variant="secondary" className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {area}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Students are tracked using a 5-level rubric from Unacceptable to Mastery, 
                  allowing us to measure growth, proficiency, and long-term improvement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-copper" />
                  DISC-Based Differentiation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Every student completes a DISC Bird assessment, allowing mentors to personalize strategies:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {discTypes.map((type) => (
                    <div key={type.name} className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium">{type.name}</p>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="section-padding" data-testid="section-case-studies">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <GraduationCap className="w-3 h-3 mr-1" />
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Case Studies
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-copper" />
                    From Mentee to Mentor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    A high school freshman entered the Self-Equity Mentorship Program struggling 
                    with engagement and work completion. Through weekly goal tracking, DISC-based 
                    strategy coaching, and structured accountability, the student reduced missing 
                    assignments and increased classroom participation.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    By senior year, that same student became a Peer Mentor, helping younger students 
                    navigate the same challenges.
                  </p>
                  <p className="text-copper font-medium">
                    Today, former mentees are transitioning into leadership roles within schools 
                    and communities — demonstrating the sustainability of the Self-Equity model.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Handshake className="w-5 h-5 text-copper" />
                    District Leadership Pipeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    College interns trained within the Self-Equity Program have transitioned into 
                    educational roles within partner districts — strengthening local educator pipelines 
                    while maintaining program continuity.
                  </p>
                  <p className="text-copper font-medium">
                    Our model builds long-term capacity, not temporary intervention.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30" data-testid="section-reporting">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              <FileText className="w-3 h-3 mr-1" />
              Transparent Reporting
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              How We Measure Impact
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    All student progress is tracked using:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                      Baseline and final rubric scoring
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                      Weekly mentor check-ins
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                      DISC behavioral assessments
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                      School-aligned focus indicators
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Partner School Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We provide partner schools with:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                      Portfolio reports
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                      Outcome summaries
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                      Growth percentages
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                      Implementation documentation
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-copper" />
                    Alignment & Accountability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-muted-foreground mb-4">
                        We align our reporting with:
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                          MTSS Tier 2 & Tier 3 frameworks
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                          Panorama-style school climate indicators
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                          Title I and Title IV funding guidelines
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                          District college & career readiness goals
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-4">
                        The Self-Equity Mentorship Program operates through:
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                          Structured implementation models
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                          Data dashboards
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                          College intern training systems
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-copper flex-shrink-0" />
                          Leadership pipeline development
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-copper font-medium mt-6 text-center">
                    We are committed to measurable outcomes, transparent reporting, and district-aligned growth strategies.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-copper/10 to-transparent" data-testid="section-cta">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Bring Self-Equity to Your District
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to implement measurable student growth strategies in your school? 
              Let's discuss how the Self-Equity Mentorship Program can transform your students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" data-testid="button-schedule-consultation">
                  Schedule a Strategy Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" data-testid="button-explore-implementation">
                  Explore District Implementation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
