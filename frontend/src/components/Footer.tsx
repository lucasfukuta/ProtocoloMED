import { Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-50 py-10 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

                    {/* Lado Esquerdo: Logo e Copyright */}
                    <div className="text-center md:text-left space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">ProtocoloMED</h2>
                        <p className="text-sm text-slate-400">
                            Transformando vidas através da saúde capilar.
                        </p>
                        <p className="text-xs text-slate-500 mt-4">
                            © {new Date().getFullYear()} ProtocoloMED. Todos os direitos reservados.
                        </p>
                    </div>

                    {/* Lado Direito: Contatos */}
                    <div className="flex flex-col items-center md:items-end space-y-3">
                        <h3 className="font-semibold text-lg mb-1">Fale Conosco</h3>

                        <div className="flex items-center gap-2 text-slate-300">
                            <span className="text-sm">(61) 99999-9999</span>
                            <Phone className="h-4 w-4" />
                        </div>

                        <div className="flex items-center gap-2 text-slate-300">
                            <span className="text-sm">contato@protocolomed.com.br</span>
                            <Mail className="h-4 w-4" />
                        </div>

                        <div className="flex items-center gap-2 text-slate-300">
                            <span className="text-sm">Brasilia, DF</span>
                            <MapPin className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}; 