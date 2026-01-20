import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Send,
  Mail,
  MapPin,
  ExternalLink,
  Heart,
  Loader2
} from "lucide-react";

const featuredLinks = [
  {
    title: "Harris hard at work",
    source: "RR Star",
    href: "https://www.rrstar.com/sports/20160628/womens-college-hoops-antwon-harris-hard-at-work-for-highland",
  },
  {
    title: "NJCAA Hall Of Fame",
    source: "Freeport News Network",
    href: "https://www.freeportnewsnetwork.com/top-stories/former-hcc-basketball-player-inducted-to-njcaa-region-iv-hall-of-fame/",
  },
  {
    title: "Never Surrender",
    source: "Herald Online",
    href: "https://www.heraldonline.com/sports/article12203690.html",
  },
  {
    title: "Division 1 Basketball Coach",
    source: "Longwood Lancers",
    href: "https://longwoodlancers.com/news/2017/7/21/antwon-harris-added-to-womens-basketball-staff.aspx?path=wbasket",
  },
  {
    title: "Power 5",
    source: "TN Sports 360",
    href: "https://tnsports360.com/kenwood-great-joins-texas-tech-coaching-staff/",
  },
];

const contactFormSchema = insertContactSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      organization: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. Antwon will get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    submitMutation.mutate(data);
  };

  return (
    <div data-testid="page-contact">
      <PageHeader
        subtitle="Get in Touch"
        title="Book Antwon"
        description="Ready to inspire your audience? Let's discuss how Antwon can transform your event."
      />

      <section className="section-padding" data-testid="section-contact">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">Send a Message</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John"
                                  data-testid="input-first-name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Doe"
                                  data-testid="input-last-name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                data-testid="input-email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your school or organization"
                                data-testid="input-organization"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your event and how Antwon can help..."
                                rows={5}
                                data-testid="input-message"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={submitMutation.isPending}
                        data-testid="button-submit-contact"
                      >
                        {submitMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">About Antwon</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Antwon wouldn't be here today if it was not for a successful heart 
                    surgery in 2002.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Antwon is a professional motivational speaker who delivers on a variety 
                    of topics for audiences large and small. It has always been his dream 
                    to make a positive impact in the lives of others. He is proud to make 
                    a living by inspiring, motivating and challenging people from all 
                    different backgrounds.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Combining an unorthodox and strategic approach, Antwon helps people 
                    break through barriers, overcome doubts, and take large strides toward 
                    achieving their goals.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4" data-testid="text-contact-email">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">contact@antwonharris.com</span>
                </div>
                <div className="flex items-center gap-4" data-testid="text-contact-location">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">United States</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Featured Links
                </h3>
                <div className="space-y-3">
                  {featuredLinks.map((link, index) => (
                    <motion.a
                      key={link.title}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover-elevate active-elevate-2 transition-colors"
                      data-testid={`link-featured-${index}`}
                    >
                      <div>
                        <p className="font-medium">{link.title}</p>
                        <p className="text-sm text-muted-foreground">{link.source}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-card/50" data-testid="section-image">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-[16/9] rounded-lg overflow-hidden"
          >
            <img
              src="https://static.wixstatic.com/media/98920f_3403be1d87f74982b6c447846685eb81~mv2.jpg/v1/fill/w_638,h_1128,al_c,q_85,enc_avif,quality_auto/98920f_3403be1d87f74982b6c447846685eb81~mv2.jpg"
              alt="Antwon Harris"
              className="w-full h-full object-cover object-top"
              data-testid="img-antwon"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
