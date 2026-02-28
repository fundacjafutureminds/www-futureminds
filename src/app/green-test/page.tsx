export default function ColorTest() {
  // Sekcja 1: Intensywne, nasycone tła z szumem (blend mode)
  const bgVariants = [
    // Pomarańcze / amber
    { bg: "#FF8C00", label: "Ciemny pomarańcz", text: "#fff" },
    { bg: "#FF6B00", label: "Intensywny pomarańcz", text: "#fff" },
    { bg: "#E8A000", label: "Złoty amber", text: "#3a2800" },
    { bg: "#FFB347", label: "Jasny pomarańcz", text: "#4a2800" },
    // Czerwone / różowe
    { bg: "#DC2626", label: "Czerwony", text: "#fff" },
    { bg: "#E11D48", label: "Malinowy", text: "#fff" },
    { bg: "#FF4081", label: "Hot pink", text: "#fff" },
    { bg: "#F97316", label: "Tangerynowy", text: "#fff" },
    // Fiolety / magenta
    { bg: "#7C3AED", label: "Fiolet", text: "#fff" },
    { bg: "#9333EA", label: "Purpurowy", text: "#fff" },
    { bg: "#C026D3", label: "Magenta", text: "#fff" },
    { bg: "#6D28D9", label: "Ciemny fiolet", text: "#fff" },
    // Niebieskie
    { bg: "#2563EB", label: "Królewski niebieski", text: "#fff" },
    { bg: "#0EA5E9", label: "Sky blue", text: "#fff" },
    { bg: "#1E40AF", label: "Granatowy", text: "#fff" },
    { bg: "#06B6D4", label: "Cyan", text: "#fff" },
    // Zielone
    { bg: "#16A34A", label: "Szmaragdowy", text: "#fff" },
    { bg: "#65A30D", label: "Limonkowy", text: "#fff" },
    { bg: "#0D9488", label: "Teal", text: "#fff" },
    { bg: "#9AFC4E", label: "FM Green", text: "#1a3a00" },
    // Ciepłe ciemne
    { bg: "#92400E", label: "Brązowy amber", text: "#fff" },
    { bg: "#7F1D1D", label: "Bordowy", text: "#fff" },
    { bg: "#1E3A5F", label: "Atramentowy", text: "#fff" },
    { bg: "#334155", label: "Slate ciemny", text: "#fff" },
  ];

  // Sekcja 2: Pełne kombinacje (tło + akcent)
  const combos = [
    { bg: "#ffffff", bgLabel: "Biały szum", accent: "#4A8C2A", accentLabel: "Ciemny zielony", text: "#5a5a5a" },
    { bg: "#ffffff", bgLabel: "Biały szum", accent: "#0F766E", accentLabel: "Szmaragd", text: "#5a5a5a" },
    { bg: "#ffffff", bgLabel: "Biały szum", accent: "#1E40AF", accentLabel: "Granatowy", text: "#5a5a5a" },
    { bg: "#ffffff", bgLabel: "Biały szum", accent: "#7C3AED", accentLabel: "Fiolet", text: "#5a5a5a" },
    { bg: "#F5F0E8", bgLabel: "Kremowy", accent: "#B45309", accentLabel: "Amber ciemny", text: "#4a3f35" },
    { bg: "#F5F0E8", bgLabel: "Kremowy", accent: "#9F1239", accentLabel: "Malinowy", text: "#4a3f35" },
    { bg: "#F5F0E8", bgLabel: "Kremowy", accent: "#3D7A22", accentLabel: "Leśny zielony", text: "#4a3f35" },
    { bg: "#F5F0E8", bgLabel: "Kremowy", accent: "#7C3AED", accentLabel: "Fiolet", text: "#4a3f35" },
    { bg: "#EEF1F6", bgLabel: "Szaro-niebieski", accent: "#1E40AF", accentLabel: "Granatowy", text: "#475569" },
    { bg: "#EEF1F6", bgLabel: "Szaro-niebieski", accent: "#6D28D9", accentLabel: "Ciemny fiolet", text: "#475569" },
    { bg: "#EEF1F6", bgLabel: "Szaro-niebieski", accent: "#0D7377", accentLabel: "Dark teal", text: "#475569" },
    { bg: "#EEF1F6", bgLabel: "Szaro-niebieski", accent: "#DC2626", accentLabel: "Czerwony", text: "#475569" },
    { bg: "#F0EDEB", bgLabel: "Ciepły szary", accent: "#C2410C", accentLabel: "Pomarańcz ciemny", text: "#57534E" },
    { bg: "#F0EDEB", bgLabel: "Ciepły szary", accent: "#0F766E", accentLabel: "Szmaragd", text: "#57534E" },
    { bg: "#F0EDEB", bgLabel: "Ciepły szary", accent: "#7C3AED", accentLabel: "Fiolet", text: "#57534E" },
    { bg: "#F0EDEB", bgLabel: "Ciepły szary", accent: "#1E40AF", accentLabel: "Granatowy", text: "#57534E" },
    { bg: "#ECFDF5", bgLabel: "Miętowy", accent: "#065F46", accentLabel: "Ciemny szmaragd", text: "#3B5249" },
    { bg: "#ECFDF5", bgLabel: "Miętowy", accent: "#1E40AF", accentLabel: "Granatowy", text: "#3B5249" },
    { bg: "#F3F0FF", bgLabel: "Lawendowy", accent: "#5B21B6", accentLabel: "Ciemny fiolet", text: "#4C4069" },
    { bg: "#F3F0FF", bgLabel: "Lawendowy", accent: "#0F766E", accentLabel: "Szmaragd", text: "#4C4069" },
    { bg: "#FFF5F0", bgLabel: "Brzoskwiniowy", accent: "#C2410C", accentLabel: "Pomarańcz ciemny", text: "#5C4033" },
    { bg: "#FFF5F0", bgLabel: "Brzoskwiniowy", accent: "#7C3AED", accentLabel: "Fiolet", text: "#5C4033" },
    { bg: "#F1F1F1", bgLabel: "Neutralny szary", accent: "#334155", accentLabel: "Slate (mono)", text: "#555555" },
    { bg: "#F1F1F1", bgLabel: "Neutralny szary", accent: "#0D7377", accentLabel: "Dark teal", text: "#555555" },
  ];

  return (
    <div style={{ backgroundColor: "#2b2f33", minHeight: "100vh", padding: "40px", fontFamily: "'Geomanist', system-ui, sans-serif" }}>

      {/* === SEKCJA 1: Porównanie teł z szumem === */}
      <h1 style={{ fontSize: "24px", fontWeight: 300, color: "#ccc", marginBottom: "12px" }}>
        1. Szum na różnych tłach (background-blend-mode: multiply)
      </h1>
      <p style={{ fontSize: "14px", fontWeight: 300, color: "#888", marginBottom: "32px" }}>
        Ta sama tekstura szum-lightgrey-1.png — zmienia się tylko background-color pod spodem
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "80px" }}>
        {bgVariants.map((v, i) => (
          <div
            key={i}
            style={{
              backgroundColor: v.bg,
              backgroundImage: "url('/images/szum-lightgrey-1.png')",
              backgroundRepeat: "repeat",
              backgroundBlendMode: "multiply",
              borderRadius: "8px",
              padding: "28px 24px",
              minHeight: "220px",
              display: "flex",
              flexDirection: "column" as const,
              gap: "12px",
            }}
          >
            {/* Etykieta + kolor hex */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "10px", fontWeight: 500, color: v.text, opacity: 0.5, textTransform: "uppercase" as const, letterSpacing: "1.5px" }}>
                {v.label}
              </span>
              <span style={{ fontSize: "10px", fontWeight: 400, color: v.text, opacity: 0.4, fontFamily: "monospace" }}>
                {v.bg}
              </span>
            </div>

            {/* Heading */}
            <h2 style={{ fontSize: "22px", fontWeight: 450, color: v.text, lineHeight: 1.3, margin: 0 }}>
              Łączymy odpowiedzialne firmy z dziećmi
            </h2>

            {/* Body */}
            <p style={{ fontSize: "14px", fontWeight: 200, color: v.text, lineHeight: 1.7, margin: 0, WebkitTextStroke: "0.3px" }}>
              Sukces opiera się na duchu dzielenia się wiedzą, doświadczeniem i możliwościami.
            </p>

            {/* Separator + Więcej */}
            <div style={{ marginTop: "auto", borderTop: `1px solid ${v.text}20`, paddingTop: "12px" }}>
              <span style={{ fontSize: "10px", fontWeight: 300, textTransform: "uppercase" as const, letterSpacing: "2.5px", color: "#9AFC4E" }}>
                Więcej
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* === SEKCJA 2: Bez blend mode (oryginał do porównania) === */}
      <h1 style={{ fontSize: "24px", fontWeight: 300, color: "#ccc", marginBottom: "12px" }}>
        2. Te same tła BEZ blend mode (porównanie)
      </h1>
      <p style={{ fontSize: "14px", fontWeight: 300, color: "#888", marginBottom: "32px" }}>
        Szum nakładany normalnie — widać różnicę szczególnie na kolorowych tłach
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "80px" }}>
        {bgVariants.map((v, i) => (
          <div
            key={`no-blend-${i}`}
            style={{
              backgroundColor: v.bg,
              backgroundImage: "url('/images/szum-lightgrey-1.png')",
              backgroundRepeat: "repeat",
              // BEZ backgroundBlendMode
              borderRadius: "8px",
              padding: "28px 24px",
              minHeight: "220px",
              display: "flex",
              flexDirection: "column" as const,
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "10px", fontWeight: 500, color: v.text, opacity: 0.5, textTransform: "uppercase" as const, letterSpacing: "1.5px" }}>
                {v.label} (no blend)
              </span>
              <span style={{ fontSize: "10px", fontWeight: 400, color: v.text, opacity: 0.4, fontFamily: "monospace" }}>
                {v.bg}
              </span>
            </div>

            <h2 style={{ fontSize: "22px", fontWeight: 450, color: v.text, lineHeight: 1.3, margin: 0 }}>
              Łączymy odpowiedzialne firmy z dziećmi
            </h2>

            <p style={{ fontSize: "14px", fontWeight: 200, color: v.text, lineHeight: 1.7, margin: 0, WebkitTextStroke: "0.3px" }}>
              Sukces opiera się na duchu dzielenia się wiedzą, doświadczeniem i możliwościami.
            </p>

            <div style={{ marginTop: "auto", borderTop: `1px solid ${v.text}20`, paddingTop: "12px" }}>
              <span style={{ fontSize: "10px", fontWeight: 300, textTransform: "uppercase" as const, letterSpacing: "2.5px", color: "#9AFC4E" }}>
                Więcej
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* === SEKCJA 3: Pełne kombinacje tło + akcent (oryginał) === */}
      <h1 style={{ fontSize: "24px", fontWeight: 300, color: "#ccc", marginBottom: "12px" }}>
        3. Kombinacje tło + akcent (z blend mode)
      </h1>
      <p style={{ fontSize: "14px", fontWeight: 300, color: "#888", marginBottom: "32px" }}>
        Oryginalne karty z akcentami kolorystycznymi
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
        {combos.map((c, i) => (
          <div
            key={`combo-${i}`}
            style={{
              backgroundColor: c.bg,
              backgroundImage: "url('/images/szum-lightgrey-1.png')",
              backgroundRepeat: "repeat",
              backgroundBlendMode: "multiply",
              borderRadius: "8px",
              padding: "32px 28px",
              minHeight: "340px",
              display: "flex",
              flexDirection: "column" as const,
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
              <span style={{ fontSize: "10px", fontWeight: 500, color: c.text, opacity: 0.5, textTransform: "uppercase" as const, letterSpacing: "1.5px" }}>
                {c.bgLabel}
              </span>
              <span style={{ display: "inline-block", width: "12px", height: "12px", backgroundColor: c.accent, borderRadius: "50%" }} />
            </div>

            <h2 style={{ fontSize: "26px", fontWeight: 400, color: c.text, lineHeight: 1.2, margin: 0 }}>
              {"Łączymy "}
              <span style={{ color: c.accent }}>odpowiedzialne firmy</span>
              {" z dziećmi"}
            </h2>

            <p style={{ fontSize: "14px", fontWeight: 400, color: c.text, lineHeight: 1.7, margin: 0, opacity: 0.85 }}>
              Sukces opiera się na duchu dzielenia się wiedzą, doświadczeniem i możliwościami.
            </p>

            <div>
              <span style={{ fontSize: "42px", fontWeight: 600, color: c.accent, lineHeight: 1 }}>SPIKE</span>
            </div>

            <div style={{ marginTop: "auto" }}>
              <span style={{
                borderBottom: `1px solid ${c.accent}40`,
                paddingBottom: "6px",
                fontSize: "10px",
                fontWeight: 300,
                textTransform: "uppercase" as const,
                letterSpacing: "2.5px",
                color: c.accent,
              }}>
                Więcej
              </span>
              <span style={{ float: "right", fontSize: "10px", color: c.text, opacity: 0.35 }}>
                {c.accentLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
