import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot, type Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Formulario from "./pages/Formulario";
import Confirmacao from "./pages/Confirmacao";

// Extend HTMLElement to include our custom _reactRoot property
declare global {
  interface HTMLElement {
    _reactRoot?: Root;
  }
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/confirmacao" element={<Confirmacao />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;

// Prevent multiple root creation during hot module replacement
if (!container._reactRoot) {
  const root = createRoot(container);
  container._reactRoot = root;
  root.render(<App />);
} else {
  container._reactRoot.render(<App />);
}
