import { motion, useMotionValue } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const currentPositionRef = useRef(0);

  const duplicatedVideos = [...videos, ...videos, ...videos, ...videos, ...videos];
  const itemWidth = 440;
  const totalWidth = videos.length * itemWidth;

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      currentPositionRef.current = latest;
      
      // Seamless infinite loop - wrap position when reaching ends
      if (latest < -totalWidth * 2) {
        const newPos = latest + totalWidth;
        x.set(newPos);
        currentPositionRef.current = newPos;
      } else if (latest > -totalWidth * 0.5) {
        const newPos = latest - totalWidth;
        x.set(newPos);
        currentPositionRef.current = newPos;
      }
    });
    return () => unsubscribe();
  }, [x, totalWidth]);

  // Start in the middle of the loop for seamless scrolling both directions
  useEffect(() => {
    x.set(-totalWidth);
    currentPositionRef.current = -totalWidth;
  }, []);

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = (videoId: string) => {
    if (!isDragging) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
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
          
          <div className="overflow-hidden cursor-grab active:cursor-grabbing">
            <motion.div
              ref={containerRef}
              className="flex gap-8"
              style={{ x }}
              drag="x"
              dragConstraints={{ left: -totalWidth * 3, right: totalWidth }}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
            >
              {duplicatedVideos.map((video, index) => (
                <div
                  key={`${video.id}-${index}`}
                  className="flex-shrink-0 w-[400px]"
                  onDoubleClick={() => handleDoubleClick(video.id)}
                  data-testid={`video-card-${video.id}-${index}`}
                >
                  <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer select-none">
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
                      <p className="text-xs text-muted-foreground mt-2">Double-click to watch</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
