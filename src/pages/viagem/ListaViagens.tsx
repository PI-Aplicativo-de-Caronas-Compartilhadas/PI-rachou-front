import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPen, FaCheck, FaXmark, FaCar, FaMotorcycle } from "react-icons/fa6";

// Caronas fictícias ajustadas para conter modalidade padrão
const caronasMockPadrao = [
  {
    id: "mock-1",
    origem: "São Paulo",
    destino: "Campinas",
    preco: "R$ 35,00",
    motorista: "Rodrigo Silva",
    modalidade: "Carro", // Adicionado modalidade
    dataObj: (() => {
      const d = new Date();
      d.setHours(18, 30, 0, 0);
      return d;
    })(),
    horario: "Hoje às 18:30",
    vagas: "3 vagas",
    isMock: true,
  },
  {
    id: "mock-2",
    origem: "Rio de Janeiro",
    destino: "Niterói",
    preco: "R$ 15,00",
    motorista: "Beatriz Costa",
    modalidade: "Moto", // Adicionado modalidade
    dataObj: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      d.setHours(8, 0, 0, 0);
      return d;
    })(),
    horario: "Amanhã às 08:00",
    vagas: "1 vaga", // Geralmente moto é 1 vaga
    isMock: true,
  },
  {
    id: "mock-3",
    origem: "Belo Horizonte",
    destino: "Ouro Preto",
    preco: "R$ 40,00",
    motorista: "Gabriel Souza",
    modalidade: "Carro", // Adicionado modalidade
    dataObj: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 2);
      d.setHours(14, 0, 0, 0);
      return d;
    })(),
    horario: "18 de Julho às 14:00",
    vagas: "4 vagas",
    isMock: true,
  }
];

function ListaViagens() {
  const [caronas, setCaronas] = useState<any[]>([]);
  
  const [idEditando, setIdEditando] = useState<string | null>(null);
  const [precoEditado, setPrecoEditado] = useState("");
  const [vagasEditadas, setVagasEditadas] = useState("");

  const carregarCaronas = () => {
    const salvasRaw = localStorage.getItem("rachou_caronas");
    const caronasSalvas = salvasRaw ? JSON.parse(salvasRaw) : [];

    const caronasSalvasFormatadas = caronasSalvas.map((carona: any) => {
      let dataFormatada = carona.data;
      let dataObj = new Date(carona.data);

      // Se a data do localStorage for inválida, cria uma data padrão atual
      if (isNaN(dataObj.getTime())) {
        dataObj = new Date();
      } else {
        try {
          dataFormatada = dataObj.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
          });
        } catch (e) {
          console.error("Erro ao formatar data", e);
        }
      }

      return {
        id: carona.id,
        origem: carona.origem,
        destino: carona.destino,
        preco: `R$ ${parseFloat(carona.preco).toFixed(2).replace(".", ",")}`,
        precoOriginal: carona.preco, 
        motorista: "Você (Motorista)",
        modalidade: carona.modalidade || "Carro", // Recupera a modalidade cadastrada (padrão é "Carro" se não houver)
        dataObj: dataObj, // Guardado para fazer a ordenação
        horario: dataFormatada,
        vagas: `${carona.vagas} vagas`,
        vagasOriginal: carona.vagas, 
        isMock: false,
      };
    });

    // 1. Mesclar todas as caronas (Reais + Mocks)
    const todasCaronas = [...caronasSalvasFormatadas, ...caronasMockPadrao];

    // 2. Ordenar de forma crescente (a viagem com a data mais próxima/antiga vem primeiro)
    todasCaronas.sort((a, b) => a.dataObj.getTime() - b.dataObj.getTime());

    setCaronas(todasCaronas);
  };

  useEffect(() => {
    carregarCaronas();
  }, []);

  const handleDeletar = (id: string) => {
    const confirmar = window.confirm("Deseja realmente remover esta oferta de carona?");
    if (!confirmar) return;

    const salvasRaw = localStorage.getItem("rachou_caronas");
    if (salvasRaw) {
      const caronasSalvas = JSON.parse(salvasRaw);
      const novaLista = caronasSalvas.filter((carona: any) => carona.id !== id);
      localStorage.setItem("rachou_caronas", JSON.stringify(novaLista));
      carregarCaronas();
    }
  };

  const iniciarEdicao = (carona: any) => {
    setIdEditando(carona.id);
    setPrecoEditado(carona.precoOriginal);
    setVagasEditadas(carona.vagasOriginal.toString());
  };

  const cancelarEdicao = () => {
    setIdEditando(null);
    setPrecoEditado("");
    setVagasEditadas("");
  };

  const salvarEdicao = (id: string) => {
    const salvasRaw = localStorage.getItem("rachou_caronas");
    if (salvasRaw) {
      const caronasSalvas = JSON.parse(salvasRaw);
      
      const novaLista = caronasSalvas.map((carona: any) => {
        if (carona.id === id) {
          return {
            ...carona,
            preco: precoEditado,
            vagas: vagasEditadas
          };
        }
        return carona;
      });

      localStorage.setItem("rachou_caronas", JSON.stringify(novaLista));
      cancelarEdicao();
      carregarCaronas();
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-12 text-slate-100 min-h-[80vh]">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[oklch(76.31%_0.097_283.87)] tracking-tight">
              Caronas Disponíveis
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              Encontre um trajeto compartilhado ou ofereça uma carona para rachar os custos.
            </p>
          </div>
          <Link
            to="/cadastrarviagem"
            className="bg-[oklch(53.13%_0.202_277.03)] hover:bg-[oklch(64.35%_0.151_281.28)] text-white font-bold px-5 py-3 rounded-xl transition-all duration-200 shadow-lg text-center active:scale-95 whitespace-nowrap"
          >
            + Oferecer Carona
          </Link>
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caronas.map((carona) => {
            const editandoEste = idEditando === carona.id;
            const ehMoto = carona.modalidade?.toLowerCase() === "moto";

            return (
              <div 
                key={carona.id}
                className="bg-[oklch(20.20%_0.051_277.68)] border border-[oklch(23.84%_0.118_272.92)] rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-[oklch(53.13%_0.202_277.03)]/50 transition-all duration-300 flex flex-col justify-between gap-5 group relative"
              >
                {/* TOPO DO CARD */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    
                    {/* Linha com Vagas e a Modalidade */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      {/* Badge de Vagas / Modo Edição das Vagas */}
                      {editandoEste ? (
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Editar Vagas</label>
                          <select
                            value={vagasEditadas}
                            onChange={(e) => setVagasEditadas(e.target.value)}
                            className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                          >
                            <option value="1">1 vaga</option>
                            <option value="2">2 vagas</option>
                            <option value="3">3 vagas</option>
                            <option value="4">4 vagas</option>
                          </select>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[oklch(53.13%_0.202_277.03)]/10 text-[oklch(76.31%_0.097_283.87)] px-3 py-1.5 rounded-full border border-[oklch(53.13%_0.202_277.03)]/25 inline-block">
                          {carona.vagas}
                        </span>
                      )}

                      {/* NOVO BADGE: Modalidade (Carro ou Moto) */}
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800/80 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700 inline-flex items-center gap-1.5">
                        {ehMoto ? (
                          <>
                            <FaMotorcycle className="text-xs text-[oklch(76.31%_0.097_283.87)]" /> Moto
                          </>
                        ) : (
                          <>
                            <FaCar className="text-xs text-[oklch(76.31%_0.097_283.87)]" /> Carro
                          </>
                        )}
                      </span>
                    </div>
                    
                    {/* TRAJETO ESTILO BLABLACAR COM LINHA VERTICAL */}
                    <div className="flex flex-col relative pl-6 border-l-2 border-dashed border-slate-600 gap-4 mt-2">
                      <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-400 group-hover:bg-[oklch(76.31%_0.097_283.87)] transition-colors duration-200" />
                      
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Partida</p>
                        <h3 className="text-base sm:text-lg font-bold text-slate-100">
                          {carona.origem}
                        </h3>
                      </div>

                      <span className="absolute -left-[5px] bottom-1.5 w-2 h-2 rounded-full bg-[oklch(76.31%_0.097_283.87)]" />
                      
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Destino</p>
                        <h3 className="text-base sm:text-lg font-bold text-slate-100">
                          {carona.destino}
                        </h3>
                      </div>
                    </div>

                  </div>

                  {/* Preço / Modo Edição do Preço */}
                  <div className="mt-1 shrink-0">
                    {editandoEste ? (
                      <div className="flex flex-col gap-1 items-end">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Editar Preço (R$)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={precoEditado}
                          onChange={(e) => setPrecoEditado(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm text-white w-24 text-right focus:outline-none"
                        />
                      </div>
                    ) : (
                      <span className="text-2xl font-black text-[oklch(76.31%_0.097_283.87)] whitespace-nowrap">
                        {carona.preco}
                      </span>
                    )}
                  </div>
                </div>

                {/* DETALHES (BASE DO CARD) + BOTÕES ALINHADOS À DIREITA */}
                <div className="text-xs sm:text-sm text-slate-400 flex justify-between items-end border-t border-[oklch(23.84%_0.118_272.92)] pt-4">
                  
                  {/* Informações do Motorista e Saída */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <p>
                        Motorista: <span className="text-slate-200 font-semibold">{carona.motorista}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <p>
                        Saída prevista: <span className="text-slate-200 font-medium">{carona.horario}</span>
                      </p>
                    </div>
                  </div>

                  {/* BOTÕES DE EDITAR/EXCLUIR (No canto inferior direito) */}
                  {!carona.isMock && !editandoEste && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => iniciarEdicao(carona)}
                        title="Editar Carona"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-violet-600 hover:text-white text-slate-300 transition-all duration-200"
                      >
                        <FaPen className="text-xs" />
                      </button>
                      <button
                        onClick={() => handleDeletar(carona.id)}
                        title="Excluir Carona"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-300 transition-all duration-200"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  )}

                  {/* BOTÕES DE CONFIRMAR/CANCELAR EDICAO */}
                  {editandoEste && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => salvarEdicao(carona.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors duration-200"
                      >
                        <FaCheck /> Salvar
                      </button>
                      <button
                        onClick={cancelarEdicao}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors duration-200"
                      >
                        <FaXmark /> Cancelar
                      </button>
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}

export default ListaViagens;