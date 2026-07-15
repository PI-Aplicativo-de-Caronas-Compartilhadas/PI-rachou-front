import { Link } from "react-router-dom";
import WeatherWidget from '../weather/WeatherWidget'; // Importando o Widget

export default function Navbar() {
  return (
    <nav className="w-full bg-[oklch(14.20%_0.051_277.68)] text-white border-b border-[oklch(23.84%_0.118_272.92)] sticky top-0 z-50 shadow-md">
      {/* Ajustado: px-4 no mobile para não espremer os cantos, gap menor para evitar empurrar elementos para fora */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-8">
        
        {/* LADO ESQUERDO: LOGO DO RACHOU COM ANIMAÇÃO DE CLIQUE E BRILHO */}
        <div className="flex items-center shrink-0">
          {/* h-16 no mobile e h-20 no desktop */}
          <Link 
            to="/" 
            className="flex items-center h-16 sm:h-20 overflow-visible transition-all duration-150 hover:brightness-125 active:scale-95 active:opacity-80"
          >
            {/* Reduzido proporcionalmente no mobile (h-24 e -my-4) para não vazar */}
            <img 
              src="/logo.png" 
              alt="Logo Rachou" 
              className="h-24 sm:h-32 w-auto object-contain brightness-0 invert -my-4 sm:-my-6 origin-left transition-all" 
            />
          </Link>
        </div>

        {/* CENTRO: BARRA DE PESQUISA (PROCURAR CARONA) */}
        <div className="flex-1 max-w-md mx-auto relative hidden md:block">
          <input
            type="text"
            placeholder="Rachar para onde?"
            className="w-full bg-[oklch(20.20%_0.051_277.68)] text-white placeholder-[oklch(76.31%_0.097_283.87)] text-sm rounded-full pl-12 pr-4 py-2.5 border border-[oklch(23.84%_0.118_272.92)] focus:outline-none focus:border-[oklch(64.35%_0.151_281.28)] focus:ring-1 focus:ring-[oklch(64.35%_0.151_281.28)] transition-all duration-200"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[oklch(76.31%_0.097_283.87)] pointer-events-none">
            🔍
          </span>
        </div>

        {/* WIDGET DE CLIMA INTEGRADO */}
        {/* Escalonado ligeiramente em telas muito pequenas para dar folga ao layout */}
        <div className="shrink-0 scale-90 xs:scale-100 origin-center">
          <WeatherWidget />
        </div>

        {/* LADO DIREITO: OFERECER CARONA + ENTRAR */}
        {/* gap-1.5 para telas pequenas, aumentando até space-x-4/6 em telas maiores */}
        <div className="flex items-center gap-1.5 xs:gap-3 sm:space-x-4 shrink-0">
          <Link
            to="/cadastrarviagem"
            className="bg-[oklch(53.13%_0.202_277.03)] hover:bg-[oklch(64.35%_0.151_281.28)] text-white text-[11px] xs:text-xs sm:text-sm md:text-base font-semibold px-2.5 xs:px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all duration-200 shadow-sm whitespace-nowrap"
          >
            Oferecer Carona
          </Link>

          <Link
            to="/login"
            className="hover:bg-[oklch(23.84%_0.118_272.92)] text-[oklch(88.10%_0.048_285.37)] hover:text-white text-[11px] xs:text-xs sm:text-sm md:text-base font-semibold px-2 xs:px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap"
          >
            Entrar
          </Link>
        </div>

      </div>
    </nav>
  );
}