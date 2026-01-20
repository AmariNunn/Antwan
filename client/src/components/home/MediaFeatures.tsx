import { motion } from "framer-motion";

const mediaLogos = [
  { name: "NBC", initial: "NBC" },
  { name: "CBS", initial: "CBS" },
  { name: "ESPN", initial: "ESPN" },
  { name: "Sports Illustrated", initial: "SI" },
  { name: "Sporting News", initial: "SN" },
];

export function MediaFeatures() {
  return (
    <section className="py-16 border-y border-border/50 bg-card/50" data-testid="section-media">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium" data-testid="text-media-title">
            As Seen On
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {mediaLogos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-center"
              data-testid={`media-logo-${logo.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="px-6 py-3 rounded-md bg-muted/50 border border-border/50">
                <span className="text-lg md:text-xl font-bold text-muted-foreground tracking-wider">
                  {logo.initial}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
