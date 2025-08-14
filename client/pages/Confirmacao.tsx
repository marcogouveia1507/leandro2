import { Link } from "react-router-dom";
import { Check, Phone } from "lucide-react";

export default function Confirmacao() {
  const handleWhatsAppContact = () => {
    window.open(
      "https://wa.me/554588029813?text=Oi!%20Eu%20vim%20do%20site%20de%20ritmos.%20Pode%20me%20passar%20mais%20informa%C3%A7%C3%B5es?",
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                <span className="font-playfair font-bold text-black text-xl">
                  LA
                </span>
              </div>
              <div>
                <h1 className="font-playfair font-bold text-xl text-gold">
                  Leandro Araújo
                </h1>
                <p className="text-xs text-white/70">Estúdio de Dança</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-black" />
          </div>

          <h1 className="font-playfair font-bold text-4xl md:text-5xl mb-6">
            <span className="text-gold">Formulário Enviado</span>
            <span className="text-white"> com Sucesso!</span>
          </h1>

          <div className="bg-gray-850 border border-gold/30 rounded-xl p-8 mb-8">
            <h2 className="font-playfair font-bold text-2xl mb-6 text-gold">
              Próximo Passo: Entre em Contato!
            </h2>

            <p className="text-white/80 text-lg mb-8">
              Recebemos suas informações! Para agilizar o processo e agendar sua
              aula teste gratuita, entre em contato conosco pelo WhatsApp agora
              mesmo.
            </p>

            <div className="bg-black/40 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-gold" />
                <span className="font-bold text-xl text-gold">
                  45 8802-9813
                </span>
              </div>
              <p className="text-white/70">
                Clique no botão abaixo para conversar diretamente conosco!
              </p>
            </div>

            <button
              onClick={handleWhatsAppContact}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-3 mb-4"
            >
              <Phone className="w-5 h-5" />
              Conversar no WhatsApp
            </button>

            <p className="text-white/60 text-sm">
              Ao clicar, você será redirecionado para o WhatsApp com uma
              mensagem pré-pronta
            </p>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="inline-block bg-gold text-black px-8 py-3 rounded-full font-semibold hover:bg-gold/90 transition-colors btn-shimmer-gold btn-enhanced"
            >
              Voltar ao Site
            </Link>
          </div>

          <div className="mt-12 text-center">
            <h3 className="font-playfair font-bold text-xl mb-4 text-gold">
              Por que escolher o Estúdio Leandro Araújo?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-gray-850/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-gold">
                  Ambiente Acolhedor
                </h4>
                <p className="text-white/70 text-sm">
                  Espaço seguro e amigável para todas as idades
                </p>
              </div>
              <div className="bg-gray-850/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-gold">
                  Professores Qualificados
                </h4>
                <p className="text-white/70 text-sm">
                  15+ anos de experiência e 1000+ alunas transformadas
                </p>
              </div>
              <div className="bg-gray-850/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-gold">
                  Estilos Diversos
                </h4>
                <p className="text-white/70 text-sm">
                  Músicas latinas, axé e ritmos do momento
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
