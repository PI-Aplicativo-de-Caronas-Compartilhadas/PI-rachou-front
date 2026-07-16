import { Link } from "react-router-dom";
import WeatherWidget from '../weather/WeatherWidget'; // Importando o Widget
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Navbar() {

  const { usuario, handleLogout } = useContext(AuthContext);

  const [ estaLogado, setEstaLogado ] = useState(false);

  const token = usuario.token;

  useEffect(() => {
    if (usuario.token !== "") {
      setEstaLogado(true);
    } else {
      setEstaLogado(false);
    }
  }, [token]);
  
  return (
    <nav className="w-full bg-[oklch(14.20%_0.051_277.68)] text-white border-b border-[oklch(23.84%_0.118_272.92)] sticky top-0 z-50 shadow-md">
      {/* Ajustado: px-4 no mobile para não espremer os cantos, gap menor para evitar empurrar elementos para fora */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-8">
        
        {/* LADO ESQUERDO: LOGO DO RACHOU COM ANIMAÇÃO DE CLIQUE E BRILHO */}
        <div className="flex items-center shrink-0">
          <Link 
            to="/" 
            className="flex items-center h-16 sm:h-20 overflow-visible transition-all duration-150 hover:brightness-125 active:scale-95 active:opacity-80"
          >
            <img 
              src="/logo.png" 
              alt="Logo Rachou" 
              className="h-24 sm:h-32 w-auto object-contain brightness-0 invert -my-4 sm:-my-6 origin-left transition-all" 
            />
          </Link>
        </div>

        {/* CENTRO: WIDGET DE CLIMA (Centralizado no Navbar) */}
        <div className="flex-1 flex justify-center shrink-0 scale-90 xs:scale-100 origin-center">
          <WeatherWidget />
        </div>

        {/* LADO DIREITO: ÍCONE DE BUSCA + OFERECER CARONA + MODALIDADES / LOGIN / SAIR */}
        <div className="flex items-center space-x-4 sm:space-x-6 shrink-0">

          {/* ÍCONE DE LUPA CLICÁVEL (Direciona para a lista de viagens) */}
          <Link
            to="/viagens"
            title="Buscar Caronas"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[oklch(20.20%_0.051_277.68)] hover:bg-[oklch(23.84%_0.118_272.92)] border border-[oklch(23.84%_0.118_272.92)] text-lg transition-all duration-200 active:scale-95"
          >
            🔍
          </Link>
          
          {/* BOTÃO OFERECER CARONA */}
          <Link
            to="/cadastrarviagem"
            className="bg-[oklch(53.13%_0.202_277.03)] hover:bg-[oklch(64.35%_0.151_281.28)] text-white text-[11px] xs:text-xs sm:text-sm md:text-base font-semibold px-2.5 xs:px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all duration-200 shadow-sm whitespace-nowrap"
          >
            Oferecer Carona
          </Link>

          {/* BOTÃO MODALIDADES (SE LOGADO) */}
          {estaLogado && 
            <Link
              to="/modalidades"
              className="hover:bg-[oklch(23.84%_0.118_272.92)] text-[oklch(88.10%_0.048_285.37)] hover:text-white text-[10px] md:text-[14px] font-semibold px-4 py-2.5 rounded-lg transition-all duration-200"
            >
              Modalidades
            </Link>
          }          

          {/* BOTÃO ENTRAR / SAIR */}
          { estaLogado ? (
            <button
              onClick={handleLogout}
              className="hover:bg-red-600/50 text-[oklch(88.10%_0.048_285.37)] hover:text-white hover:cursor-pointer text-[10px] md:text-[14px] font-semibold px-4 py-2.5 rounded-lg transition-all duration-200"
            >
              Sair
            </button>
          ) : (
            <Link
              to="/login"
              className="hover:bg-[oklch(23.84%_0.118_272.92)] text-[oklch(88.10%_0.048_285.37)] hover:text-white text-[10px] xs:text-xs sm:text-sm md:text-[14px] font-semibold px-2 xs:px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Entrar
            </Link>
          )}   

        </div>

      </div>
    </nav>
  );
}