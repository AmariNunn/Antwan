import { motion } from "framer-motion";

const organizations = [
  { name: "U.S. Army", initials: "USA" },
  { name: "American Sociological Association", initials: "ASA" },
  { name: "Clarksville-Montgomery County School System", initials: "CMCSS" },
  { name: "Miami-Dade County Public School", initials: "MDCPS" },
  { name: "Highland Community College", initials: "HCC" },
  { name: "Rockford Public Schools", initials: "RPS" },
];

export function Organizations() {
  return (
    <section className="section-padding overflow-hidden" data-testid="section-organizations">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm" data-testid="text-org-subtitle">Trusted By</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6" data-testid="text-org-title">
            Organizations We've{" "}
            <span className="text-gradient">Worked With</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg" data-testid="text-org-description">
            From universities to school districts, we've partnered with leading 
            educational institutions to transform lives.
          </p>
        </motion.div>

        <div className="relative group">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent cursor-grab active:cursor-grabbing snap-x snap-mandatory">
            <div className="flex gap-6 px-6 min-w-max">
              {organizations.map((org, index) => (
                <motion.div
                  key={`${org.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex-shrink-0 snap-center"
                >
                  <div 
                    className="w-40 h-40 rounded-lg bg-card border border-border flex flex-col items-center justify-center p-6 hover-elevate active-elevate-2 transition-all duration-300"
                    data-testid={`org-card-${org.initials.toLowerCase()}-${index}`}
                  >
                    <span className="text-2xl md:text-3xl font-bold text-muted-foreground">
                      {org.initials}
                    </span>
                    <span className="text-xs text-center text-muted-foreground mt-3">
                      {org.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
