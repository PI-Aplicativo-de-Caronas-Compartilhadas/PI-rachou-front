import { Link } from "react-router-dom";
import WeatherWidget from '../weather/WeatherWidget'; // Importando o Widget
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserCircleIcon, GearIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react";

export default function Navbar() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const [estaLogado, setEstaLogado] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu mobile
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Estado para o dropdown de perfil (desktop)
  const dropdownRef = useRef<HTMLDivElement>(null);

  const token = usuario.token;

  useEffect(() => {
    if (usuario.token !== "") {
      setEstaLogado(true);
    } else {
      setEstaLogado(false);
    }
  }, [token]);

  // Fecha o dropdown de perfil se clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Função para fechar o menu ao clicar em um link
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <nav className="w-full bg-[oklch(14.20%_0.051_277.68)] text-white border-b border-[oklch(23.84%_0.118_272.92)] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-8">
        
        {/* LADO ESQUERDO: LOGO DO RACHOU */}
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

        {/* CENTRO: WIDGET DE CLIMA */}
        <div className="flex-1 flex justify-center shrink-0 scale-90 xs:scale-100 origin-center">
          <WeatherWidget />
        </div>

        {/* LADO DIREITO: NAVEGAÇÃO DESKTOP & MENU RESPONSIVO */}
        <div className="flex items-center space-x-4 sm:space-x-6 shrink-0">
          
          {/* --- LINKS VISÍVEIS APENAS EM DESKTOP (md para cima) --- */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {/* BOTÃO VER CARONAS */}
            <Link
              to="/viagens"
              className="hover:bg-[oklch(23.84%_0.118_272.92)] text-[oklch(88.10%_0.048_285.37)] hover:text-white text-sm lg:text-base font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Ver Caronas
            </Link>

            {/* BOTÃO OFERECER CARONA */}
            <Link
              to={estaLogado ? "/cadastrarviagem" : "/login"}
              className="bg-[oklch(53.13%_0.202_277.03)] hover:bg-[oklch(64.35%_0.151_281.28)] text-white text-sm lg:text-base font-semibold px-4 lg:px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm whitespace-nowrap"
            >
              Oferecer Carona
            </Link>

            {/* BOTÃO MODALIDADES (SE LOGADO) */}
            {estaLogado && (
              <Link
                to="/modalidades"
                className="hover:bg-[oklch(23.84%_0.118_272.92)] text-[oklch(88.10%_0.048_285.37)] hover:text-white text-sm lg:text-base font-semibold px-4 py-2.5 rounded-lg transition-all duration-200"
              >
                Modalidades
              </Link>
            )}
          </div>

          {/* AVATAR DE USUÁRIO / ENTRAR (Com Dropdown elegante integrado) */}
          <div className="relative flex items-center" ref={dropdownRef}>
            {estaLogado ? (
              <div className="relative flex items-center gap-2">
                
                {/* Gatilho do Click para abrir o Dropdown de Perfil */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center focus:outline-none transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  title={usuario.nome}
                >
                  {usuario.foto ? (
                    <img
                      src={usuario.foto}
                      alt={`Foto de ${usuario.nome}`}
                      className="w-10 h-10 rounded-full border-2 border-[oklch(23.84%_0.118_272.92)] hover:border-[oklch(53.13%_0.202_277.03)] object-cover shadow-sm transition-colors"
                    />
                  ) : (
                    <div className="text-[oklch(88.10%_0.048_285.37)] hover:text-white transition-colors">
                      <UserCircleIcon size={34} />
                    </div>
                  )}
                </button>

                {/* --- MENU DROPDOWN FLUTUANTE (Desktop) --- */}
                {isProfileOpen && (
                  <div className="hidden md:block absolute right-0 top-full mt-3 w-52 bg-[oklch(14.20%_0.051_277.68)] border border-[oklch(23.84%_0.118_272.92)] rounded-xl shadow-xl overflow-hidden py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-[oklch(23.84%_0.118_272.92)]/60 mb-1">
                      <p className="text-xs text-[oklch(76.31%_0.097_283.87)] font-medium">Olá,</p>
                      <p className="text-sm font-semibold truncate text-white">{usuario.nome}</p>
                    </div>

                    <Link
                      to="/perfil"
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[oklch(88.10%_0.048_285.37)] hover:text-white hover:bg-[oklch(23.84%_0.118_272.92)] transition-colors font-medium"
                    >
                      <UserIcon size={18} />
                      Meu Perfil
                    </Link>

                    <Link
                      to="/editarperfil"
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[oklch(88.10%_0.048_285.37)] hover:text-white hover:bg-[oklch(23.84%_0.118_272.92)] transition-colors font-medium"
                    >
                      <GearIcon size={18} />
                      Editar Perfil
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors font-semibold text-left border-t border-[oklch(23.84%_0.118_272.92)]/40 mt-1"
                    >
                      <SignOutIcon size={18} />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Antes de logar */
              <Link
                to="/login"
                className="text-[oklch(88.10%_0.048_285.37)] hover:text-white transition-all duration-200 active:scale-95"
                title="Entrar na Conta"
              >
                <UserCircleIcon size={32} />
              </Link>
            )}
          </div>

          {/* BOTÃO DO MENU HAMBÚRGUER (Visível apenas em Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-[oklch(20.20%_0.051_277.68)] transition-all gap-1.5 focus:outline-none"
            aria-label="Abrir Menu"
          >
            <span className={`h-0.5 w-6 bg-white rounded-lg transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 w-6 bg-white rounded-lg transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-6 bg-white rounded-lg transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

        </div>
      </div>

      {/* --- MENU CASCATA RESPONSIVO (MOBILE) --- */}
      {isMenuOpen && (
        <div className="md:hidden w-full bg-[oklch(14.20%_0.051_277.68)] border-t border-[oklch(23.84%_0.118_272.92)] shadow-xl animate-slide-down">
          <div className="flex flex-col px-6 py-4 space-y-4">
            
            {/* Opções visíveis sempre no Mobile */}
            <Link
              to="/viagens"
              onClick={closeMenu}
              className="text-[oklch(88.10%_0.048_285.37)] hover:text-white font-semibold py-2 transition-all border-b border-[oklch(23.84%_0.118_272.92)]/50"
            >
              Ver Caronas
            </Link>

            <Link
              to={estaLogado ? "/cadastrarviagem" : "/login"}
              onClick={closeMenu}
              className="text-[oklch(88.10%_0.048_285.37)] hover:text-white font-semibold py-2 transition-all border-b border-[oklch(23.84%_0.118_272.92)]/50"
            >
              Oferecer Carona
            </Link>

            <Link
              to="/sobre"
              onClick={closeMenu}
              className="text-[oklch(88.10%_0.048_285.37)] hover:text-white font-semibold py-2 transition-all border-b border-[oklch(23.84%_0.118_272.92)]/50"
            >
              Sobre
            </Link>

            {/* Opções extras para mobile caso esteja logado */}
            {estaLogado ? (
              <>
                <Link
                  to="/modalidades"
                  onClick={closeMenu}
                  className="text-[oklch(88.10%_0.048_285.37)] hover:text-white font-semibold py-2 transition-all border-b border-[oklch(23.84%_0.118_272.92)]/50"
                >
                  Modalidades
                </Link>

                {/* MEU PERFIL (MOBILE) */}
                <Link
                  to="/perfil"
                  onClick={closeMenu}
                  className="text-[oklch(88.10%_0.048_285.37)] hover:text-white font-semibold py-2 transition-all border-b border-[oklch(23.84%_0.118_272.92)]/50"
                >
                  Meu Perfil
                </Link>

                {/* EDITAR PERFIL (MOBILE) */}
                <Link
                  to="/editarperfil"
                  onClick={closeMenu}
                  className="text-[oklch(88.10%_0.048_285.37)] hover:text-white font-semibold py-2 transition-all border-b border-[oklch(23.84%_0.118_272.92)]/50"
                >
                  Editar Perfil
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="text-red-400 hover:text-red-300 font-bold py-2 text-left transition-all"
                >
                  Sair do Rachou
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-emerald-400 hover:text-emerald-300 font-bold py-2 transition-all"
              >
                Acessar Conta
              </Link>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}