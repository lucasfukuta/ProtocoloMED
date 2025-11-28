import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/auth/AuthProvider";

const Login = () => {
  const { login } = useAuth();
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ role, name: name || undefined, email: email || undefined });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Entrar</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de usuário</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`px-4 py-2 rounded ${role === "patient" ? "bg-primary text-primary-foreground" : "border"}`}
                  onClick={() => setRole("patient")}
                >
                  Paciente
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded ${role === "doctor" ? "bg-primary text-primary-foreground" : "border"}`}
                  onClick={() => setRole("doctor")}
                >
                  Médico
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" />
            </div>

            <div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
