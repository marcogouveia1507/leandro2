import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Formulario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    experiencia: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se nome completo tem nome e sobrenome
    const nomeParts = formData.nomeCompleto.trim().split(" ");
    if (nomeParts.length < 2) {
      alert("Por favor, digite seu nome completo (nome e sobrenome)");
      return;
    }

    // Redirecionar para página de confirmação
    navigate("/confirmacao");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-playfair font-bold text-4xl md:text-5xl mb-6">
              <span className="text-white">Sua jornada na dança</span>
              <span className="text-gold"> começa aqui!</span>
            </h1>
            <p className="text-white/80 text-xl">
              Preencha o formulário abaixo e em breve entraremos em contato para
              agendar sua aula teste gratuita.
            </p>
          </div>

          <div className="bg-gray-850 border border-gold/30 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome Completo */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gold/30 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                  placeholder="Digite seu nome e sobrenome"
                />
                <p className="text-white/60 text-sm mt-1">
                  Digite nome e sobrenome
                </p>
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Telefone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gold/30 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                  placeholder="(45) 99999-9999"
                />
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gold/30 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                  placeholder="seu@email.com"
                />
              </div>

              {/* Data de Nascimento */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Data de Nascimento <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gold/30 text-white focus:border-gold focus:outline-none"
                />
              </div>

              {/* Experiência com dança */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Experiência com dança <span className="text-red-500">*</span>
                </label>
                <select
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gold/30 text-white focus:border-gold focus:outline-none"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="primeira-vez">1ª Vez</option>
                  <option value="ja-dancei">
                    Já dancei, mas estou parada(o)
                  </option>
                  <option value="outra-escola">
                    Danço em outra escola/academia, mas quero conhecer
                  </option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gold text-black py-4 rounded-lg font-bold text-lg hover:bg-gold/90 transition-colors btn-shimmer-gold btn-enhanced"
              >
                Enviar Formulário
              </button>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-white/60">
              Todas as informações são confidenciais e usadas apenas para
              contato.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
