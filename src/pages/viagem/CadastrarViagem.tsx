import { useState } from "react";
import { useNavigate } from "react-router-dom";
import motoristaHome from "../../assets/motorista-home.jpeg";
import { 
  FaCarSide, 
  FaArrowRight, 
  FaUserPlus, 
  FaLocationDot, 
  FaMapPin, 
  FaCoins, 
  FaTags,
  FaComments,
  FaShieldHalved
} from "react-icons/fa6";

export function CadastrarViagem() {
  const navigate = useNavigate();
  
  // Estados do Formulário
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [preco, setPreco] = useState("");
  const [vagas, setVagas] = useState("2");
  const [data, setData] = useState("");
  
  // Iniciado vazio para forçar a escolha da modalidade como placeholder inicial
  const [modalidadeSelecionada, setModalidadeSelecionada] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!modalidadeSelecionada) {
      alert("Por favor, selecione uma modalidade (Carro ou Moto)!");
      return;
    }

    // Criar o objeto da nova carona incluindo a modalidade
    const novaCarona = {
      id: Date.now().toString(),
      origem: origem.trim(),
      destino: destino.trim(),
      preco: parseFloat(preco),
      vagas: parseInt(vagas),
      data: data,
      modalidade: modalidadeSelecionada,
    };

    // Salvar no localStorage
    const caronasSalvas = localStorage.getItem("rachou_caronas");
    const listaCaronas = caronasSalvas ? JSON.parse(caronasSalvas) : [];
    listaCaronas.push(novaCarona);
    localStorage.setItem("rachou_caronas", JSON.stringify(listaCaronas));

    console.log("Carona cadastrada com sucesso:", novaCarona);
    alert("Sua oferta de carona foi publicada com sucesso!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--color-ultrasonic-blue-800),_var(--color-ultrasonic-blue-950))] text-white px-4 py-8 md:px-12 md:py-16 flex justify-center items-start">
      
      {/* Container Mestre Alinhado */}
      <div className="max-w-7xl w-full flex flex-col gap-12 lg:gap-16">
        
        {/* 1. SEÇÃO PRINCIPAL: FORMULÁRIO + FOTO DO MOTORISTA */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center w-full">
          
          {/* LADO ESQUERDO: O Formulário de Publicação (Visual de Vidro) */}
          <div className="flex-1 w-full bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col justify-between">
            <div className="space-y-2 mb-6">
              <span className="text-ultrasonic-blue-300 font-bold tracking-wider text-xs uppercase">Rachou Condutor</span>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
                Publicar Oferta de Carona
              </h1>
              <p className="text-ultrasonic-blue-100 text-sm md:text-base">
                Preencha os dados do trajeto para compartilhar os custos da sua viagem.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Grid de Origem e Destino */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Campo Origem */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-white flex items-center gap-2">
                    <FaLocationDot className="text-ultrasonic-blue-400" /> Origem
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: São Paulo - SP"
                    value={origem}
                    onChange={(e) => setOrigem(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-ultrasonic-blue-400/30 bg-slate-950/60 text-white placeholder-slate-400 focus:outline-none focus:border-ultrasonic-blue-400 focus:ring-1 focus:ring-ultrasonic-blue-400 transition-all duration-200"
                  />
                </div>

                {/* Campo Destino */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-white flex items-center gap-2">
                    <FaMapPin className="text-ultrasonic-blue-400" /> Destino
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Campinas - SP"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-ultrasonic-blue-400/30 bg-slate-950/60 text-white placeholder-slate-400 focus:outline-none focus:border-ultrasonic-blue-400 focus:ring-1 focus:ring-ultrasonic-blue-400 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Grid de Preço, Data, Vagas e Modalidades */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Preço */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-white flex items-center gap-2">
                    <FaCoins className="text-ultrasonic-blue-400" /> Preço por vaga
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-ultrasonic-blue-400/30 bg-slate-950/60 text-white placeholder-slate-400 focus:outline-none focus:border-ultrasonic-blue-400 focus:ring-1 focus:ring-ultrasonic-blue-400 transition-all duration-200"
                  />
                </div>

                {/* Data e Hora */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-white">Data de Partida</label>
                  <input
                    type="datetime-local"
                    required
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-ultrasonic-blue-400/30 bg-slate-950/60 text-white placeholder-slate-400 focus:outline-none focus:border-ultrasonic-blue-400 focus:ring-1 focus:ring-ultrasonic-blue-400 transition-all duration-200 [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>

                {/* Vagas */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-white">Vagas Disponíveis</label>
                  <select
                    value={vagas}
                    onChange={(e) => setVagas(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-ultrasonic-blue-400/30 bg-slate-950/60 text-white focus:outline-none focus:border-ultrasonic-blue-400 focus:ring-1 focus:ring-ultrasonic-blue-400 transition-all duration-200"
                  >
                    <option value="1" className="bg-slate-900 text-white">1 vaga</option>
                    <option value="2" className="bg-slate-900 text-white">2 vagas</option>
                    <option value="3" className="bg-slate-900 text-white">3 vagas</option>
                    <option value="4" className="bg-slate-900 text-white">4 vagas</option>
                  </select>
                </div>

                {/* SETOR: Modalidades com Placeholder Desabilitado */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-white flex items-center gap-2">
                    <FaTags className="text-ultrasonic-blue-400" /> Modalidade
                  </label>
                  <select
                    required
                    value={modalidadeSelecionada}
                    onChange={(e) => setModalidadeSelecionada(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border border-ultrasonic-blue-400/30 bg-slate-950/60 focus:outline-none focus:border-ultrasonic-blue-400 focus:ring-1 focus:ring-ultrasonic-blue-400 transition-all duration-200 ${
                      modalidadeSelecionada === "" ? "text-slate-400" : "text-white"
                    }`}
                  >
                    <option value="" disabled className="bg-slate-900 text-slate-400">
                      Modalidade
                    </option>
                    <option value="Carro" className="bg-slate-900 text-white">Carro</option>
                    <option value="Moto" className="bg-slate-900 text-white">Moto</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-ultrasonic-blue-500 hover:bg-ultrasonic-blue-400 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-ultrasonic-blue-500/20 text-lg flex items-center justify-center gap-2"
              >
                <FaCarSide /> Cadastrar Trajeto
              </button>
            </form>
          </div>

          {/* LADO DIREITO: Foto do Motorista */}
          <div className="flex-1 w-full">
            <img
              src={motoristaHome}
              alt="Motoristas sorrindo prontos para iniciar o trajeto"
              className="w-full h-64 md:h-96 lg:h-[550px] object-cover rounded-3xl shadow-2xl border border-ultrasonic-blue-400/50"
            />
          </div>

        </div>

        {/* 2. SEÇÃO INFORMATIVA: "OFEREÇA SUA CARONA EM POUCOS MINUTOS" */}
        <div className="bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 md:p-12 rounded-3xl shadow-2xl w-full text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Ofereça sua carona em poucos minutos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300">
                <FaUserPlus className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-white">Complete seu perfil</h3>
              <p className="text-ultrasonic-blue-100/70 text-sm leading-relaxed">
                Adicione uma foto nítida e algumas informações sobre você para aumentar a confiança entre os membros da comunidade.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300">
                <FaCarSide className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-white">Publique seu trajeto</h3>
              <p className="text-ultrasonic-blue-100/70 text-sm leading-relaxed">
                Indique os pontos de partida e destino, a data e hora, e defina o valor por assento para receber seus primeiros passageiros.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300">
                <FaArrowRight className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-white">Aceite reservas</h3>
              <p className="text-ultrasonic-blue-100/70 text-sm leading-relaxed">
                Avalie os profiles dos passageiros interessados, confirme as reservas e comece a economizar nos custos da sua viagem.
              </p>
            </div>
          </div>
        </div>

        {/* 3. NOVA SEÇÃO INFORMATIVA: "ESTAMOS AQUI A CADA PASSO DO CAMINHO" */}
        <div className="bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 md:p-12 rounded-3xl shadow-2xl w-full text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Estamos aqui a cada passo do caminho
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Item 1 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300">
                <FaComments className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-white">À sua disposição 24/7</h3>
              <p className="text-ultrasonic-blue-100/70 text-sm leading-relaxed">
                Nossa equipe está à sua disposição para esclarecer qualquer dúvida por e-mail ou pelas redes sociais.
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300">
                <FaCarSide className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-white">Rachou ao seu lado</h3>
              <p className="text-ultrasonic-blue-100/70 text-sm leading-relaxed">
                Queremos que você aproveite ao máximo o Rachou. É por isso que oferecemos dicas e lembretes regulares para maximizar suas chances de receber pedidos de reserva de passageiros.
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300">
                <FaShieldHalved className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-white">Informação 100% segura</h3>
              <p className="text-ultrasonic-blue-100/70 text-sm leading-relaxed">
                Nossa equipe é dedicada a proteger seus dados, que são sempre 100% confidenciais graças às ferramentas de monitoramento, navegação segura e dados criptografados.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CadastrarViagem;