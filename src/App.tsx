
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TokenCreatorPage from "./pages/TokenCreatorPage";
import LaunchpadPage from "./pages/LaunchpadPage";
import ProjectsPage from "./pages/ProjectsPage";
import TokenListingPage from "./pages/TokenListingPage";
import Navbar from "./components/Navbar";
import TokenFactoryLayout from "./layouts/TokenFactoryLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Root landing page */}
            <Route path="/" element={<Index />} />
            
            {/* Token Factory routes with shared layout */}
            <Route path="/tokenfactory" element={<TokenFactoryLayout />}>
              <Route index element={<Navigate to="/tokenfactory/create" replace />} />
              <Route path="create" element={<TokenCreatorPage />} />
              <Route path="launchpad" element={<LaunchpadPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="listing" element={<TokenListingPage />} />
            </Route>
            
            {/* Legacy routes - redirect to new structure */}
            <Route path="/token-creator" element={<Navigate to="/tokenfactory/create" replace />} />
            <Route path="/launchpad" element={<Navigate to="/tokenfactory/launchpad" replace />} />
            <Route path="/projects" element={<Navigate to="/tokenfactory/projects" replace />} />
            <Route path="/listing" element={<Navigate to="/tokenfactory/listing" replace />} />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
