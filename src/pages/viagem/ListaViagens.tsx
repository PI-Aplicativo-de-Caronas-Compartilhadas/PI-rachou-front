import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPen, FaCheck, FaXmark, FaCar, FaMotorcycle, FaPaperPlane, FaTriangleExclamation } from "react-icons/fa6";
import Toast from "../../utils/Toast";

function ListaViagens() {
  const [caronas, setCaronas] = useState<any[]>([]);
  
  const [idEditando, setIdEditando] = useState<string | null>(null);
  const [precoEditado, setPrecoEditado] = useState("");
  const [vagasEditadas, setVagasEditadas] = useState("");
  
  const [origemEditada, setOrigemEditada] = useState("");
  const [destinoEditado, setDestinoEditado] = useState("");

  const [caronaSelecionada, setCaronaSelecionada] = useState<any | null>(null);
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);

  // NOVO: Estado para controlar se o usuário está logado
  const [estaLogado, setEstaLogado] = useState(false);

  const carregarCaronas = () => {
    // Validação ampliada para capturar o login independentemente da chave utilizada
    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");
    const user = localStorage.getItem("user");
    const rachouUsuario = localStorage.getItem("rachou_usuario");

    if (token || usuario || user || rachouUsuario) {
      setEstaLogado(true);
    } else {
      setEstaLogado(false);
    }

    const salvasRaw = localStorage.getItem("rachou_caronas");
    const caronasSalvas = salvasRaw ? JSON.parse(salvasRaw) : [];

    const caronasSalvasFormatadas = caronasSalvas.map((carona: any) => {
      let dataFormatada = carona.data;
      let dataObj = new Date(carona.data);

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
        modalidade: carona.modalidade || "Carro",
        dataObj: dataObj,
        horario: dataFormatada,
        vagas: `${carona.vagas} vagas`,
        vagasOriginal: carona.vagas, 
        isMock: false,
      };
    });

    caronasSalvasFormatadas.sort((a: any, b: any) => a.dataObj.getTime() - b.dataObj.getTime());
    setCaronas(caronasSalvasFormatadas);
  };

  useEffect(() => {
    carregarCaronas();
  }, []);

  const efetivarDeletar = () => {
    if (!estaLogado) return;
    if (!idParaDeletar) return;

    const salvasRaw = localStorage.getItem("rachou_caronas");
    if (salvasRaw) {
      const caronasSalvas = JSON.parse(salvasRaw);
      const novaLista = caronasSalvas.filter((carona: any) => carona.id !== idParaDeletar);
      localStorage.setItem("rachou_caronas", JSON.stringify(novaLista));
      
      Toast("Viagem cancelada com sucesso!", "sucesso");
      setIdParaDeletar(null); 
      carregarCaronas();
    }
  };

  const iniciarEdicao = (carona: any) => {
    if (!estaLogado) return;
    setIdEditando(carona.id);
    setPrecoEditado(carona.precoOriginal);
    setVagasEditadas(carona.vagasOriginal.toString());
    setOrigemEditada(carona.origem);
    setDestinoEditado(carona.destino); 
  };

  const cancelarEdicao = () => {
    setIdEditando(null);
    setPrecoEditado("");
    setVagasEditadas("");
    setOrigemEditada("");
    setDestinoEditado(""); 
  };

  const salvarEdicao = (id: string) => {
    if (!estaLogado) return;
    const salvasRaw = localStorage.getItem("rachou_caronas");
    if (salvasRaw) {
      const caronasSalvas = JSON.parse(salvasRaw);
      
      const novaLista = caronasSalvas.map((carona: any) => {
        if (carona.id === id) {
          return {
            ...carona,
            preco: precoEditado,
            vagas: vagasEditadas,
            origem: origemEditada.trim(),  
            destino: destinoEditado.trim()  
          };
        }
        return carona;
      });

      localStorage.setItem("rachou_caronas", JSON.stringify(novaLista));
      Toast("Alterações salvas com sucesso!", "sucesso");
      cancelarEdicao();
      carregarCaronas();
    }
  };

  const enviarSolicitacaoAprovacao = () => {
    Toast(`Solicitação enviada para o motorista ${caronaSelecionada?.motorista}! Aguarde a aprovação.`, "sucesso");
    setCaronaSelecionada(null);
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
                className="bg-[oklch(20.20%_0.051_277.68)] border border-[oklch(23.84%_0.118_272.92)] rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-[oklch(53.13%_0.202_277.03)]/50 transition-all duration-300 flex flex-col justify-between gap-5 group relative overflow-hidden"
              >
                {/* OVERLAY: "Rachar essa viagem" */}
                {!editandoEste && (
                  <div 
                    onClick={() => setCaronaSelecionada(carona)}
                    className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10"
                  >
                    <span className="bg-[oklch(53.13%_0.202_277.03)] text-white font-bold px-6 py-3 rounded-xl shadow-2xl tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Rachar essa viagem →
                    </span>
                  </div>
                )}

                {/* TOPO DO CARD */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 w-full">
                    
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
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
                    
                    {/* TRAJETO */}
                    <div className="flex flex-col relative pl-6 border-l-2 border-dashed border-slate-600 gap-4 mt-2 w-full">
                      <span className="absolute -left-1.25 top-1.5 w-2 h-2 rounded-full bg-slate-400 group-hover:bg-[oklch(76.31%_0.097_283.87)] transition-colors duration-200" />
                      <div className="w-full">
                        <p className="text-xs text-slate-400 font-medium">Partida</p>
                        {editandoEste ? (
                          <input
                            type="text"
                            value={origemEditada}
                            onChange={(e) => setOrigemEditada(e.target.value)}
                            className="mt-1 w-full max-w-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-violet-500"
                          />
                        ) : (
                          <h3 className="text-base sm:text-lg font-bold text-slate-100">{carona.origem}</h3>
                        )}
                      </div>

                      <span className="absolute -left-1.25 bottom-1.5 w-2 h-2 rounded-full bg-[oklch(76.31%_0.097_283.87)]" />
                      <div className="w-full">
                        <p className="text-xs text-slate-400 font-medium">Destino</p>
                        {editandoEste ? (
                          <input
                            type="text"
                            value={destinoEditado}
                            onChange={(e) => setDestinoEditado(e.target.value)}
                            className="mt-1 w-full max-w-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-violet-500"
                          />
                        ) : (
                          <h3 className="text-base sm:text-lg font-bold text-slate-100">{carona.destino}</h3>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Preço */}
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

                {/* DETALHES + BOTÕES */}
                <div className="text-xs sm:text-sm text-slate-400 flex justify-between items-end border-t border-[oklch(23.84%_0.118_272.92)] pt-4 z-20 relative">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <p>Motorista: <span className="text-slate-200 font-semibold">{carona.motorista}</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <p>Saída prevista: <span className="text-slate-200 font-medium">{carona.horario}</span></p>
                    </div>
                  </div>

                  {/* Renderiza os botões de ação estritamente se o usuário estiver logado */}
                  {estaLogado && !editandoEste && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => iniciarEdicao(carona)}
                        title="Editar Carona"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-violet-600 hover:text-white text-slate-300 transition-all duration-200"
                      >
                        <FaPen className="text-xs" />
                      </button>
                      <button
                        onClick={() => setIdParaDeletar(carona.id)} 
                        title="Excluir Carona"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-300 transition-all duration-200"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  )}

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

      {/* POP-UP: SOLICITAÇÃO AO MOTORISTA */}
      {caronaSelecionada && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[oklch(20.20%_0.051_277.68)] border border-[oklch(23.84%_0.118_272.92)] w-full max-w-md p-6 rounded-2xl shadow-2xl relative space-y-6 text-slate-100">
            <button 
              onClick={() => setCaronaSelecionada(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-lg transition-colors"
            >
              <FaXmark className="text-sm" />
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-[oklch(76.31%_0.097_283.87)] flex items-center gap-2">
                🚗 Detalhes para Rachar
              </h2>
              <p className="text-xs text-slate-400">Confirme as informações antes de enviar a solicitação.</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-3 text-sm">
              <p><span className="text-slate-400 font-medium">Motorista:</span> <span className="font-semibold text-slate-200">{caronaSelecionada.motorista}</span></p>
              <p><span className="text-slate-400 font-medium">Trajeto:</span> <span className="font-semibold text-slate-200">{caronaSelecionada.origem} → {caronaSelecionada.destino}</span></p>
              <p><span className="text-slate-400 font-medium">Preço por Vaga:</span> <span className="font-bold text-[oklch(76.31%_0.097_283.87)]">{caronaSelecionada.preco}</span></p>
              <p><span className="text-slate-400 font-medium">Horário:</span> <span className="text-slate-300">{caronaSelecionada.horario}</span></p>
              <p><span className="text-slate-400 font-medium">Modalidade:</span> <span className="text-slate-300">{caronaSelecionada.modalidade}</span></p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setCaronaSelecionada(null)}
                className="flex-1 py-3 border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl transition-colors text-sm"
              >
                Voltar
              </button>
              <button
                onClick={enviarSolicitacaoAprovacao}
                className="flex-1 py-3 bg-[oklch(53.13%_0.202_277.03)] hover:bg-[oklch(64.35%_0.151_281.28)] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <FaPaperPlane className="text-xs" /> Enviar Pedido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP ESTILIZADO: CONFIRMAÇÃO DE CANCELAMENTO / EXCLUSÃO */}
      {idParaDeletar && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[oklch(20.20%_0.051_277.68)] border border-rose-950/30 w-full max-w-sm p-6 rounded-2xl shadow-2xl relative space-y-5 text-slate-100">
            <div className="flex items-center gap-3 text-rose-500">
              <div className="p-2.5 bg-rose-500/10 rounded-xl border border-rose-500/20">
                <FaTriangleExclamation className="text-lg" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Cancelar Viagem</h2>
                <p className="text-[11px] text-slate-400">Essa ação removerá sua oferta do sistema.</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Tem certeza que gostaria de cancelar a viagem?
            </p>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setIdParaDeletar(null)} 
                className="flex-1 py-2 border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl transition-colors text-xs sm:text-sm"
              >
                Não, voltar
              </button>
              <button
                onClick={efetivarDeletar} 
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5"
              >
                Sim, cancelar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default ListaViagens;