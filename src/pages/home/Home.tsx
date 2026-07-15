import { Link } from "react-router-dom";
import passageira from "../../assets/passageira-home.jpg";
import { useState } from "react";
import { SearchModal } from "../../components/modal/VerCarona";

function Home() {
  // Estado para controlar a abertura do modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--color-ultrasonic-blue-800),_var(--color-ultrasonic-blue-950))] px-4 py-8 md:px-12 md:py-16 flex items-center justify-center">
      {/* Ajustes:
        - max-w-7xl: Limita a largura máxima em telas grandes para não esticar demais.
        - mx-auto: Centraliza o container.
        - p-8 md:p-16: Aumenta o respiro interno conforme a tela cresce.
      */}
      <div className="bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 md:p-16 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-7xl w-full">
        {/* Coluna de Texto */}
        <div className="flex-1 w-full space-y-6">
          {/* Ajuste de fonte: text-3xl em celular, 5xl em tablets/desktops */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            Compartilhe trajetos,
            <br />
            <span className="text-ultrasonic-blue-300">divida custos.</span>
          </h1>

          <p className="text-ultrasonic-blue-100 text-base md:text-lg lg:text-xl leading-relaxed max-w-lg">
            O <strong>Rachou</strong> conecta motoristas e passageiros para
            viagens mais econômicas, inteligentes e colaborativas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* Botão atualizado para disparar a abertura do modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-ultrasonic-blue-500 hover:bg-ultrasonic-blue-400 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 text-center text-lg"
            >
              Ver Caronas
            </button>

            {/* Chamada do componente modal com a prop necessária */}
            <SearchModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />

            <Link
              to="/sobre"
              className="border border-ultrasonic-blue-500 text-ultrasonic-blue-100 hover:bg-ultrasonic-blue-800/50 font-semibold px-8 py-3 rounded-xl transition-all duration-300 text-center text-lg"
            >
              Sobre Nós
            </Link>
          </div>
        </div>

        {/* Coluna da Imagem */}
        <div className="flex-1 w-full">
          {/* Ajuste de altura responsiva: h-64 em celular, h-96 em tablet, h-[500px] em desktop */}
          <img
            src={passageira}
            alt="Motorista sorrindo"
            className="w-full h-64 md:h-96 lg:h-[500px] object-cover rounded-2xl shadow-xl border border-ultrasonic-blue-600/20"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
