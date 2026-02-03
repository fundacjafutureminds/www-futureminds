import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center bg-fm-dark">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #00d084 0%, transparent 50%), radial-gradient(circle at 80% 50%, #8ed1fc 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-32 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fm-green/30 bg-fm-green/10 px-4 py-2 text-sm text-fm-green">
            <Sparkles size={16} />
            <span>Edukacja, innowacje, przyszłość</span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Kształtujemy{" "}
            <span className="text-fm-green">kompetencje przyszłości</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fm-gray-400 md:text-xl">
            Fundacja Future Minds wspiera młodych ludzi w rozwijaniu umiejętności
            technologicznych, kreatywnego myślenia i kompetencji cyfrowych
            niezbędnych w świecie jutra.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/programy-edukacyjne" variant="primary">
              Nasze programy
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button href="/o-nas" variant="outline">
              Poznaj nas
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
            <div>
              <div className="text-3xl font-bold text-fm-green md:text-4xl">
                500+
              </div>
              <div className="mt-1 text-sm text-fm-gray-400">
                Uczestników programów
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-fm-green md:text-4xl">
                15
              </div>
              <div className="mt-1 text-sm text-fm-gray-400">
                Aktywnych projektów
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-fm-green md:text-4xl">
                6
              </div>
              <div className="mt-1 text-sm text-fm-gray-400">
                Lat doświadczenia
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
