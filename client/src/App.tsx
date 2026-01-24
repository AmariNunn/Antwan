import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import StudentAthlete from "@/pages/StudentAthlete";
import Students from "@/pages/Students";
import Contact from "@/pages/Contact";
import VideoView from "@/pages/VideoView";
import Shop from "@/pages/Shop";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/student-athlete" component={StudentAthlete} />
      <Route path="/students" component={Students} />
      <Route path="/contact" component={Contact} />
      <Route path="/video" component={VideoView} />
      <Route path="/shop" component={Shop} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
