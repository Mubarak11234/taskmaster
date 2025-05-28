
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { DarkModeProvider } from "./hooks/useDarkMode";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Payments from "./pages/Payments";
import AddService from "./pages/AddService";
import NotFound from "./pages/NotFound";
import ProviderServices from "./pages/ProviderServices"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DarkModeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/add-service" element={<AddService />} />
               <Route path="/provider/:providerId" element={<ProviderServices />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </DarkModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
