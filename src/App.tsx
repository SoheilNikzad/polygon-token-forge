
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TokenCreatorPage from "./pages/TokenCreatorPage";
import LaunchpadPage from "./pages/LaunchpadPage";
import ProjectsPage from "./pages/ProjectsPage";
import TokenListingPage from "./pages/TokenListingPage";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/token-creator" element={<TokenCreatorPage />} />
              <Route path="/launchpad" element={<LaunchpadPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/listing" element={<TokenListingPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="bg-muted py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <p>© 2025 PolyLaunch. All rights reserved.</p>
              <p className="mt-2">
                Built for the Polygon network. Not affiliated with Polygon Labs.
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
