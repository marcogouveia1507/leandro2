import { useState } from "react";
import {
  ChevronDown,
  Heart,
  Users,
  TrendingUp,
  Sparkles,
  Phone,
  Calendar,
  MapPin,
  Instagram,
  MessageCircle,
  Facebook,
  Plus,
} from "lucide-react";

export default function Index() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>("q1");

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
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
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="#beneficios"
                className="text-white hover:text-gold transition-colors"
              >
                Benefícios
              </a>
              <a
                href="#como-funciona"
                className="text-white hover:text-gold transition-colors"
              >
                Como Funciona
              </a>
              <a
                href="#sobre"
                className="text-white hover:text-gold transition-colors"
              >
                Sobre
              </a>
              <a
                href="#faq"
                className="text-white hover:text-gold transition-colors"
              >
                FAQ
              </a>
            </nav>

            {/* CTA Button */}
            <button className="hidden lg:block bg-gold text-black px-6 py-2 rounded-full font-medium hover:bg-gold/90 transition-colors">
              Aula Teste
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/0cb6e078005d923f117d4f61c48dc0a500816432?width=2880"
            alt="Dance studio background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-hero-gradient"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-20 pt-20">
          <div className="max-w-4xl">
            <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              <span className="text-white">Entre na Dança e Veja a</span>
              <span className="text-gold"> Mudança</span>
              <span className="text-white"> Acontecer em Você</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Recupere sua confiança, alivie o estresse e descubra o prazer de
              se expressar com liberdade — mesmo que seja sua primeira vez
              dançando.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gold text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold/90 transition-colors">
                Quero Minha Aula Teste Agora
              </button>
              <button className="border border-gold/50 text-white px-8 py-4 rounded-full flex items-center gap-2 hover:bg-gold/10 transition-colors">
                Saiba Mais
                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-4">
              <span className="text-white">
                Mais que dança — uma experiência de
              </span>
              <span className="text-gold"> transformação</span>
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="bg-gray-850 border border-gold/20 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-6 h-6 text-gold" fill="currentColor" />
              </div>
              <h3 className="font-bold text-xl mb-4">Ambiente Acolhedor</h3>
              <p className="text-white/70 leading-relaxed">
                Sinta-se segura e à vontade para se expressar sem julgamentos.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gray-850 border border-gold/20 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-6 text-gold" fill="currentColor" />
              </div>
              <h3 className="font-bold text-xl mb-4">
                Comunidade
                <br />
                Amigável
              </h3>
              <p className="text-white/70 leading-relaxed">
                Aqui você se conecta com mulheres que vibram na mesma energia
                que você.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gray-850 border border-gold/20 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-7 h-6 text-gold" />
              </div>
              <h3 className="font-bold text-xl mb-4">
                Do Iniciante ao
                <br />
                Avançado
              </h3>
              <p className="text-white/70 leading-relaxed">
                Passos adaptados para o seu nível, com evolução constante.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-gray-850 border border-gold/20 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-7 h-6 text-gold" />
              </div>
              <h3 className="font-bold text-xl mb-4">Aulas Terapêuticas</h3>
              <p className="text-white/70 leading-relaxed">
                Uma pausa para cuidar de você, corpo e mente, na correria do dia
                a dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-4">
              <span className="text-white">De volta ao espelho com</span>
              <span className="text-gold"> orgulho</span>
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Mulheres de todas as idades e histórias já resgataram sua
              autoestima e bem-estar com nossas aulas. O próximo sorriso pode
              ser o seu.
            </p>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-850 border border-gold/20 rounded-lg p-8 relative">
              <div className="absolute -top-6 -left-6 text-6xl text-gold/20 font-poppins">
                "
              </div>
              <p className="text-white/80 mb-6 relative z-10">
                Nunca imaginei que aos 45 anos eu encontraria tanta alegria na
                dança. O Leandro tem um jeito único de nos fazer sentir capazes.
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/52a65c4a5d32ac5903cf92b250f443edea1543c6?width=96"
                  alt="Mariana"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold">Mariana, 45</h4>
                  <p className="text-gold text-sm">6 meses de aulas</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-850 border border-gold/20 rounded-lg p-8 relative">
              <div className="absolute -top-6 -left-6 text-6xl text-gold/20 font-poppins">
                "
              </div>
              <p className="text-white/80 mb-6 relative z-10">
                Comecei para aliviar o estresse do trabalho e acabei encontrando
                uma nova paixão. As aulas são o ponto alto da minha semana!
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/065ab49d16d3e31758c5f555d9195e9ff52c10bb?width=96"
                  alt="Carla"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold">Carla, 32</h4>
                  <p className="text-gold text-sm">1 ano de aulas</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-850 border border-gold/20 rounded-lg p-8 relative">
              <div className="absolute -top-6 -left-6 text-6xl text-gold/20 font-poppins">
                "
              </div>
              <p className="text-white/80 mb-6 relative z-10">
                Aos 60 anos, achei que era tarde para começar. Que engano! Hoje
                me sinto mais jovem e confiante do que há décadas.
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/dcc78d12a2b410b0b58773e8ada9b0409674698b?width=96"
                  alt="Regina"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold">Regina, 60</h4>
                  <p className="text-gold text-sm">9 meses de aulas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-4">
              <span className="text-white">Seu novo capítulo começa em</span>
              <span className="text-gold"> 3 passos</span>
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-bold text-2xl text-black">1</span>
              </div>
              <h3 className="font-bold text-xl mb-4">
                Envie um oi no WhatsApp
              </h3>
              <p className="text-white/70 mb-6">
                Clique e fale diretamente com nossa equipe.
              </p>
              <div className="flex items-center justify-center gap-2 text-gold">
                <Phone className="w-4 h-4" />
                <span>Conversar agora</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-bold text-2xl text-black">2</span>
              </div>
              <h3 className="font-bold text-xl mb-4">Escolha seu horário</h3>
              <p className="text-white/70 mb-6">
                Flexibilidade para encaixar na sua rotina.
              </p>
              <div className="flex items-center justify-center gap-2 text-gold">
                <Calendar className="w-4 h-4" />
                <span>Ver horários</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-bold text-2xl text-black">3</span>
              </div>
              <h3 className="font-bold text-xl mb-4">
                Venha dançar e se redescobrir
              </h3>
              <p className="text-white/70 mb-6">
                Sinta a energia e veja a mudança acontecer.
              </p>
              <div className="flex items-center justify-center gap-2 text-gold">
                <MapPin className="w-4 h-4" />
                <span>Ver endereço</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Trial Section */}
      <section className="py-20 relative overflow-hidden bg-hero-gradient">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/e46ba3c93eca765d987e7123ecd71fcf56d21158?width=2880"
            alt="Dance studio background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 lg:px-20 text-center">
          {/* Special Offer Badge */}
          <div className="inline-flex items-center bg-gold/20 text-gold px-6 py-2 rounded-full mb-8">
            <span className="font-semibold">
              OFERTA ESPECIAL — ESTA SEMANA APENAS
            </span>
          </div>

          <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6">
            <span className="text-white">Primeira aula teste</span>
            <span className="text-gold"> gratuita</span>
          </h2>

          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
            Dê o primeiro passo sem compromisso e sinta como a dança pode
            transformar sua vida.
          </p>

          {/* Contact Form */}
          <div className="bg-gray-850/80 backdrop-blur-sm border border-gold/30 rounded-xl p-8 max-w-3xl mx-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">
                  Seu nome
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gold/30 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                  placeholder="Digite seu nome"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Seu WhatsApp
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gold/30 text-white placeholder-white/50 focus:border-gold focus:outline-none"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Melhor dia para aula teste
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gold/30 text-white focus:border-gold focus:outline-none">
                    <option value="">Selecione uma opção</option>
                    <option value="seg">Segunda-feira</option>
                    <option value="ter">Terça-feira</option>
                    <option value="qua">Quarta-feira</option>
                    <option value="qui">Quinta-feira</option>
                    <option value="sex">Sexta-feira</option>
                    <option value="sab">Sábado</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-black py-4 rounded-lg font-semibold text-lg hover:bg-gold/90 transition-colors"
              >
                Agendar Minha Aula Teste Agora
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-4">
              <span className="text-white">A energia que você vai</span>
              <span className="text-gold"> sentir</span>
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Veja como cada aula é um espaço para sorrir, se movimentar e
              recarregar suas forças.
            </p>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Gallery Item 1 */}
            <div className="relative rounded-lg overflow-hidden group">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/6a04acdfaf156fe7e2184ac5d83a0ceb99dc1f1e?width=800"
                alt="Aulas de Ballet"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-hero-overlay opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-bold text-xl mb-2">Aulas de Ballet</h3>
                <p className="text-white/80">
                  Elegância e postura em cada movimento
                </p>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="relative rounded-lg overflow-hidden group">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/be54f78fb083f17caf59e258200db7fa1e2ce8a9?width=800"
                alt="Dança Contemporânea"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-hero-overlay opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-bold text-xl mb-2">Dança Contemporânea</h3>
                <p className="text-white/80">
                  Liberdade de expressão através do movimento
                </p>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className="relative rounded-lg overflow-hidden group">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/dfea029b24229ab810a76024515deb1dbc0fcd5e?width=800"
                alt="Dança do Ventre"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-hero-overlay opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-bold text-xl mb-2">Dança do Ventre</h3>
                <p className="text-white/80">
                  Feminilidade e autoconfiança em cada gesto
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Instructor Section */}
      <section id="sobre" className="py-20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-gold/30 rounded-lg"></div>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/32430afda76a0268204be6dc801eb96a8c52e1f2?width=800"
                alt="Leandro Araújo"
                className="relative rounded-lg w-full h-auto"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-4">
                <span className="text-white">Leandro Araújo —</span>
                <span className="text-gold"> seu guia</span>
                <span className="text-white"> nessa jornada</span>
              </h2>
              <div className="w-24 h-1 bg-gold mb-8"></div>

              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Com 17 anos de experiência e centenas de alunas transformadas,
                Leandro combina técnica, paciência e sensibilidade para ajudar
                você a conquistar mais confiança, postura e liberdade.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-black/40 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gold mb-2">17+</div>
                  <div className="text-white/70">Anos de experiência</div>
                </div>
                <div className="bg-black/40 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gold mb-2">500+</div>
                  <div className="text-white/70">Alunas transformadas</div>
                </div>
                <div className="bg-black/40 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gold mb-2">6</div>
                  <div className="text-white/70">Estilos de dança</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gold text-black px-6 py-3 rounded-full font-semibold hover:bg-gold/90 transition-colors">
                  Agende sua aula
                </button>
                <button className="border border-gold/50 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gold/10 transition-colors">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-4">
              <span className="text-white">Perguntas</span>
              <span className="text-gold"> Frequentes</span>
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="border border-gold/20 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion("q1")}
                className="w-full bg-gray-850 px-6 py-4 flex items-center justify-between text-left hover:bg-gray-850/80 transition-colors"
              >
                <h3 className="font-bold text-lg">
                  Nunca dancei antes, posso participar?
                </h3>
                <Plus
                  className={`w-5 h-5 text-gold transition-transform ${activeAccordion === "q1" ? "rotate-45" : ""}`}
                />
              </button>
              {activeAccordion === "q1" && (
                <div className="bg-gray-850/50 px-6 py-4">
                  <p className="text-white/80">
                    Sim! As aulas são adaptadas para iniciantes. Nosso método
                    foi desenvolvido para que qualquer pessoa, independente de
                    experiência prévia, possa aprender e evoluir no seu próprio
                    ritmo.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="border border-gold/20 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion("q2")}
                className="w-full bg-gray-850 px-6 py-4 flex items-center justify-between text-left hover:bg-gray-850/80 transition-colors"
              >
                <h3 className="font-bold text-lg">
                  Quais ritmos vou aprender?
                </h3>
                <Plus
                  className={`w-5 h-5 text-gold transition-transform ${activeAccordion === "q2" ? "rotate-45" : ""}`}
                />
              </button>
              {activeAccordion === "q2" && (
                <div className="bg-gray-850/50 px-6 py-4">
                  <p className="text-white/80">
                    Do Ballet ao Contemporâneo, passando por Danças Urbanas,
                    Dança do Ventre, Ritmos e Alongamento. Você poderá
                    experimentar diferentes estilos e encontrar o que mais
                    combina com você.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="border border-gold/20 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion("q3")}
                className="w-full bg-gray-850 px-6 py-4 flex items-center justify-between text-left hover:bg-gray-850/80 transition-colors"
              >
                <h3 className="font-bold text-lg">
                  Preciso de par para dançar?
                </h3>
                <Plus
                  className={`w-5 h-5 text-gold transition-transform ${activeAccordion === "q3" ? "rotate-45" : ""}`}
                />
              </button>
              {activeAccordion === "q3" && (
                <div className="bg-gray-850/50 px-6 py-4">
                  <p className="text-white/80">
                    Não. Você evolui individualmente e interage no grupo
                    conforme se sentir à vontade. Nossas aulas são focadas no
                    desenvolvimento pessoal e na expressão individual.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="border border-gold/20 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion("q4")}
                className="w-full bg-gray-850 px-6 py-4 flex items-center justify-between text-left hover:bg-gray-850/80 transition-colors"
              >
                <h3 className="font-bold text-lg">E se eu não tiver ritmo?</h3>
                <Plus
                  className={`w-5 h-5 text-gold transition-transform ${activeAccordion === "q4" ? "rotate-45" : ""}`}
                />
              </button>
              {activeAccordion === "q4" && (
                <div className="bg-gray-850/50 px-6 py-4">
                  <p className="text-white/80">
                    A gente cuida disso para você, com paciência e leveza. O
                    ritmo é algo que se desenvolve com a prática, e nosso método
                    foi criado para ajudar qualquer pessoa a encontrar sua
                    musicalidade natural.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden bg-hero-gradient">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/54b187313fb304b71e4b0a609e775e6e564aa343?width=2880"
            alt="Dance studio background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 lg:px-20 text-center">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-8 leading-tight">
            <span className="text-white">
              Você já tem tudo que precisa para começar —
            </span>
            <span className="text-gold"> só falta dar o primeiro passo</span>
          </h2>

          <button className="bg-gold text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-gold/90 transition-colors mb-6">
            Agendar Minha Aula Teste Agora
          </button>

          <p className="text-white/60 text-lg">
            Vagas limitadas. Agende hoje e comece sua transformação.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gold/30 py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                <span className="font-playfair font-bold text-black">LA</span>
              </div>
              <div>
                <h3 className="font-playfair font-bold text-lg text-gold">
                  Leandro Araújo
                </h3>
                <p className="text-xs text-white/70">Estúdio de Dança</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="w-4 h-4 text-gold" />
              <span>Rua das Artes, 123 - Centro</span>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-850 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Instagram className="w-4 h-4 text-gold" />
              </div>
              <div className="w-10 h-10 bg-gray-850 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <MessageCircle className="w-4 h-4 text-gold" />
              </div>
              <div className="w-10 h-10 bg-gray-850 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Facebook className="w-4 h-4 text-gold" />
              </div>
            </div>
          </div>

          <div className="border-t border-gold/10 pt-8 text-center">
            <p className="text-white/50 text-sm">
              © 2023 Estúdio Leandro Araújo. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
