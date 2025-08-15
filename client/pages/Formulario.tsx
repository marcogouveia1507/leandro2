import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTracking, useTrackForm } from "../hooks/use-tracking";

// Declare global function for Google Ads conversion tracking
declare global {
  interface Window {
    gtag_report_conversion: (url?: string) => boolean;
  }
}

export default function Formulario() {
  const navigate = useNavigate();
  const { getUTMParams, getCampaignInfo, trackConversion } = useTracking();
  const trackFormSubmit = useTrackForm('lead_form');

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    telefone: "",
    email: "",
    dia: "",
    mes: "",
    ano: "",
    experiencia: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to capture URL tracking parameters
  const getTrackingSource = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer || window.location.origin;

    // Extract UTM parameters
    const utmSource = urlParams.get("utm_source") || "";
    const utmMedium = urlParams.get("utm_medium") || "";
    const utmCampaign = urlParams.get("utm_campaign") || "";
    const utmContent = urlParams.get("utm_content") || "";
    const utmTerm = urlParams.get("utm_term") || "";

    // Build tracking URL in the specified format
    if (utmSource || utmMedium || utmCampaign || utmContent || utmTerm) {
      const baseUrl = window.location.origin + window.location.pathname;
      let trackingUrl = baseUrl;

      const params = [];
      if (utmSource) params.push(`utm_source=${utmSource}`);
      if (utmMedium) params.push(`utm_medium=${utmMedium}`);
      if (utmCampaign) params.push(`utm_campaign=${utmCampaign}`);
      if (utmContent) params.push(`utm_content=${utmContent}`);
      if (utmTerm) params.push(`utm_term=${utmTerm}`);

      if (params.length > 0) {
        trackingUrl += "?" + params.join("&");
      }

      return trackingUrl;
    }

    // Fallback: return current URL or referrer info
    return window.location.href;
  };

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation functions
  const validateName = (name: string): string => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return "Nome é obrigatório";
    }
    if (trimmedName.length < 1) {
      return "Nome deve ter pelo menos um caractere";
    }
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return "E-mail é obrigatório";
    }
    if (!emailRegex.test(email)) {
      return "Digite um e-mail válido";
    }
    return "";
  };

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) {
      return "Telefone é obrigatório";
    }

    // Remove all non-numeric characters
    const numericPhone = phone.replace(/\D/g, "");

    if (numericPhone.length < 10 || numericPhone.length > 15) {
      return "Telefone deve ter entre 10 e 15 dígitos";
    }

    // Brazilian phone validation
    if (numericPhone.length === 10 || numericPhone.length === 11) {
      const ddd = parseInt(numericPhone.substring(0, 2));
      if (ddd < 11 || ddd > 99) {
        return "DDD deve estar entre 11 e 99";
      }
    }

    return "";
  };

  const validateDate = (dia: string, mes: string, ano: string): string => {
    if (!dia || !mes || !ano) {
      return "Data de nascimento é obrigatória (dia, mês e ano)";
    }

    const day = parseInt(dia);
    const month = parseInt(mes);
    const year = parseInt(ano);

    // Check if values are valid numbers
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return "Digite apenas números válidos";
    }

    // Validate day
    if (day < 1 || day > 31) {
      return "Dia deve estar entre 1 e 31";
    }

    // Validate month
    if (month < 1 || month > 12) {
      return "Mês deve estar entre 1 e 12";
    }

    // Validate year (reasonable age range)
    const currentYear = new Date().getFullYear();
    if (year < 1900) {
      return "Ano deve ser maior que 1900";
    }
    if (year > currentYear) {
      return "Ano não pode ser futuro";
    }
    if (year > currentYear - 5) {
      return "Idade mínima de 5 anos";
    }

    // Check if date exists (handles leap years, month lengths, etc.)
    const date = new Date(year, month - 1, day);
    if (
      date.getDate() !== day ||
      date.getMonth() !== month - 1 ||
      date.getFullYear() !== year
    ) {
      return "Esta data não existe no calendário";
    }

    // Check if date is not in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date > today) {
      return "Data de nascimento não pode ser futura";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Reset errors
    const newErrors: Record<string, string> = {};

    // Validate all fields
    const nameError = validateName(formData.nomeCompleto);
    if (nameError) newErrors.nomeCompleto = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.telefone);
    if (phoneError) newErrors.telefone = phoneError;

    const dateError = validateDate(formData.dia, formData.mes, formData.ano);
    if (dateError) newErrors.dataNascimento = dateError;

    if (!formData.experiencia) {
      newErrors.experiencia = "Experiência é obrigatória";
    }

    setErrors(newErrors);

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    // Helper function to add UTF-8 BOM to strings
    const addUtf8Bom = (str: string): string => {
      // UTF-8 BOM is EF BB BF, which is represented as \uFEFF in JavaScript
      return "\uFEFF" + str;
    };

    // Store data locally first
    const dataNascimento = `${formData.ano}-${formData.mes.padStart(2, "0")}-${formData.dia.padStart(2, "0")}`;

    const webhookData = {
      nomeCompleto: addUtf8Bom(formData.nomeCompleto.trim()),
      email: addUtf8Bom(formData.email.toLowerCase().trim()),
      telefone: addUtf8Bom(formData.telefone.replace(/\D/g, "")),
      dataNascimento: dataNascimento, // Date field without BOM as requested
      experiencia: addUtf8Bom(formData.experiencia),
      source: addUtf8Bom(getTrackingSource()),
      timestamp: addUtf8Bom(new Date().toISOString()),
    };

    console.log("Form data to submit:", webhookData);

    // Try multiple submission methods
    let submissionSuccess = false;

    // Method 1: Try with normal CORS
    try {
      console.log("Attempting normal fetch...");
      const response = await fetch(
        "https://hooks.zapier.com/hooks/catch/10139071/u6xnafb/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookData),
        },
      );

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (response.ok || response.status === 200) {
        console.log("Submission successful via normal fetch");
        submissionSuccess = true;
      }
    } catch (error) {
      console.log("Normal fetch failed:", error);
    }

    // Method 2: Try with no-cors if first method failed
    if (!submissionSuccess) {
      try {
        console.log("Attempting no-cors fetch...");
        await fetch("https://hooks.zapier.com/hooks/catch/10139071/u6xnafb/", {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookData),
        });

        console.log("No-cors submission completed");
        submissionSuccess = true; // Assume success with no-cors
      } catch (error) {
        console.log("No-cors fetch also failed:", error);
      }
    }

    // Method 3: Try with form data if JSON fails
    if (!submissionSuccess) {
      try {
        console.log("Attempting form data submission...");
        const formData2 = new FormData();
        formData2.append("nomeCompleto", webhookData.nomeCompleto);
        formData2.append("email", webhookData.email);
        formData2.append("telefone", webhookData.telefone);
        formData2.append("dataNascimento", webhookData.dataNascimento);
        formData2.append("experiencia", webhookData.experiencia);
        formData2.append("source", webhookData.source);
        formData2.append("timestamp", webhookData.timestamp);

        await fetch("https://hooks.zapier.com/hooks/catch/10139071/u6xnafb/", {
          method: "POST",
          mode: "no-cors",
          body: formData2,
        });

        console.log("Form data submission completed");
        submissionSuccess = true;
      } catch (error) {
        console.log("Form data submission failed:", error);
      }
    }

    if (submissionSuccess) {
      console.log("Form submitted successfully, redirecting...");
      // Store data in localStorage as backup
      localStorage.setItem("lastFormSubmission", JSON.stringify(webhookData));

      // Track Google Ads conversion
      if (typeof (window as any).gtag_report_conversion === "function") {
        (window as any).gtag_report_conversion();
      }

      navigate("/confirmacao");
    } else {
      console.error("All submission methods failed");
      // Store data locally for retry
      localStorage.setItem(
        "pendingFormSubmission",
        JSON.stringify(webhookData),
      );
      alert(
        "Erro de conexão. Seus dados foram salvos e você pode tentar novamente. Redirecionando...",
      );
      // Still redirect but with saved data
      navigate("/confirmacao");
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric

    // Format Brazilian phone number
    if (value.length <= 11) {
      if (value.length <= 2) {
        value = value;
      } else if (value.length <= 7) {
        value = value.replace(/(\d{2})(\d{1,5})/, "($1) $2");
      } else {
        value = value.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
      }
    }

    // Clear error when user starts typing
    if (errors.telefone) {
      setErrors((prev) => ({ ...prev, telefone: "" }));
    }

    setFormData({
      ...formData,
      telefone: value,
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
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white placeholder-white/50 focus:outline-none ${
                    errors.nomeCompleto
                      ? "border-red-500 focus:border-red-500"
                      : "border-gold/30 focus:border-gold"
                  }`}
                  placeholder="Digite seu nome completo"
                />
                {errors.nomeCompleto && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nomeCompleto}
                  </p>
                )}
                <p className="text-white/60 text-sm mt-1">
                  Digite seu nome completo
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
                  onChange={handlePhoneChange}
                  maxLength={15}
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white placeholder-white/50 focus:outline-none ${
                    errors.telefone
                      ? "border-red-500 focus:border-red-500"
                      : "border-gold/30 focus:border-gold"
                  }`}
                  placeholder="(45) 99999-9999"
                />
                {errors.telefone && (
                  <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>
                )}
                <p className="text-white/60 text-sm mt-1">
                  Formato: (45) 99999-9999 ou internacional
                </p>
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
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white placeholder-white/50 focus:outline-none ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gold/30 focus:border-gold"
                  }`}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Data de Nascimento */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Data de Nascimento <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <input
                      type="number"
                      name="dia"
                      value={formData.dia}
                      onChange={handleChange}
                      min="1"
                      max="31"
                      placeholder="Dia"
                      title="Digite o dia do nascimento (1-31)"
                      className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white placeholder-white/50 focus:outline-none ${
                        errors.dataNascimento
                          ? "border-red-500 focus:border-red-500"
                          : "border-gold/30 focus:border-gold"
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="mes"
                      value={formData.mes}
                      onChange={handleChange}
                      min="1"
                      max="12"
                      placeholder="Mês"
                      title="Digite o mês do nascimento (1-12)"
                      className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white placeholder-white/50 focus:outline-none ${
                        errors.dataNascimento
                          ? "border-red-500 focus:border-red-500"
                          : "border-gold/30 focus:border-gold"
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="ano"
                      value={formData.ano}
                      onChange={handleChange}
                      min="1900"
                      max={new Date().getFullYear() - 5}
                      placeholder="Ano"
                      title="Digite o ano do nascimento"
                      className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white placeholder-white/50 focus:outline-none ${
                        errors.dataNascimento
                          ? "border-red-500 focus:border-red-500"
                          : "border-gold/30 focus:border-gold"
                      }`}
                    />
                  </div>
                </div>
                {errors.dataNascimento && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dataNascimento}
                  </p>
                )}
                <p className="text-white/60 text-sm mt-1">
                  Digite dia, mês e ano de nascimento
                </p>
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
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border text-white focus:outline-none ${
                    errors.experiencia
                      ? "border-red-500 focus:border-red-500"
                      : "border-gold/30 focus:border-gold"
                  }`}
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
                {errors.experiencia && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experiencia}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-colors btn-shimmer-gold btn-enhanced ${
                  isSubmitting
                    ? "bg-gold/50 text-black/50 cursor-not-allowed"
                    : "bg-gold text-black hover:bg-gold/90"
                }`}
              >
                {isSubmitting ? "Enviando..." : "Enviar Formulário"}
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
