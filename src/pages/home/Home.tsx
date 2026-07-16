import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import passageirosHome from "../../assets/passageiros-home.jpeg"; // Importando a nova imagem
import avaliacoesImg from "../../assets/avaliacoes.png"; // Importando a imagem de avaliações
import motoristaHome2 from "../../assets/motorista-home2.png"; // Importando a nova imagem do motorista
import { SearchModal } from "../../components/modal/VerCarona";
import { CaronaText } from "../../components/caronatext/CaronaText";
import { FaCarSide, FaSuitcase, FaCoins, FaShieldHalved, FaArrowRight } from "react-icons/fa6";

function Home() {
  const navigate = useNavigate();
  // Estado para controlar a abertura do modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    // O gradiente agora cobre a tela inteira de ponta a ponta
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--color-ultrasonic-blue-800),_var(--color-ultrasonic-blue-950))] text-white px-4 py-8 md:px-12 md:py-16 flex justify-center items-start">
      
      {/* Container mestre que alinha perfeitamente as laterais de todas as seções */}
      <div className="max-w-7xl w-full flex flex-col gap-10 md:gap-12 lg:gap-16">
        
        {/* 1. SEÇÃO PRINCIPAL (HERO) */}
        <div className="bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 md:p-16 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full">
          {/* Coluna de Texto */}
          <div className="flex-1 w-full space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              Compartilhe trajetos,
              <br />
              <span className="text-ultrasonic-blue-300">divida custos.</span>
            </h1>

            <p className="text-ultrasonic-blue-100 text-base md:text-lg lg:text-xl leading-relaxed max-w-lg">
              O <strong>Rachou</strong> conecta motoristas e passageiros para
              viagens mais econômicas, inteligentes e colaborativas.
            </p>
            
            <CaronaText />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-ultrasonic-blue-500 hover:bg-ultrasonic-blue-400 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 text-center text-lg"
              >
                Ver Caronas
              </button>

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
            <img
              src={passageirosHome}
              alt="Passageiros no carro compartilhando carona"
              className="w-full h-64 md:h-96 lg:h-[500px] object-cover rounded-2xl shadow-xl border border-ultrasonic-blue-600/20"
            />
          </div>
        </div>

        {/* 2. SEÇÃO DE CTA (OFERECE UMA CARONA) */}
        <div className="bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 md:p-12 rounded-3xl text-center flex flex-col items-center justify-center space-y-6 shadow-2xl w-full">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Ofereça uma carona. Corte seus custos.
          </h2>
          
          <p className="text-ultrasonic-blue-100 text-sm md:text-base max-w-2xl leading-relaxed">
            Ofereça caronas como condutor e transforme seus lugares vazios em menor custo de viagem. 
            É simples: compartilhe sua viagem e encontre passageiros para dividir as despesas de combustível e pedágio.
          </p>

          <button
            onClick={() => navigate("/cadastrarviagem")}
            className="flex items-center gap-2 bg-ultrasonic-blue-500 hover:bg-ultrasonic-blue-400 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-ultrasonic-blue-500/20 text-lg animate-pulse"
          >
            <FaCarSide className="text-lg" />
            Oferecer carona
            <FaArrowRight className="text-xs ml-1" />
          </button>
        </div>

        {/* 3. SEÇÃO DE BENEFÍCIOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 w-full">
          
          {/* Card 1 */}
          <div className="bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 rounded-3xl shadow-xl flex flex-col items-start space-y-4">
            <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300">
              <FaSuitcase className="text-2xl" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              Viaje para qualquer lugar
            </h3>
            <p className="text-ultrasonic-blue-100/80 text-sm md:text-base leading-relaxed">
              Explore o Brasil inteiro com uma enorme variedade de destinos e inúmeras caronas prontas para te levar onde você precisa.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 rounded-3xl shadow-xl flex flex-col items-start space-y-4">
            <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300">
              <FaCoins className="text-2xl" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              Viagens com preços baixos
            </h3>
            <p className="text-ultrasonic-blue-100/80 text-sm md:text-base leading-relaxed">
              Não importa para onde você vai, encontre a viagem perfeita entre nossos vários destinos e trajetos, todos com preços que cabem no seu bolso.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 rounded-3xl shadow-xl flex flex-col items-start space-y-4">
            <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300">
              <FaShieldHalved className="text-2xl" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              Confie em quem viaja com você
            </h3>
            <p className="text-ultrasonic-blue-100/80 text-sm md:text-base leading-relaxed">
              Para nós, é muito importante conhecer nossos usuários. Conferimos avaliações, perfis e documentações, assim você sempre sabe com quem vai viajar.
            </p>
          </div>

        </div>

        {/* 4. SEÇÃO DE AVALIAÇÕES */}
        <div className="bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full">
          {/* Coluna da Imagem de Avaliações */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <img
              src={avaliacoesImg}
              alt="Celular mostrando a tela de avaliações do aplicativo"
              className="w-full h-64 md:h-80 lg:h-[400px] object-cover rounded-2xl shadow-xl border border-ultrasonic-blue-600/20"
            />
          </div>

          {/* Coluna de Texto de Avaliações */}
          <div className="flex-1 w-full space-y-6 order-1 lg:order-2">
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-white">
              Avaliações Automáticas.
              <br />
              <span className="text-ultrasonic-blue-300">Mais viagens confiáveis.</span>
            </h2>

            <p className="text-ultrasonic-blue-100 text-sm md:text-base lg:text-lg leading-relaxed">
              Estamos lançando as Avaliações Automáticas para tornar os perfis mais justos e precisos. 
              Se nenhuma avaliação for deixada após 14 dias, caronas bem-sucedidas recebem 5 estrelas para recompensar os ótimos membros. 
              Cancelamentos de última hora ou não comparecimentos receberão 1 estrela, exceto na primeira vez. 
              Assim, os perfis ficam mais precisos para que você possa reservar com mais confiança!
            </p>
          </div>
        </div>

        {/* 5. NOVA SEÇÃO: DEPOIMENTO / ECONOMIA DE GASOLINA (IMAGEM À DIREITA) */}
        <div className="bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full pb-12">
          {/* Coluna de Texto */}
          <div className="flex-1 w-full space-y-6">
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-white">
              R$ 2000 por ano
              <br />
              <span className="text-ultrasonic-blue-300">só de gasolina!</span>
            </h2>

            <p className="text-ultrasonic-blue-100/90 text-sm md:text-base lg:text-lg leading-relaxed italic">
              "O Rachou mudou tudo para mim. Minha viagem de rotina de 180 km custava R$95 só de gasolina. 
              Agora, com o Rachou, eu recupero cerca de R$75 em cada viagem. Fazendo isso duas vezes por mês, 
              economizo quase R$2000 por ano só de gasolina!"
            </p>
            
            <div className="pt-2">
              <p className="font-bold text-white text-base md:text-lg">Larissa, 30 anos</p>
              <p className="text-ultrasonic-blue-300 text-sm md:text-base">Viagem recorrente: São Paulo para Ubatuba</p>
            </div>
          </div>

          {/* Coluna da Imagem (Motorista na direita) */}
          <div className="flex-1 w-full">
            <img
              src={motoristaHome2}
              alt="Motorista sorrindo de óculos escuros encostado no carro"
              className="w-full h-64 md:h-80 lg:h-[400px] object-cover rounded-2xl shadow-xl border border-ultrasonic-blue-600/20"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;