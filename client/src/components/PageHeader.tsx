import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  variant?: "default" | "hero" | "split";
  imagePosition?: string;
}

export function PageHeader({ title, subtitle, description, backgroundImage, variant = "default", imagePosition = "center" }: PageHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  if (variant === "split" && backgroundImage) {
    return (
      <section 
        ref={ref}
        className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center overflow-hidden"
        data-testid="section-page-header"
      >
        <div className="absolute inset-0 bg-background" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              {subtitle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-copper/10 border border-copper/20 mb-6"
                >
                  <div className="w-2 h-2 rounded-full bg-copper animate-pulse" />
                  <span className="text-sm font-medium text-copper uppercase tracking-wider">{subtitle}</span>
                </motion.div>
              )}
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-6 leading-tight"
              >
                {title.split(" ").map((word, i) => (
                  <span key={i}>
                    {i === Math.floor(title.split(" ").length / 2) ? (
                      <span className="text-gradient">{word} </span>
                    ) : (
                      <span>{word} </span>
                    )}
                  </span>
                ))}
              </motion.h1>
              
              {description && (
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
                >
                  {description}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-8 mt-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">10+</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Years</p>
                    <p className="text-muted-foreground">Experience</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-copper/10 flex items-center justify-center">
                    <span className="text-copper font-bold">500+</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Events</p>
                    <p className="text-muted-foreground">Completed</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-copper/20 to-primary/20 rounded-2xl blur-2xl"
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/50">
                  <motion.img
                    src={backgroundImage}
                    alt="Header"
                    className="w-full h-full object-cover object-top"
                    style={{ scale }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent" />
                  
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-copper to-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </div>

                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-copper/10 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full blur-xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
    );
  }

  if (backgroundImage) {
    return (
      <section 
        ref={ref}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20"
        data-testid="section-page-header"
      >
        <motion.div 
          className="absolute inset-0"
          style={{ y }}
        >
          <motion.div 
            className="absolute inset-0 bg-cover bg-no-repeat scale-110"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: `${imagePosition} top`,
              scale
            }}
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
        
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-20 text-center"
          style={{ opacity }}
        >
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-copper font-medium mb-4 tracking-wide uppercase text-sm"
            >
              {subtitle}
            </motion.p>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6"
          >
            {title}
          </motion.h1>
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </section>
    );
  }

  return (
    <section 
      className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20"
      data-testid="section-page-header"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-primary/5" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-copper/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-20 text-center">
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-copper font-medium mb-4 tracking-wide uppercase text-sm"
          >
            {subtitle}
          </motion.p>
        )}
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6"
        >
          {title}
        </motion.h1>
        
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
