import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileForm } from "./components/apply/ProfileForm";
import CreateProfile from "./pages/CreateProfile";
import Apply from "./pages/Apply";
import ApplicationConfirmation from "./pages/ApplicationConfirmation";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfileForm initialShowLogin={true} onProfileCreated={() => {}} />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/application-confirmation" element={<ApplicationConfirmation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;