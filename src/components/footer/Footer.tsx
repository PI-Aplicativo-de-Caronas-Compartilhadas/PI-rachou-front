export default function Footer() {
  const currentYear = new Date().getFullYear();

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

          {/* Coluna 2: Navegação Centralizada (md:mx-auto garante o posicionamento ao centro) */}
          <div className="flex flex-col space-y-4 md:mx-auto">
            <h4 className="text-base font-bold uppercase tracking-wider text-white h-12 flex items-center">
              Navegação
            </h4>
            <ul className="space-y-3 text-base">
              <li>
                <a href="/viagens" className="hover:text-white transition-colors duration-200 font-medium">
                  Procurar Carona
                </a>
              </li>
              <li>
                <a href="/sobre" className="hover:text-white transition-colors duration-200 font-medium">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Redes / Contato */}
          <div className="flex flex-col space-y-4 md:ml-auto">
            <h4 className="text-base font-bold uppercase tracking-wider text-white h-12 flex items-center">
              Contato & Suporte
            </h4>
            <p className="text-base text-[oklch(76.31%_0.097_283.87)]">
              Dúvidas ou sugestões? Fale conosco!
            </p>
            <div className="flex space-x-6 text-2xl pt-1">
              <a href="#" className="hover:text-white transition-colors duration-200">🌐</a>
              <a href="#" className="hover:text-white transition-colors duration-200">📸</a>
              <a href="#" className="hover:text-white transition-colors duration-200">👔</a>
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