import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Heart,
  Users,
  TrendingUp,
  Sparkles,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function RitmosMatricula() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>("q1");
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const benefits = [
    {
      icon: Heart,
      title: "Ambiente Acolhedor",
      description: "Sinta-se segura e à vontade para se expressar sem julgamentos."
    },
    {
      icon: Users,
      title: "Comunidade\nAmigável",
      description: "Aqui você se conecta com mulheres que vibram na mesma energia que você."
    },
    {
      icon: TrendingUp,
      title: "Do Iniciante ao\nAvançado",
      description: "Passos adaptados para o seu nível, com evolução constante."
    },
    {
      icon: Sparkles,
      title: "Aulas Terapêuticas",
      description: "Uma pausa para cuidar de você, corpo e mente, na correria do dia a dia."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % benefits.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + benefits.length) % benefits.length);
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

            {/* CTA Button */}
            <Link
              to="/formulario"
              className="bg-gold text-black px-6 py-2 rounded-full font-medium hover:bg-gold/90 transition-colors btn-shimmer-gold btn-enhanced"
            >
              Aula Teste
            </Link>
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
              <span className="text-white">
                <span className="text-gold">Recupere</span> sua confiança,{" "}
                <span className="text-gold">alivie</span> o estresse e{" "}
                <span className="text-gold">descubra</span> o prazer de se
                expressar com liberdade —
              </span>
            </h1>

            <h2 className="font-playfair font-bold text-2xl md:text-3xl text-white mb-8">
              mesmo que seja sua primeira vez dançando.
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/formulario"
                className="bg-gold text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold/90 transition-colors text-center btn-shimmer-gold btn-enhanced"
              >
                Quero Minha Aula Teste Agora
              </Link>
              <a
                href="#beneficios"
                className="border border-gold/50 text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gold/10 transition-colors"
              >
                Saiba Mais
                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </a>
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

          {/* Benefits Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="bg-gray-850 border border-gold/20 rounded-lg p-8 text-center mx-auto max-w-sm">
                        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                          <IconComponent 
                            className={`${benefit.icon === Heart ? 'w-6 h-6' : benefit.icon === Users ? 'w-8 h-6' : 'w-7 h-6'} text-gold`} 
                            fill={benefit.icon === Heart || benefit.icon === Users ? "currentColor" : "none"}
                          />
                        </div>
                        <h3 className="font-bold text-xl mb-4 whitespace-pre-line">
                          {benefit.title}
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gold/20 hover:bg-gold/30 text-gold p-2 rounded-full transition-colors"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gold/20 hover:bg-gold/30 text-gold p-2 rounded-full transition-colors"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 gap-2">
              {benefits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-gold' : 'bg-gold/30'
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
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
                Simplesmente amo essa escola!! Meu momento de paz! Faço as aulas
                de ritmos, alongamento e o Ballet adulto! Lugar aconchegante e
                com energia boa! 🖤🖤
              </p>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                  <span className="font-bold text-black text-lg">C</span>
                </div>
                <div>
                  <h4 className="font-bold">Cris Zanellatto</h4>
                </div>
              </div>

              {/* Google Rating - Below customer name */}
              <div className="flex justify-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fa78e05a011444c0fac36018284a8b3fc%2F8721fe7758474857a6f10fba8fb3c76b?format=webp&width=800"
                  alt="Google Avaliações"
                  className="h-10"
                />
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-850 border border-gold/20 rounded-lg p-8 relative">
              <div className="absolute -top-6 -left-6 text-6xl text-gold/20 font-poppins">
                "
              </div>
              <p className="text-white/80 mb-6 relative z-10">
                Professores incríveis, aulas maravilhosas! Ambiente super
                acolhedor. Recomendo!!!!
              </p>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                  <span className="font-bold text-black text-lg">T</span>
                </div>
                <div>
                  <h4 className="font-bold">Thays Duarte Araujo</h4>
                </div>
              </div>

              {/* Google Rating - Below customer name */}
              <div className="flex justify-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fa78e05a011444c0fac36018284a8b3fc%2F8721fe7758474857a6f10fba8fb3c76b?format=webp&width=800"
                  alt="Google Avaliações"
                  className="h-10"
                />
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-850 border border-gold/20 rounded-lg p-8 relative">
              <div className="absolute -top-6 -left-6 text-6xl text-gold/20 font-poppins">
                "
              </div>
              <p className="text-white/80 mb-6 relative z-10">
                Ótimo ambiente! Profissionais excelente. Aula de alongamento
                maravilhosa super relaxante e necessário para quem precisa de
                alongamento.
              </p>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                  <span className="font-bold text-black text-lg">C</span>
                </div>
                <div>
                  <h4 className="font-bold">Cleia Witte</h4>
                </div>
              </div>

              {/* Google Rating - Below customer name */}
              <div className="flex justify-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fa78e05a011444c0fac36018284a8b3fc%2F8721fe7758474857a6f10fba8fb3c76b?format=webp&width=800"
                  alt="Google Avaliações"
                  className="h-10"
                />
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
              <p className="text-white/70">
                Clique e fale diretamente com nossa equipe.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-bold text-2xl text-black">2</span>
              </div>
              <h3 className="font-bold text-xl mb-4">Escolha seu horário</h3>
              <p className="text-white/70">
                Flexibilidade para encaixar na sua rotina.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-bold text-2xl text-black">3</span>
              </div>
              <h3 className="font-bold text-xl mb-4">
                Venha dançar e se redescobrir
              </h3>
              <p className="text-white/70">
                Sinta a energia e veja a mudança acontecer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Trial Section */}
      <section className="py-20 relative overflow-hidden bg-hero-gradient">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fa78e05a011444c0fac36018284a8b3fc%2Fc1af0b9b13dd4fe9ba5b52d3b687c936?format=webp&width=800"
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

          {/* CTA Section */}
          <div className="bg-gray-850/80 backdrop-blur-sm border border-gold/30 rounded-xl p-8 max-w-2xl mx-auto text-center">
            <h3 className="font-playfair font-bold text-2xl mb-4 text-gold">
              Pronta para começar?
            </h3>
            <p className="text-white/80 mb-8">
              Preencha nosso formulário rápido e agende sua aula teste gratuita!
            </p>
            <Link
              to="/formulario"
              className="inline-block bg-gold text-black px-12 py-4 rounded-lg font-bold text-lg hover:bg-gold/90 transition-colors btn-shimmer-gold btn-enhanced"
            >
              Agendar Minha Aula Teste Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section
        className="py-32 relative overflow-hidden"
        style={{
          backgroundImage:
            'url("https://cdn.builder.io/api/v1/image/assets%2Fa78e05a011444c0fac36018284a8b3fc%2F276db5f212f740eb8691fc21a5bbf969?format=webp&width=1920")',
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-4xl mx-auto px-4 lg:px-20 text-center">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-8 text-white leading-tight">
            Ritmos é o resultado de um{" "}
            <span className="text-gold">MIX de músicas e estilos</span> para
            sorrir, gastar calorias e recarregar sua mente!
          </h2>

          <Link
            to="/formulario"
            className="inline-block bg-gold text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-gold/90 transition-colors btn-shimmer-gold btn-enhanced"
          >
            Quero Participar!
          </Link>
        </div>
      </section>

      {/* About Instructor Section */}
      <section id="sobre" className="py-20 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video */}
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-gold/30 rounded-lg"></div>
              <video
                src="https://cdn.builder.io/o/assets%2Fa78e05a011444c0fac36018284a8b3fc%2F6b2ce8e21d6c4729a42243fcba2e3e58?alt=media&token=97df1e23-93bb-41b2-a2b2-49f8ef45ca03&apiKey=a78e05a011444c0fac36018284a8b3fc"
                autoPlay
                loop
                muted
                playsInline
                className="relative rounded-lg w-full h-auto"
              >
                Seu navegador não suporta vídeo.
              </video>
            </div>

            {/* Content */}
            <div>
              <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-4">
                <span className="text-white">Leandro Araújo —</span>
                <span className="text-gold"> seu guia</span>
                <span className="text-white"> nessa jornada</span>
              </h2>
              <div className="w-24 h-1 bg-gold mb-8"></div>

              <div className="text-white/80 text-lg leading-relaxed mb-8">
                <p className="mb-4">
                  Com mais de 17 anos de experiência, Leandro transformou sua
                  paixão pela dança em profissão, explorando modalidades como
                  balé, jazz, ritmos e contemporâneo. Depois de se apresentar em
                  espetáculos e competições, descobriu que sua verdadeira
                  realização estava em ensinar, inspirando pessoas a evoluir e
                  se conectar por meio da dança.
                </p>
                <p>
                  Hoje, à frente do seu estúdio, constrói um espaço onde a
                  técnica se une à expressão e ao crescimento pessoal.
                  <br />
                  <br />
                  Mais do que ensinar passos, busca despertar liberdade,
                  confiança e presença em cada aluno.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-black/40 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gold mb-2">17+</div>
                  <div className="text-white/70">Anos de experiência</div>
                </div>
                <div className="bg-black/40 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gold mb-2">1000+</div>
                  <div className="text-white/70">Alunas transformadas</div>
                </div>
                <div className="bg-black/40 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gold mb-2">5+</div>
                  <div className="text-white/70">Estilos de dança</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/formulario"
                  className="bg-gold text-black px-6 py-3 rounded-full font-semibold hover:bg-gold/90 transition-colors text-center btn-shimmer-gold btn-enhanced"
                >
                  Agende sua aula
                </Link>
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
                    Das Músicas Latinas ao Axé, passando pelos Ritmos do
                    Momento, Funk, Pop e hits atuais. Você poderá experimentar
                    diferentes estilos e encontrar o que mais combina com você.
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
                  Quais idade são aceitas na turma
                </h3>
                <Plus
                  className={`w-5 h-5 text-gold transition-transform ${activeAccordion === "q3" ? "rotate-45" : ""}`}
                />
              </button>
              {activeAccordion === "q3" && (
                <div className="bg-gray-850/50 px-6 py-4">
                  <p className="text-white/80">
                    Todas as idades são aceitas! Tudo o que você precisa é{" "}
                    <strong className="text-white font-semibold">
                      vontade de se mexer!
                    </strong>
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
            src="https://cdn.builder.io/api/v1/image/assets%2Fa78e05a011444c0fac36018284a8b3fc%2Fc1af0b9b13dd4fe9ba5b52d3b687c936?format=webp&width=800"
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

          <Link
            to="/formulario"
            className="inline-block bg-gold text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-gold/90 transition-colors mb-6 btn-shimmer-gold btn-enhanced"
          >
            Agendar Minha Aula Teste Agora
          </Link>

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
            <div>
              <div className="flex items-center gap-3 mb-2">
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
              <p className="text-gold/80 text-sm italic">
                liberte sua dança interior
              </p>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 text-white/70">
              <span>Avenida Paraná, 1268 - Foz do Iguaçu</span>
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
