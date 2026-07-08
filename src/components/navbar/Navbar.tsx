export default function Navbar() {
  return (
    <nav className="w-full bg-[oklch(14.20%_0.051_277.68)] text-white border-b border-[oklch(23.84%_0.118_272.92)] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO DO RACHOU */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🚗</span>
          <span className="text-xl font-bold tracking-wide">
            Rachou<span className="text-[oklch(64.35%_0.151_281.28)]">.</span>
          </span>
        </div>

        {/* LINKS DE NAVEGAÇÃO (Desktop) */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[oklch(88.10%_0.048_285.37)]">
          <a href="/" className="hover:text-white transition-colors duration-200">
            Início
          </a>
          <a href="/viagem" className="hover:text-white transition-colors duration-200">
            Procurar Carona
          </a>
          <a href="/sobre" className="hover:text-white transition-colors duration-200">
            Sobre Nós
          </a>
        </div>

        {/* BOTÃO DE AÇÃO / PERFIL */}
        <div className="flex items-center space-x-4">
          <button className="bg-[oklch(53.13%_0.202_277.03)] hover:bg-[oklch(64.35%_0.151_281.28)] text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-sm">
            Oferecer Carona
          </button>
        </div>

      </div>
    </nav>
  );
}