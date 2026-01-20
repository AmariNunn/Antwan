import { Link } from "wouter";
import { SiLinkedin, SiYoutube, SiInstagram, SiFacebook } from "react-icons/si";
import { Mail, MapPin } from "lucide-react";

const socialLinks = [
  { icon: SiLinkedin, href: "https://www.linkedin.com/in/antwonharris/", label: "LinkedIn" },
  { icon: SiYoutube, href: "https://www.youtube.com/@antwonharris", label: "YouTube" },
  { icon: SiInstagram, href: "https://www.instagram.com/antwonharris/", label: "Instagram" },
  { icon: SiFacebook, href: "https://www.facebook.com/antwonharris", label: "Facebook" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/student-athlete", label: "Student-Athletes" },
  { href: "/students", label: "Students" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer mb-6" data-testid="link-footer-logo">
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="font-serif text-xl font-bold text-white">A</span>
                </div>
                <span className="font-serif text-xl font-semibold tracking-tight">
                  Antwon Harris
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6" data-testid="text-footer-description">
              Professional motivational speaker helping students, student-athletes, 
              and educators reimagine the future of education through powerful 
              keynotes and transformational coaching.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover-elevate active-elevate-2 transition-colors"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
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
              <li className="flex items-start gap-3" data-testid="text-footer-email">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">contact@antwonharris.com</span>
              </li>
              <li className="flex items-start gap-3" data-testid="text-footer-location">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">United States</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © {new Date().getFullYear()} Antwon Harris. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground" data-testid="text-tagline">
            Reimagining the Future of Education
          </p>
        </div>
      </div>
    </footer>
  );
}
