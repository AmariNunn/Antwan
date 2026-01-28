import { motion, useMotionValue, useSpring, PanInfo } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

const organizations = [
  { name: "U.S. Army", initials: "USA" },
  { name: "American Sociological Association", initials: "ASA" },
  { name: "Clarksville-Montgomery County School System", initials: "CMCSS" },
  { name: "Miami-Dade County Public School", initials: "MDCPS" },
  { name: "Highland Community College", initials: "HCC" },
  { name: "Rockford Public Schools", initials: "RPS" },
];

const mediaLogos = [
  { name: "NBC", initial: "NBC" },
  { name: "CBS", initial: "CBS" },
  { name: "ESPN", initial: "ESPN" },
  { name: "Sports Illustrated", initial: "SI" },
  { name: "Sporting News", initial: "SN" },
];

export function Organizations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const duplicatedOrgs = [...organizations, ...organizations, ...organizations];
  const itemWidth = 160;
  const gap = 24;
  const singleSetWidth = organizations.length * (itemWidth + gap);
  
  const baseX = useMotionValue(-singleSetWidth);
  const x = useSpring(baseX, { stiffness: 300, damping: 30, mass: 0.5 });
  
  const wrapPosition = useCallback((pos: number) => {
    let wrapped = pos;
    while (wrapped < -singleSetWidth * 2) wrapped += singleSetWidth;
    while (wrapped > 0) wrapped -= singleSetWidth;
    return wrapped;
  }, [singleSetWidth]);

  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;
    
    const speed = 0.025;
    const currentX = baseX.get();
    let newX = currentX - speed * delta;
    newX = wrapPosition(newX);
    baseX.set(newX);
    
    animationRef.current = requestAnimationFrame(animate);
  }, [baseX, wrapPosition]);

  useEffect(() => {
    if (!isHovering && !isDragging) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering, isDragging, animate]);

  const handleDragStart = () => {
    setIsDragging(true);
    dragStartRef.current = baseX.get();
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const newX = dragStartRef.current + info.offset.x;
    baseX.set(newX);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.x;
    const currentX = baseX.get();
    const projectedX = currentX + velocity * 0.3;
    const wrapped = wrapPosition(projectedX);
    baseX.set(wrapped);
    
    setTimeout(() => setIsDragging(false), 50);
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
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-12" data-testid="text-org-description">
            From universities to school districts, we've partnered with leading 
            educational institutions to transform lives.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-8">
            {mediaLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                data-testid={`media-logo-${logo.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="text-xl md:text-2xl font-bold text-muted-foreground tracking-tighter">
                  {logo.initial}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative mt-12">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div 
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              if (isDragging) setIsDragging(false);
            }}
          >
            <motion.div
              ref={containerRef}
              className="flex gap-6 touch-pan-x"
              style={{ x }}
              drag="x"
              dragConstraints={{ left: -singleSetWidth * 3, right: singleSetWidth }}
              dragElastic={0}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
            >
              {duplicatedOrgs.map((org, index) => (
                <div
                  key={`${org.name}-${index}`}
                  className="flex-shrink-0"
                >
                  <div 
                    className="w-36 h-36 md:w-40 md:h-40 rounded-lg bg-card border border-border flex flex-col items-center justify-center p-4 md:p-6 hover-elevate active-elevate-2 transition-all duration-300 pointer-events-none"
                    data-testid={`org-card-${org.initials.toLowerCase()}-${index}`}
                  >
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold text-muted-foreground">
                      {org.initials}
                    </span>
                    <span className="text-[10px] md:text-xs text-center text-muted-foreground mt-2 md:mt-3 leading-tight">
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
