import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { EnvelopeSimpleIcon, GithubLogoIcon, InstagramLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const { usuario } = useContext(AuthContext);

  const [estaLogado, setEstaLogado] = useState(false);

  const token = usuario.token;

  useEffect(() => {
    if (usuario.token !== "") {
      setEstaLogado(true);
    } else {
      setEstaLogado(false);
    }
  }, [token]);

  return (
    <footer className="w-full bg-[oklch(14.20%_0.051_277.68)] text-[oklch(88.10%_0.048_285.37)] border-t border-[oklch(23.84%_0.118_272.92)]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">

        {/* Grid Principal Alinhado com gap maior (gap-16) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">

          {/* Coluna 1: Sobre o Rachou */}
          <div className="flex flex-col space-y-4">
            <div className="h-12 flex items-center overflow-visible">
              <img
                src="/logo.png"
                alt="Rachou Caronas"
                className="h-38 w-auto object-contain brightness-0 invert -my-8 origin-left"
              />
            </div>
            <p className="text-base text-[oklch(76.31%_0.097_283.87)] leading-relaxed">
              Conectando motoristas e passageiros para compartilhar trajetos de forma prática, econômica e sustentável. Bora rachar essa carona?
            </p>
          </div>

          {/* Coluna 2: Navegação Centralizada */}
          <div className="flex flex-col space-y-4 md:mx-auto">
            <h4 className="text-base font-bold uppercase tracking-wider text-white h-12 flex items-center">
              Navegação
            </h4>
            <ul className="space-y-3 text-base">
              <li>
                {estaLogado ? (
                  <Link to="/viagens" className="hover:text-white transition-colors duration-200 font-medium">
                    Procurar Carona
                  </Link>
                ) : (
                  <Link to="/login" className="hover:text-white transition-colors duration-200 font-medium">
                    Procurar Carona
                  </Link>
                )}
              </li>
              <li>
                <Link to="/sobre" className="hover:text-white transition-colors duration-200 font-medium">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/viagens" className="hover:text-white transition-colors duration-200 font-medium">
                  Caronas Disponíveis
                </Link>
              </li>
              {/* Link externo adicionado com segurança na navegação */}
              
            </ul>
          </div>

          {/* Coluna 3: Redes / Contato */}
          <div className="flex flex-col space-y-4 md:ml-auto w-full max-w-xs">
            <h4 className="text-base font-bold uppercase tracking-wider text-white h-12 flex items-center">
              Contato & Suporte
            </h4>
            <p className="text-base text-[oklch(76.31%_0.097_283.87)]">
              Dúvidas ou sugestões? Fale conosco!
            </p>
            <div className="flex space-x-6 text-2xl pt-1">
              {/* Ícones sociais */}
              <a href="https://linktr.ee/apprachou" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200"><EnvelopeSimpleIcon size={28} /></a>
              <a href="https://linktr.ee/apprachou" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200"><InstagramLogoIcon size={28} /></a>
              <a href="https://linktr.ee/apprachou" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200"><WhatsappLogoIcon size={28} /></a>
              <a href="https://linktr.ee/apprachou" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200"><GithubLogoIcon size={28} /></a>
            </div>

            {/* Linktree em Destaque (Agora reposicionado corretamente dentro da coluna) */}
            <div className="pt-2">
              <a 
                href="https://linktr.ee/apprachou" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 w-full py-3 px-4 bg-[oklch(23.84%_0.118_272.92)] hover:bg-[oklch(53.13%_0.202_277.03)] text-white font-semibold text-sm rounded-xl border border-white/[0.06] hover:border-cyan-500/20 transition-all duration-300 shadow-md hover:shadow-cyan-950/50 active:scale-[0.98] overflow-hidden"
              >
                {/* Efeito sutil de brilho interno ao passar o mouse */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

                {/* SVG Ícone do Linktree */}
                <svg className="w-4 h-4 fill-current text-cyan-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24">
                  <path d="M13.511 5.854l4.249-4.248 1.415 1.414-4.249 4.249h5.074v2H13.51v3.911l4.984 2.877-1 1.732-4.984-2.877v6.088h-2v-6.088l-4.985 2.877-1-1.732 4.985-2.877V9.269H4v-2h5.065L4.825 3.02l1.414-1.414 4.237 4.234V0h3.035v5.854zM12 24a1.484 1.484 0 110-2.967A1.484 1.484 0 0112 24z"/>
                </svg>
                
                <span className="tracking-wide">Nossa Central de Links</span>
              </a>
            </div>
          </div>

        </div>

        {/* Linha Divisória */}
        <hr className="border-[oklch(23.84%_0.118_272.92)] my-8" />

        {/* Direitos Autorais e Créditos */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[oklch(64.35%_0.151_281.28)] space-y-4 md:space-y-0">
          <p>&copy; {currentYear} Rachou Caronas. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">
            Desenvolvido com 💜 <span className="text-white font-semibold">Grupo 04</span>
          </p>
        </div>

      </div>
    </footer>
  );
}