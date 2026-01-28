import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, X, Star, TrendingUp, Users, ChevronLeft, ChevronRight, Sparkles, Clock, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const productTestimonials: Record<number, { name: string; comment: string; rating: number }[]> = {
  1: [
    { name: "Marcus T.", comment: "Best hoodie I've ever owned. The quality is incredible!", rating: 5 },
    { name: "Jasmine R.", comment: "Super comfortable and the message means so much to me.", rating: 5 },
    { name: "Devon K.", comment: "Wearing this to every game. My teammates want one too!", rating: 5 },
    { name: "Aaliyah M.", comment: "Perfect fit and the material is premium quality.", rating: 5 },
  ],
  2: [
    { name: "Chris B.", comment: "This tee gets compliments everywhere I go!", rating: 5 },
    { name: "Taylor S.", comment: "Love the design and what it represents. Ordered 3 more!", rating: 5 },
    { name: "Jordan P.", comment: "Perfect for workouts and casual wear. So versatile!", rating: 5 },
    { name: "Maya L.", comment: "The quality surprised me. Worth every penny!", rating: 4 },
  ],
  3: [
    { name: "Coach Williams", comment: "Required reading for my entire team. Life-changing!", rating: 5 },
    { name: "Sarah M.", comment: "Gave this to my son and he can't put it down.", rating: 5 },
    { name: "Dr. Patterson", comment: "A must-read for anyone serious about their future.", rating: 5 },
    { name: "Kevin H.", comment: "This book shifted my entire mindset. Thank you Antwon!", rating: 5 },
  ],
  4: [
    { name: "Emily R.", comment: "My kids absolutely love this book! We read it every night.", rating: 5 },
    { name: "Parent Council", comment: "We bought 50 copies for our school library.", rating: 5 },
    { name: "Mrs. Johnson", comment: "Perfect for teaching kids about believing in themselves.", rating: 5 },
    { name: "David T.", comment: "Beautiful illustrations and powerful message!", rating: 5 },
  ],
  5: [
    { name: "Lisa M.", comment: "My daughter colors in it every day. She loves it!", rating: 5 },
    { name: "Art Teacher", comment: "Using this in my classroom. Kids are engaged!", rating: 5 },
    { name: "Grandma Rose", comment: "Best gift I've given my grandkids this year.", rating: 5 },
    { name: "Michael S.", comment: "Great quality pages and inspiring designs.", rating: 4 },
  ],
};

const productBadges: Record<number, { text: string; icon: "trending" | "popular" | "new" }> = {
  1: { text: "Best Seller", icon: "trending" },
  2: { text: "Fan Favorite", icon: "popular" },
  3: { text: "Top Rated", icon: "trending" },
  4: { text: "New Arrival", icon: "new" },
  5: { text: "Kids Love It", icon: "popular" },
};

const recentPurchases = [
  "Someone in Chicago just purchased!",
  "12 sold in the last 24 hours",
  "A coach in Atlanta just ordered 5!",
  "Trending in your area",
  "Only a few left in stock!",
];

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [recentActivity, setRecentActivity] = useState(0);
  const testimonials = productTestimonials[product.id] || productTestimonials[1];
  const badge = productBadges[product.id] || productBadges[1];

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    const activityInterval = setInterval(() => {
      setRecentActivity((prev) => (prev + 1) % recentPurchases.length);
    }, 3000);

    return () => {
      clearInterval(testimonialInterval);
      clearInterval(activityInterval);
    };
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      data-testid="modal-product-overlay"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-primary/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-product-content"
      >
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
          data-testid="button-modal-close"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square md:aspect-auto bg-muted overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid="img-modal-product"
            />
            <div className="absolute top-4 left-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium"
              >
                {badge.icon === "trending" && <TrendingUp className="w-4 h-4" />}
                {badge.icon === "popular" && <Users className="w-4 h-4" />}
                {badge.icon === "new" && <Sparkles className="w-4 h-4" />}
                {badge.text}
              </motion.div>
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2" data-testid="text-modal-product-name">{product.name}</h2>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary" data-testid="text-modal-product-price">${product.price}</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">(4.9)</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mb-6"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={recentActivity}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="flex items-center gap-2 text-sm text-accent bg-accent/10 px-3 py-2 rounded-lg"
                >
                  <Clock className="w-4 h-4" />
                  {recentPurchases[recentActivity]}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mb-6 leading-relaxed"
              data-testid="text-modal-product-description"
            >
              {product.description}
            </motion.p>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="space-y-2 mb-6"
            >
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Premium quality materials</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Fast & secure shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>100% satisfaction guaranteed</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-muted/50 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">What others are saying</span>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={prevTestimonial} data-testid="button-testimonial-prev">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={nextTestimonial} data-testid="button-testimonial-next">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonialIndex}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm italic">"{testimonials[currentTestimonialIndex].comment}"</p>
                  <p className="text-xs text-muted-foreground">— {testimonials[currentTestimonialIndex].name}</p>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center gap-1 mt-3">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentTestimonialIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-auto"
            >
              <Button
                size="lg"
                className="w-full text-lg py-6"
                asChild
                data-testid="button-modal-purchase"
              >
                <a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Buy Now — ${product.price}
                </a>
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3">
                Secure checkout powered by trusted payment partners
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4" data-testid="text-shop-title">Shop</h1>
        <p className="text-muted-foreground max-w-2xl">
          Get the gear and training you need to excel in your athletic and academic journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))
        ) : (
          products?.map((product) => (
            <Card 
              key={product.id} 
              className="overflow-hidden flex flex-col hover-elevate cursor-pointer group" 
              onClick={() => setSelectedProduct(product)}
              data-testid={`card-product-${product.id}`}
            >
              <div className="h-64 overflow-hidden bg-muted relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  data-testid={`img-product-${product.id}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 text-black px-4 py-2 rounded-full font-medium text-sm">
                      Quick View
                    </div>
                  </div>
                </div>
                {productBadges[product.id] && (
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-1.5 bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs font-medium">
                      {productBadges[product.id].icon === "trending" && <TrendingUp className="w-3 h-3" />}
                      {productBadges[product.id].icon === "popular" && <Users className="w-3 h-3" />}
                      {productBadges[product.id].icon === "new" && <Sparkles className="w-3 h-3" />}
                      {productBadges[product.id].text}
                    </div>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-xl" data-testid={`text-product-name-${product.id}`}>{product.name}</CardTitle>
                  <span className="font-bold text-lg text-primary" data-testid={`text-product-price-${product.id}`}>${product.price}</span>
                </div>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pt-6">
                <Button 
                  className="w-full" 
                  data-testid={`button-purchase-${product.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
