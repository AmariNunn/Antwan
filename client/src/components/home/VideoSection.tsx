import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const controls = useAnimationControls();
  const x = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const currentPositionRef = useRef(0);

  const duplicatedVideos = [...videos, ...videos, ...videos];
  const itemWidth = 440;
  const totalWidth = videos.length * itemWidth;

  const startAnimation = async (fromPosition: number) => {
    let normalizedPosition = fromPosition % totalWidth;
    if (normalizedPosition > 0) {
      normalizedPosition = normalizedPosition - totalWidth;
    }
    
    const remainingDistance = -totalWidth - normalizedPosition;
    const fullDuration = 30;
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
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-card/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-card/30 to-transparent z-10 pointer-events-none" />
          
          <div 
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setIsDragging(false);
            }}
          >
            <motion.div
              className="flex gap-8"
              animate={controls}
              style={{ x }}
              drag="x"
              dragConstraints={{ left: -totalWidth * 2, right: 0 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
            >
              {duplicatedVideos.map((video, index) => (
                <div
                  key={`${video.id}-${index}`}
                  className="flex-shrink-0 w-[400px]"
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block pointer-events-auto"
                    data-testid={`link-video-${video.id}-${index}`}
                    onClick={(e) => {
                      if (isDragging) {
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
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                            <Play className="w-7 h-7 text-primary-foreground ml-1" />
                          </div>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="inline-block px-2 py-1 rounded bg-black/60 text-white text-xs font-medium">
                            {video.duration}
                          </span>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground mb-2">{video.source}</p>
                        <h3 className="font-semibold text-lg flex items-start gap-2">
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
