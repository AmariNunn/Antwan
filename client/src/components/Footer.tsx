import { Link } from "wouter";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/Logo_2_1769039571662.PNG";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/student-athlete", label: "Student-Athletes" },
  { href: "/students", label: "Students" },
  { href: "/contact", label: "Contact" },
];

const quickLinks = [
  { label: "About Us", href: "https://www.antwonharris.com/about-1" },
  { label: "Programs & Services", href: "/students" },
  { label: "Our Impact", href: "https://www.youtube.com/watch?v=06kx9S5D1cM" },
  { label: "Book Us/Partner", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer mb-6" data-testid="link-footer-logo">
                <img 
                  src={logoImg} 
                  alt="Antwon Harris Logo" 
                  className="h-14 w-auto"
                />
                <span className="font-serif text-xl font-semibold tracking-tight">
                  Antwon Harris Group, LLC
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6" data-testid="text-footer-description">
              Professional motivational speaker helping students, student-athletes, 
              and educators reimagine the future of education through powerful 
              keynotes and transformational coaching.
            </p>
            <a 
              href="https://blinq.me/cmgv8ex8901dis60m0kzi68uk?u=IelmX_5Q&bs=itc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-copper text-copper" data-testid="link-connect">
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect with Antwon
              </Button>
            </a>
          </div>

          <div>
            <h4 className="font-semibold mb-6" data-testid="text-quick-links-title">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span 
                      className="text-muted-foreground cursor-pointer"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6" data-testid="text-contact-title">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3" data-testid="text-footer-phone">
                <Phone className="w-5 h-5 text-copper mt-0.5" />
                <a href="tel:7793482133" className="text-muted-foreground hover:text-foreground transition-colors">
                  (779) 348-2133
                </a>
              </li>
              <li className="flex items-start gap-3" data-testid="text-footer-email">
                <Mail className="w-5 h-5 text-copper mt-0.5" />
                <a href="mailto:info@antwonharris.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  info@antwonharris.com
                </a>
              </li>
              <li className="flex items-start gap-3" data-testid="text-footer-location">
                <MapPin className="w-5 h-5 text-copper mt-0.5" />
                <span className="text-muted-foreground">United States</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © {new Date().getFullYear()} Antwon Harris Group, LLC. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground" data-testid="text-tagline">
            Reimagining the Future of Education
          </p>
        </div>
      </div>
    </footer>
  );
}
