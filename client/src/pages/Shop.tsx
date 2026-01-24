import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Shop() {
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
            <Card key={product.id} className="overflow-hidden flex flex-col hover-elevate" data-testid={`card-product-${product.id}`}>
              <div className="h-64 overflow-hidden bg-muted">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  data-testid={`img-product-${product.id}`}
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-xl" data-testid={`text-product-name-${product.id}`}>{product.name}</CardTitle>
                  <span className="font-bold text-lg" data-testid={`text-product-price-${product.id}`}>${product.price}</span>
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pt-6">
                <Button 
                  className="w-full" 
                  asChild 
                  data-testid={`button-purchase-${product.id}`}
                >
                  <a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Buy Now
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
