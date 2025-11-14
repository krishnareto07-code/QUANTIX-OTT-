import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profiles from "./pages/Profiles";
import Browse from "./pages/Browse";
import MyList from "./pages/MyList";
import ContentDetail from "./pages/ContentDetail";
import VideoPlayer from "./pages/VideoPlayer";
import Subscription from "./pages/Subscription";
import Checkout from "./pages/Checkout";
import MoodSearch from "./pages/MoodSearch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/content/:id" element={<ContentDetail />} />
            <Route path="/watch/:id" element={<VideoPlayer />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/checkout/:planId" element={<Checkout />} />
            <Route path="/mood-search" element={<MoodSearch />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
