import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaPen, FaCheck, FaXmark, FaCar, FaMotorcycle, FaPaperPlane, FaTriangleExclamation } from "react-icons/fa6";
import Toast from "../../utils/Toast";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar, deletar } from "../../services/Service";
import type { Viagem } from "../../models/Viagem";

function ListaViagens() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  const [viagens, setViagens] = useState<Viagem[]>([]);
  
  const [idEditando, setIdEditando] = useState<string | null>(null);
  const [precoEditado, setPrecoEditado] = useState("");
  const [origemEditada, setOrigemEditada] = useState("");
  const [destinoEditado, setDestinoEditado] = useState("");

  const [caronaSelecionada, setCaronaSelecionada] = useState<Viagem | null>(null);
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null);

  const estaLogado = token !== "";

  useEffect(() => {
    if (token === "") {
      navigate("/");
      Toast("Você precisa estar logado.", "info");
    }
  }, [token, navigate]);

  // BUSCAR VIAGENS DO BANCO DE DADOS (GET /viagens)
  const carregarViagens = async () => {
    try {
      await buscar("/viagens", setViagens, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      console.error("Erro ao buscar viagens:", error);
      if (error.toString().includes("401")) {
        Toast("O token expirou. Faça login novamente.", "info");
        navigate("/");
      } else {
        Toast("Não foi possível carregar as viagens do servidor.", "info");
      }
    }
  };

  useEffect(() => {
    if (token !== "") {
      carregarViagens();
    }
  }, [token]);

  // EXCLUIR VIAGEM DO BANCO DE DADOS (DELETE /viagens/{id})
  const efetivarDeletar = async () => {
    if (!estaLogado || !idParaDeletar) return;

    try {
      await deletar(`/viagens/${idParaDeletar}`, {
        headers: { Authorization: token },
      });

      Toast("Viagem cancelada com sucesso!", "sucesso");
      setIdParaDeletar(null); 
      carregarViagens();
    } catch (error: any) {
      console.error("Erro ao deletar:", error);
      Toast("Erro ao excluir a carona no servidor.", "info");
    }
  };

  const iniciarEdicao = (viagem: Viagem) => {
    if (!estaLogado) return;
    setIdEditando(viagem.id.toString());
    setPrecoEditado(viagem.preco.toString());
    setOrigemEditada(viagem.origem);
    setDestinoEditado(viagem.destino); 
  };

  const cancelarEdicao = () => {
    setIdEditando(null);
    setPrecoEditado("");
    setOrigemEditada("");
    setDestinoEditado(""); 
  };

  // SALVAR EDIÇÃO NO BANCO DE DADOS (PUT /viagens)
  const salvarEdicao = async (id: string) => {
    if (!estaLogado) return;

    const viagemAtual = viagens.find((c) => c.id.toString() === id);

    const dadosAtualizados: Viagem = {
      id: Number(id),
      origem: origemEditada.trim(),
      destino: destinoEditado.trim(),
      preco: parseFloat(precoEditado),
      previsaoSaida: viagemAtual?.previsaoSaida || new Date().toISOString(),
      previsaoChegada: viagemAtual?.previsaoChegada || new Date().toISOString(),
      status: viagemAtual?.status || "Disponível",
      modalidade: viagemAtual?.modalidade || null,
      usuario: viagemAtual?.usuario || null,
    };

    try {
      const resposta = await fetch(`https://rachou.onrender.com/viagens`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(dadosAtualizados),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao atualizar registro.");
      }

      Toast("Alterações salvas com sucesso!", "sucesso");
      cancelarEdicao();
      carregarViagens();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      Toast("Erro ao salvar alterações no servidor.", "info");
    }
  };

  const enviarSolicitacaoAprovacao = () => {
    Toast(`Solicitação enviada para o motorista! Aguarde a aprovação.`, "sucesso");
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
          {viagens.map((viagem) => {
            const editandoEste = idEditando === viagem.id.toString();
            const modalidadeNome = viagem.modalidade?.nome || (viagem.modalidade as any) || "Carro";
            const ehMoto = modalidadeNome.toLowerCase() === "moto";
            const precoFormatado = `R$ ${parseFloat(viagem.preco.toString()).toFixed(2).replace(".", ",")}`;
            const nomeMotorista = viagem.usuario?.nome || "Motorista Parceiro";

            let dataFormatada = viagem.previsaoSaida;
            try {
              const dataObj = new Date(viagem.previsaoSaida);
              if (!isNaN(dataObj.getTime())) {
                dataFormatada = dataObj.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit"
                });
              }
            } catch (e) {
              console.error("Erro ao formatar data", e);
            }

            return (
              <div 
                key={viagem.id}
                className="bg-[oklch(20.20%_0.051_277.68)] border border-[oklch(23.84%_0.118_272.92)] rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-[oklch(53.13%_0.202_277.03)]/50 transition-all duration-300 flex flex-col justify-between gap-5 group relative overflow-hidden"
              >
                {/* OVERLAY: "Rachar essa viagem" */}
                {!editandoEste && (
                  <div 
                    onClick={() => setCaronaSelecionada(viagem)}
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
                      <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-400 group-hover:bg-[oklch(76.31%_0.097_283.87)] transition-colors duration-200" />
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
                          <h3 className="text-base sm:text-lg font-bold text-slate-100">{viagem.origem}</h3>
                        )}
                      </div>

                      <span className="absolute -left-[5px] bottom-1.5 w-2 h-2 rounded-full bg-[oklch(76.31%_0.097_283.87)]" />
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
                          <h3 className="text-base sm:text-lg font-bold text-slate-100">{viagem.destino}</h3>
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
                        {precoFormatado}
                      </span>
                    )}
                  </div>
                </div>

                {/* DETALHES + BOTÕES */}
                <div className="text-xs sm:text-sm text-slate-400 flex justify-between items-end border-t border-[oklch(23.84%_0.118_272.92)] pt-4 z-20 relative">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <p>Motorista: <span className="text-slate-200 font-semibold">{nomeMotorista}</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <p>Saída prevista: <span className="text-slate-200 font-medium">{dataFormatada}</span></p>
                    </div>
                  </div>

                  {estaLogado && !editandoEste && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => iniciarEdicao(viagem)}
                        title="Editar Carona"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-violet-600 hover:text-white text-slate-300 transition-all duration-200"
                      >
                        <FaPen className="text-xs" />
                      </button>
                      <button
                        onClick={() => setIdParaDeletar(viagem.id.toString())} 
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
                        onClick={() => salvarEdicao(viagem.id.toString())}
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
              <p><span className="text-slate-400 font-medium">Motorista:</span> <span className="font-semibold text-slate-200">{caronaSelecionada.usuario?.nome || "Motorista Parceiro"}</span></p>
              <p><span className="text-slate-400 font-medium">Trajeto:</span> <span className="font-semibold text-slate-200">{caronaSelecionada.origem} → {caronaSelecionada.destino}</span></p>
              <p><span className="text-slate-400 font-medium">Preço por Vaga:</span> <span className="font-bold text-[oklch(76.31%_0.097_283.87)]">R$ {parseFloat(caronaSelecionada.preco.toString()).toFixed(2).replace(".", ",")}</span></p>
              <p><span className="text-slate-400 font-medium">Modalidade:</span> <span className="text-slate-300">{caronaSelecionada.modalidade?.nome || "Carro"}</span></p>
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