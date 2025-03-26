
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppHealth from "./components/dashboard/AppHealth";
import AnomalyResolution from "./components/dashboard/AnomalyResolution";
import TeamScorecard from "./components/dashboard/TeamScorecard";
import FinopsCenter from "./components/dashboard/FinopsCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/finops-center" element={<FinopsCenter />}/>
            <Route path="/" element={<Index />} />
            <Route path="/app-health" element={<AppHealth />} />
            <Route path="/anomaly-resolution" element={<AnomalyResolution />} />
            <Route path="/team-scorecard" element={<TeamScorecard />} />

          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
