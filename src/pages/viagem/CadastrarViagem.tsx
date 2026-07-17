import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import motoristaCadastrar from "../../assets/motorista-cadastrar.jpg";
import { 
  FaCarSide, 
  FaArrowRight, 
  FaUserPlus, 
  FaLocationDot, 
  FaMapPin, 
  FaCoins, 
  FaTags,
  FaComments,
  FaShieldHalved,
  FaCalendarDays
} from "react-icons/fa6";
import Toast from "../../utils/Toast";
import { AuthContext } from "../../contexts/AuthContext";
import { cadastrar, buscar } from "../../services/Service";
import type { Viagem } from "../../models/Viagem";
import type { Modalidade } from "../../models/Modalidade";

export function CadastrarViagem() {
  const navigate = useNavigate();
  
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (!token) {
      Toast("Você precisa estar logado.", "info");
      navigate("/");
    }
  }, [token, navigate]);

  // Estados do Formulário
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [preco, setPreco] = useState("");
  
  const [dataPartida, setDataPartida] = useState("");
  const [horarioPartida, setHorarioPartida] = useState("");
  
  const [modalidades, setModalidades] = useState<Modalidade[]>([]);
  const [modalidadeId, setModalidadeId] = useState<number>(0);

  // Buscar modalidades do banco de dados
  async function buscarModalidades() {
    try {
      await buscar("/modalidades", setModalidades, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      console.error("Erro ao carregar modalidades:", error);
      Toast("Erro ao carregar as modalidades do sistema.", "info");
    }
  }

  useEffect(() => {
    if (token) {
      buscarModalidades();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuario.id) {
      Toast("Usuário inválido. Faça login novamente.", "info");
      navigate("/");
      return;
    }

    if (!modalidadeId) {
      Toast("Por favor, selecione uma modalidade!", "info");
      return;
    }

    if (!dataPartida || !horarioPartida) {
      Toast("Por favor, preencha a data e o horário da partida!", "info");
      return;
    }

    const tokenFormatado = token.startsWith("Bearer") ? token : `Bearer ${token}`;

    const novaViagem: Viagem = {
      id: 0,
      origem: origem.trim(),
      destino: destino.trim(),
      preco: parseFloat(preco),
      status: "Disponível",
      previsaoSaida: `${dataPartida}T${horarioPartida}:00`, 
      previsaoChegada: `${dataPartida}T${horarioPartida}:00`,
      usuario: {
        id: usuario.id,
      } as any,
      modalidade: {
        id: modalidadeId,
      } as any,
    };

    try {
      console.log("Enviando para a API:", novaViagem);

      await cadastrar(
        "/viagens", 
        novaViagem, 
        () => {}, 
        {
          headers: {
            Authorization: tokenFormatado,
          },
        }
      );

      Toast("Sua oferta de carona foi publicada com sucesso!", "sucesso");
      navigate("/");
    } catch (error: any) {
      console.error("Detalhe completo da falha:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        Toast("Sessão expirada. Faça login novamente.", "info");
        navigate("/");
      } else {
        Toast("Não foi possível conectar com o servidor para cadastrar a carona.", "info");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[radial-gradient(circle_at_center,_var(--color-ultrasonic-blue-800),_var(--color-ultrasonic-blue-950))] text-white px-4 py-8 md:px-12 md:py-16 flex justify-center items-start">
        <div className="max-w-7xl w-full flex flex-col gap-12 lg:gap-16">
          
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center w-full">
            
            {/* LADO ESQUERDO: O Formulário de Publicação (Visual de Vidro) */}
            <div className="flex-1 w-full bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col justify-between">
              <div className="space-y-2 mb-6">
                <span className="text-ultrasonic-blue-300 font-bold tracking-wider text-xs uppercase">Rachou Condutor</span>
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">Publicar Oferta de Carona</h1>
                <p className="text-ultrasonic-blue-100 text-sm md:text-base">Preencha os dados do trajeto para compartilhar os custos.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  {/* CAMPO DE DATA E HORÁRIO BRASILEIRO REESTILIZADO SEM BUGS */}
                  <div className="space-y-1.5 flex flex-col justify-end">
                    <label className="text-sm font-semibold text-white flex items-center gap-2">
                      <FaCalendarDays className="text-white text-base" /> Data de Partida
                    </label>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <input
                        type="date"
                        required
                        value={dataPartida}
                        onChange={(e) => setDataPartida(e.target.value)}
                        className="w-full px-3 py-3 rounded-xl border border-ultrasonic-blue-400/30 bg-slate-950/60 text-white focus:outline-none focus:border-ultrasonic-blue-400 focus:ring-1 focus:ring-ultrasonic-blue-400 transition-all duration-200 [&::-webkit-calendar-picker-indicator]:invert cursor-pointer text-sm"
                      />
                      <input
                        type="time"
                        required
                        value={horarioPartida}
                        onChange={(e) => setHorarioPartida(e.target.value)}
                        className="w-full px-3 py-3 rounded-xl border border-ultrasonic-blue-400/30 bg-slate-950/60 text-white focus:outline-none focus:border-ultrasonic-blue-400 focus:ring-1 focus:ring-ultrasonic-blue-400 transition-all duration-200 [&::-webkit-calendar-picker-indicator]:invert cursor-pointer text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-semibold text-white flex items-center gap-2">
                      <FaTags className="text-ultrasonic-blue-400" /> Modalidade
                    </label>
                    <select
                      required
                      value={modalidadeId}
                      onChange={(e) => setModalidadeId(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-ultrasonic-blue-400/30 bg-slate-950/60 text-white focus:outline-none focus:border-ultrasonic-blue-400 focus:ring-1 focus:ring-ultrasonic-blue-400 transition-all duration-200"
                    >
                      <option value={0} disabled className="bg-slate-900 text-slate-400">Selecione uma modalidade</option>
                      {modalidades.map((mod) => (
                        <option key={mod.id} value={mod.id} className="bg-slate-900 text-white">
                          {mod.nome}
                        </option>
                      ))}
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

            {/* LADO DIREITO: Foto do Motorista Atualizada */}
            <div className="flex-1 w-full">
              <img
                src={motoristaCadastrar}
                alt="Motorista pronto para iniciar o cadastro do trajeto"
                className="w-full h-64 md:h-96 lg:h-[550px] object-cover rounded-3xl shadow-2xl border border-ultrasonic-blue-400/50"
              />
            </div>
          </div>

          {/* SEÇÕES INFORMATIVAS */}
          <div className="bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 md:p-12 rounded-3xl shadow-2xl w-full text-center space-y-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Ofereça sua carona em poucos minutos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300"><FaUserPlus className="text-2xl" /></div>
                <h3 className="text-lg font-bold text-white">Complete seu perfil</h3>
                <p className="text-ultrasonic-blue-100/70 text-sm">Adicione uma foto nítida e algumas informações sobre você.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300"><FaCarSide className="text-2xl" /></div>
                <h3 className="text-lg font-bold text-white">Publique seu trajeto</h3>
                <p className="text-ultrasonic-blue-100/70 text-sm">Indique os pontos de partida, destino e defina o valor por assento.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300"><FaArrowRight className="text-2xl" /></div>
                <h3 className="text-lg font-bold text-white">Aceite reservas</h3>
                <p className="text-ultrasonic-blue-100/70 text-sm">Confirme as reservas de passageiros interessados e economize.</p>
              </div>
            </div>
          </div>

          <div className="bg-ultrasonic-blue-200/10 backdrop-blur-xl border border-ultrasonic-blue-400/50 p-8 md:p-12 rounded-3xl shadow-2xl w-full text-center space-y-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Estamos aqui a cada passo do caminho</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300"><FaComments className="text-2xl" /></div>
                <h3 className="text-lg font-bold text-white">À sua disposição 24/7</h3>
                <p className="text-ultrasonic-blue-100/70 text-sm">Nossa equipe está à disposição para esclarecer dúvidas a qualquer momento.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300"><FaCarSide className="text-2xl" /></div>
                <h3 className="text-lg font-bold text-white">Rachou ao seu lado</h3>
                <p className="text-ultrasonic-blue-100/70 text-sm">Oferecemos dicas regulares para maximizar suas chances de receber pedidos.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-ultrasonic-blue-900/30 border border-ultrasonic-blue-400/35 rounded-full text-ultrasonic-blue-300"><FaShieldHalved className="text-2xl" /></div>
                <h3 className="text-lg font-bold text-white">Informação 100% segura</h3>
                <p className="text-ultrasonic-blue-100/70 text-sm">Seus dados estão protegidos por monitoramento robusto e criptografia.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default CadastrarViagem;