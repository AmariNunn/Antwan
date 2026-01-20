import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ExternalLink } from "lucide-react";

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
    id: "g5x3fLnLauA",
    title: "Subconscious Teaching",
    source: "Antwon Harris",
    duration: "02:31",
    thumbnail: "https://i.ytimg.com/vi/g5x3fLnLauA/maxresdefault.jpg",
  },
  {
    id: "Y-5lV91T4Js",
    title: "Teacher Tip Tuesday: Representation Matters",
    source: "Antwon Harris",
    duration: "02:21",
    thumbnail: "https://i.ytimg.com/vi/Y-5lV91T4Js/maxresdefault.jpg",
  },
];

export function VideoSection() {
  return (
    <section className="section-padding bg-card/30" data-testid="section-videos">
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

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                data-testid={`link-video-${video.id}`}
              >
                <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      data-testid={`img-video-${video.id}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                        <Play className="w-7 h-7 text-primary-foreground ml-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-2 py-1 rounded bg-black/60 text-white text-xs font-medium" data-testid={`text-video-duration-${video.id}`}>
                        {video.duration}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-2" data-testid={`text-video-source-${video.id}`}>{video.source}</p>
                    <h3 className="font-semibold text-lg flex items-start gap-2" data-testid={`text-video-title-${video.id}`}>
                      {video.title}
                      <ExternalLink className="w-4 h-4 flex-shrink-0 mt-1 opacity-50" />
                    </h3>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
