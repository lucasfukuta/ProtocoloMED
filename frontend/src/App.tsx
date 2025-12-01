import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Questionnaire from "./pages/Questionnaire";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import { ClientDashboard } from "./pages/ClientDashboard";
import { AuthProvider } from "@/auth/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import DoctorDashboard from "./pages/DoctorDashboard";
import Contact from "./pages/Contact";
import UserProfile from "./pages/UserProfile";
import ClientProtocol from "./pages/ClientProtocol";

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
            <Route path="/register" element={<Register />} />
            <Route path="/questionario" element={<Questionnaire />} />
            <Route path="/sobre-nos" element={<AboutUs />} />
            <Route path="/contato" element={<Contact />} />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute requireRole="patient">
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            {/* Dashboard do Paciente */}
            <Route
              path="/ClientDashboard"
              element={
                <ProtectedRoute requireRole="patient">
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protocolo do Cliente */}
            <Route
              path="/ClientProtocol"
              element={
                <ProtectedRoute requireRole="patient">
                  <ClientProtocol />
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