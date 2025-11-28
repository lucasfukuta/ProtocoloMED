import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Importar a imagem do logo como um módulo. Garanta que o arquivo esteja em src/assets/
import Logo from "/LOGO.png";

export const Header = () => {
  return (
    // [CHANGE 1] Adicionado 'relative' para o posicionamento absoluto do logo
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50 relative">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* [CHANGE 2] Dropdown Menu MOVIDO para o início do container flex (Esquerda) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu de navegação</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-48">
            {/* Opções de navegação do Menu (mantidas as classes de visibilidade) */}
            <DropdownMenuItem asChild className="md:hidden">
              <Link to="/login">Login</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/questionario">Anamnese</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/sobre-nos">Sobre Nós</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/login" className="hidden md:block text-sm text-muted-foreground hover:text-foreground">
                Login
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logo Posicionamento Absoluto */}
        <Link
          to="/"
          // Classes para centralização absoluta (50% do pai, depois -50% do próprio tamanho)
          className="flex items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <img
            src={Logo}
            alt="Logo ProtocoloMED"
            className="h-20 w-auto" // Aumento do tamanho (h-10 -> h-16)
          />
        </Link>

        {/* Bloco de Ações/Login (Mantido à Direita) */}
        <div className="flex items-center gap-3">
          {/* Botão Questionário Principal */}
          <Link to="/questionario">
            <Button variant="default" size="lg">
              Questionário
            </Button>
          </Link>

          {/* Link Entrar/Login: Visível apenas em Desktop */}
          <Link to="/login" className="hidden md:block text-sm text-muted-foreground hover:text-foreground">
            Entrar
          </Link>
        </div>
      </div>
    </header>
  );
};