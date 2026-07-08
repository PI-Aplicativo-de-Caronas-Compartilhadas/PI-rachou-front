// Se estiver usando lucide-react ou react-icons, pode importar ícones reais aqui.
// Para manter o exemplo simples e sem dependências extras, usaremos emojis/texto.

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[oklch(14.20%_0.051_277.68)] text-[oklch(88.10%_0.048_285.37)] border-t border-[oklch(23.84%_0.118_272.92)]">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Coluna 1: Sobre o Rachou */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white tracking-wide">
              🚗 Rachou<span className="text-[oklch(64.35%_0.151_281.28)]">.</span>
            </h3>
            <p className="text-sm text-[oklch(76.31%_0.097_283.87)] leading-relaxed">
              Conectando motoristas e passageiros para compartilhar trajetos de forma prática, econômica e sustentável. Bora rachar essa carona?
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors duration-200">Início</a>
              </li>
              <li>
                <a href="/viagem" className="hover:text-white transition-colors duration-200">Procurar Carona</a>
              </li>
              <li>
                <a href="/sobre" className="hover:text-white transition-colors duration-200">Sobre Nós</a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Redes / Contato */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contato & Suporte</h4>
            <p className="text-sm text-[oklch(76.31%_0.097_283.87)]">Dúvidas ou sugestões? Fale conosco!</p>
            <div className="flex space-x-4 text-lg">
              <a href="#" className="hover:text-white transition-colors">🌐</a>
              <a href="#" className="hover:text-white transition-colors">📸</a>
              <a href="#" className="hover:text-white transition-colors">👔</a>
            </div>
          </div>

        </div>

        {/* Linha Divisória */}
        <hr className="border-[oklch(23.84%_0.118_272.92)] my-6" />

        {/* Direitos Autorais e Generation */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[oklch(64.35%_0.151_281.28)] space-y-4 md:space-y-0">
          <p>&copy; {currentYear} Rachou Caronas. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Desenvolvido com 💜 <span className="text-white font-medium">Grupo 04</span>
          </p>
        </div>

      </div>
    </footer>
  );
}