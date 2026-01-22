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
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  if (backgroundImage) {
    return (
      <section 
        ref={ref}
        className="relative min-h-[50vh] lg:min-h-[55vh] flex items-center justify-center overflow-hidden pt-16"
        data-testid="section-page-header"
      >
        <motion.div 
          className="absolute inset-0"
          style={{ y }}
        >
          <motion.div 
            className="absolute inset-0 bg-contain bg-no-repeat"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: `${imagePosition} center`,
              scale
            }}
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
        
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-12 lg:py-16 text-center"
          style={{ opacity }}
        >
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-copper/10 border border-copper/20 mb-4"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse" />
              <span className="text-xs font-medium text-copper uppercase tracking-wider">{subtitle}</span>
            </motion.div>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4"
          >
            {title}
          </motion.h1>
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto"
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
      className="relative min-h-[35vh] lg:min-h-[40vh] flex items-center justify-center overflow-hidden pt-16"
      data-testid="section-page-header"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-primary/5" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-copper/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -15, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-12 lg:py-16 text-center">
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-copper/10 border border-copper/20 mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse" />
            <span className="text-xs font-medium text-copper uppercase tracking-wider">{subtitle}</span>
          </motion.div>
        )}
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4"
        >
          {title}
        </motion.h1>
        
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
