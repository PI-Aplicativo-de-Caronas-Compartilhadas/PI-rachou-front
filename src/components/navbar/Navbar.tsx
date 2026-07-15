import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-[oklch(14.20%_0.051_277.68)] text-white border-b border-[oklch(23.84%_0.118_272.92)] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between gap-8">
        
        {/* LADO ESQUERDO: LOGO DO RACHOU COM ANIMAÇÃO DE CLIQUE E BRILHO */}
        <div className="flex items-center shrink-0">
          <Link 
            to="/" 
            className="flex items-center h-20 overflow-visible transition-all duration-150 hover:brightness-125 active:scale-95 active:opacity-80"
          >
            <img 
              src="/logo.png" 
              alt="Logo Rachou" 
              className="h-32 w-auto object-contain brightness-0 invert -my-6 origin-left" 
            />
          </Link>
        </div>

        {/* CENTRO: BARRA DE PESQUISA (PROCURAR CARONA) */}
        <div className="flex-1 max-w-md mx-auto relative hidden md:block">
          <input
            type="text"
            placeholder="Procurar carona"
            className="w-full bg-[oklch(20.20%_0.051_277.68)] text-white placeholder-[oklch(76.31%_0.097_283.87)] text-sm rounded-full pl-12 pr-4 py-2.5 border border-[oklch(23.84%_0.118_272.92)] focus:outline-none focus:border-[oklch(64.35%_0.151_281.28)] focus:ring-1 focus:ring-[oklch(64.35%_0.151_281.28)] transition-all duration-200"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[oklch(76.31%_0.097_283.87)] pointer-events-none">
            🔍
          </span>
        </div>

        {/* LADO DIREITO: OFERECER CARONA + ENTRAR (SEM EMOTICON) */}
        <div className="flex items-center space-x-6 shrink-0">
          <Link
            to="/cadastrarviagem"
            className="bg-[oklch(53.13%_0.202_277.03)] hover:bg-[oklch(64.35%_0.151_281.28)] text-white text-sm md:text-base font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm"
          >
            Oferecer Carona
          </Link>

          <Link
            to="/login"
            className="hover:bg-[oklch(23.84%_0.118_272.92)] text-[oklch(88.10%_0.048_285.37)] hover:text-white text-sm md:text-base font-semibold px-4 py-2.5 rounded-lg transition-all duration-200"
          >
            Entrar
          </Link>
        </div>

      </div>
    </nav>
  );
}