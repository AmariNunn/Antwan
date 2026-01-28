import { motion, useMotionValue, useSpring, PanInfo } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

const videos = [
  {
    id: "c33nnhrY9Ek",
    title: "How to Educate Our Youth For The Future",
    source: "Speak Your Success Media",
    duration: "44:49",
    thumbnail: "https://i.ytimg.com/vi/c33nnhrY9Ek/maxresdefault.jpg",
  },
  {
    id: "w4xiZwnrxt8",
    title: "10th Annual Academy Expo: Motivation Coach",
    source: "Eyewitness News WTVO",
    duration: "03:13",
    thumbnail: "https://i.ytimg.com/vi/w4xiZwnrxt8/maxresdefault.jpg",
  },
  {
    id: "mzeKFNJxuTc",
    title: "\"Dreaming Big\" Promo with NBC Affiliate WREX",
    source: "NBC Affiliate WREX",
    duration: "02:00",
    thumbnail: "https://i.ytimg.com/vi/mzeKFNJxuTc/maxresdefault.jpg",
  },
  {
    id: "FlAelrvZi2M",
    title: "Men of Confidence Mentorship PODCAST",
    source: "Men of Confidence",
    duration: "01:00:00",
    thumbnail: "https://i.ytimg.com/vi/FlAelrvZi2M/maxresdefault.jpg",
  },
];

export function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const duplicatedVideos = [...videos, ...videos, ...videos];
  const itemWidth = 432;
  const gap = 32;
  const singleSetWidth = videos.length * (itemWidth + gap);
  
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
    
    const speed = 0.03;
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
    <section className="section-padding bg-card/30 overflow-hidden" data-testid="section-videos">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm" data-testid="text-videos-subtitle">Featured Videos</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6" data-testid="text-videos-title">
            Watch Antwon in{" "}
            <span className="text-gradient">Action</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg" data-testid="text-videos-description">
            Experience the energy and impact of Antwon's keynotes, interviews, 
            and educational content.
          </p>
        </motion.div>

        <div className="relative">
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
              className="flex gap-8 touch-pan-x"
              style={{ x }}
              drag="x"
              dragConstraints={{ left: -singleSetWidth * 3, right: singleSetWidth }}
              dragElastic={0}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
            >
              {duplicatedVideos.map((video, index) => (
                <div
                  key={`${video.id}-${index}`}
                  className="flex-shrink-0 w-[340px] md:w-[400px]"
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block pointer-events-auto"
                    data-testid={`link-video-${video.id}-${index}`}
                    onClick={(e) => {
                      const dragDistance = Math.abs(baseX.get() - dragStartRef.current);
                      if (dragDistance > 10) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500"
                          data-testid={`img-video-${video.id}-${index}`}
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/90 flex items-center justify-center">
                            <Play className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground ml-1" />
                          </div>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                          <span className="inline-block px-2 py-1 rounded bg-black/60 text-white text-xs font-medium">
                            {video.duration}
                          </span>
                        </div>
                      </div>
                      
                      <CardContent className="p-4 md:p-6">
                        <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">{video.source}</p>
                        <h3 className="font-semibold text-base md:text-lg flex items-start gap-2 line-clamp-2">
                          {video.title}
                          <ExternalLink className="w-4 h-4 flex-shrink-0 mt-1 opacity-50" />
                        </h3>
                      </CardContent>
                    </Card>
                  </a>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
