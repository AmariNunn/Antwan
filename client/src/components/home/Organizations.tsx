import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const organizations = [
  { name: "U.S. Army", initials: "USA" },
  { name: "American Sociological Association", initials: "ASA" },
  { name: "Clarksville-Montgomery County School System", initials: "CMCSS" },
  { name: "Miami-Dade County Public School", initials: "MDCPS" },
  { name: "Highland Community College", initials: "HCC" },
  { name: "Rockford Public Schools", initials: "RPS" },
];

export function Organizations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const x = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const currentPositionRef = useRef(0);

  const duplicatedOrgs = [...organizations, ...organizations, ...organizations];
  const itemWidth = 184;
  const totalWidth = organizations.length * itemWidth;

  const startAnimation = async (fromPosition: number) => {
    let normalizedPosition = fromPosition % totalWidth;
    if (normalizedPosition > 0) {
      normalizedPosition = normalizedPosition - totalWidth;
    }
    
    const remainingDistance = -totalWidth - normalizedPosition;
    const fullDuration = 25;
    const remainingDuration = (remainingDistance / totalWidth) * fullDuration;

    await controls.start({
      x: -totalWidth,
      transition: {
        duration: Math.abs(remainingDuration),
        ease: "linear",
      },
    });

    controls.set({ x: 0 });
    currentPositionRef.current = 0;
    
    await controls.start({
      x: -totalWidth,
      transition: {
        duration: fullDuration,
        repeat: Infinity,
        ease: "linear",
      },
    });
  };

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      currentPositionRef.current = latest;
    });
    return () => unsubscribe();
  }, [x]);

  useEffect(() => {
    if (!isHovering && !isDragging) {
      startAnimation(currentPositionRef.current);
    } else {
      controls.stop();
    }
  }, [isHovering, isDragging]);

  const handleDragEnd = () => {
    setIsDragging(false);
    let pos = currentPositionRef.current;
    if (pos < -totalWidth * 2) {
      pos = pos + totalWidth;
      controls.set({ x: pos });
      currentPositionRef.current = pos;
    } else if (pos > 0) {
      pos = pos - totalWidth;
      controls.set({ x: pos });
      currentPositionRef.current = pos;
    }
  };

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

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div 
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setIsDragging(false);
            }}
          >
            <motion.div
              ref={containerRef}
              className="flex gap-6"
              animate={controls}
              style={{ x }}
              drag="x"
              dragConstraints={{ left: -totalWidth * 2, right: 0 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
            >
              {duplicatedOrgs.map((org, index) => (
                <div
                  key={`${org.name}-${index}`}
                  className="flex-shrink-0"
                >
                  <div 
                    className="w-40 h-40 rounded-lg bg-card border border-border flex flex-col items-center justify-center p-6 hover-elevate active-elevate-2 transition-all duration-300 pointer-events-none"
                    data-testid={`org-card-${org.initials.toLowerCase()}-${index}`}
                  >
                    <span className="text-2xl md:text-3xl font-bold text-muted-foreground">
                      {org.initials}
                    </span>
                    <span className="text-xs text-center text-muted-foreground mt-3">
                      {org.name}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
