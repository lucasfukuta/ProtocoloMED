import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Questionnaire from "./pages/Questionnaire";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { ClientDashboard } from "./pages/ClientDashboard";
import { AuthProvider } from "@/auth/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import DoctorDashboard from "./pages/DoctorDashboard";

const queryClient = new QueryClient();

// [NEW] Placeholder temporário para o dashboard médico.
// Este componente deverá ser movido para um arquivo separado (ex: ./pages/MedicoDashboard.tsx).
const MedicoDashboard = () =>
  <div className="p-8">
    <h1 className="text-3xl font-bold">Dashboard Médico (Em Construção)</h1>
    <p className="text-muted-foreground">O acesso está protegido para o perfil 'doctor'.</p>
  </div>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/questionario" element={<Questionnaire />} />


            {/* Dashboard do Paciente */}
            <Route
              path="/ClientDashboard"
              element={
                <ProtectedRoute requireRole="patient">
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />

            {/* Dashboard do Médico (Usando o Placeholder) */}
            <Route
              path="/DoctorDashboard"
              element={
                <ProtectedRoute requireRole="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;