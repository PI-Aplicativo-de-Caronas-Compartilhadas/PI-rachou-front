import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext"; // Corrigido de ../../ para ../../../
import { UserIcon, EnvelopeSimpleIcon, PhoneIcon, IdentificationCardIcon, CarIcon, CameraIcon, ArrowLeftIcon } from "@phosphor-icons/react";

export default function EditarPerfil() {
  // Ajustando a tipagem explicitamente para o seu contexto se o TypeScript reclamar
  const { usuario } = useContext<any>(AuthContext); 
  const navigate = useNavigate();

  // Estados do Formulário baseados no contexto do Usuário
  const [nome, setNome] = useState(usuario?.nome || "");
  const [apelido, setApelido] = useState(usuario?.apelido || "");
  const [email, setEmail] = useState(usuario?.email || "");
  const [telefone, setTelefone] = useState(usuario?.telefone || "");
  const [foto, setFoto] = useState(usuario?.foto || "");
  const [tipoVeiculo, setTipoVeiculo] = useState(usuario?.tipoVeiculo || "nenhum"); 

  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // Redireciona se o usuário tentar acessar sem estar logado
  useEffect(() => {
    if (!usuario?.token) {
      navigate("/login");
    }
  }, [usuario?.token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setSucesso(false);

    const dadosAtualizados = {
      nome,
      apelido,
      email,
      telefone,
      foto,
      tipoVeiculo: tipoVeiculo === "nenhum" ? null : tipoVeiculo,
    };

    try {
      console.log("Dados enviados:", dadosAtualizados);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSucesso(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Erro ao atualizar o perfil", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(14.20%_0.051_277.68)] text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      
      {/* Botão de Voltar */}
      <div className="w-full max-w-2xl mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-[oklch(76.31%_0.097_283.87)] hover:text-white transition-colors group cursor-pointer"
        >
          <ArrowLeftIcon size={18} className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>
      </div>

      <div className="w-full max-w-2xl bg-[oklch(17.50%_0.051_277.68)] border border-[oklch(23.84%_0.118_272.92)] rounded-2xl p-6 sm:p-10 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Editar seu Perfil</h2>
          <p className="mt-2 text-sm text-[oklch(76.31%_0.097_283.87)]">Mantenha seus dados de carona atualizados.</p>
        </div>

        {sucesso && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-center text-sm font-medium">
            ✓ Perfil atualizado com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SEÇÃO DA FOTO DE PERFIL */}
          <div className="flex flex-col items-center space-y-4 pb-4 border-b border-[oklch(23.84%_0.118_272.92)]/50">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[oklch(53.13%_0.202_277.03)] bg-[oklch(23.84%_0.118_272.92)] flex items-center justify-center">
                {foto ? (
                  <img src={foto} alt="Preview da foto" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={44} className="text-[oklch(76.31%_0.097_283.87)]" />
                )}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <CameraIcon size={20} />
              </div>
            </div>
            
            <div className="w-full">
              <label className="block text-xs font-bold uppercase tracking-wider text-[oklch(76.31%_0.097_283.87)] mb-2">URL da Foto de Perfil</label>
              <input
                type="url"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
                placeholder="https://exemplo.com/sua-foto.jpg"
                className="w-full bg-[oklch(14.20%_0.051_277.68)] border border-[oklch(23.84%_0.118_272.92)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[oklch(53.13%_0.202_277.03)] focus:ring-1 focus:ring-[oklch(53.13%_0.202_277.03)] transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* GRID DE CAMPOS: NOME E APELIDO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[oklch(76.31%_0.097_283.87)] mb-2">Nome Completo</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500"><UserIcon size={18} /></span>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-[oklch(14.20%_0.051_277.68)] border border-[oklch(23.84%_0.118_272.92)] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[oklch(53.13%_0.202_277.03)] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[oklch(76.31%_0.097_283.87)] mb-2">Apelido <span className="text-slate-500 font-normal lowercase">(opcional)</span></label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500"><IdentificationCardIcon size={18} /></span>
                <input
                  type="text"
                  value={apelido}
                  onChange={(e) => setApelido(e.target.value)}
                  placeholder="Como quer ser chamado"
                  className="w-full bg-[oklch(14.20%_0.051_277.68)] border border-[oklch(23.84%_0.118_272.92)] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[oklch(53.13%_0.202_277.03)] transition-all placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[oklch(76.31%_0.097_283.87)] mb-2">E-mail</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500"><EnvelopeSimpleIcon size={18} /></span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[oklch(14.20%_0.051_277.68)] border border-[oklch(23.84%_0.118_272.92)] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[oklch(53.13%_0.202_277.03)] transition-all"
              />
            </div>
          </div>

          {/* TELEFONE */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[oklch(76.31%_0.097_283.87)] mb-2">Telefone / WhatsApp</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500"><PhoneIcon size={18} /></span>
              <input
                type="tel"
                required
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
                className="w-full bg-[oklch(14.20%_0.051_277.68)] border border-[oklch(23.84%_0.118_272.92)] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[oklch(53.13%_0.202_277.03)] transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* TIPO DE VEÍCULO */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[oklch(76.31%_0.097_283.87)] mb-2">Você possui veículo?</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500"><CarIcon size={18} /></span>
              <select
                value={tipoVeiculo}
                onChange={(e) => setTipoVeiculo(e.target.value)}
                className="w-full bg-[oklch(14.20%_0.051_277.68)] border border-[oklch(23.84%_0.118_272.92)] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[oklch(53.13%_0.202_277.03)] transition-all appearance-none cursor-pointer"
              >
                <option value="nenhum">Não possuo (Apenas Passageiro)</option>
                <option value="carro">Sim, possuo um Carro</option>
                <option value="moto">Sim, possuo uma Moto</option>
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">▼</span>
            </div>
          </div>

          {/* BOTÃO DE SALVAR */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-[oklch(53.13%_0.202_277.03)] hover:bg-[oklch(64.35%_0.151_281.28)] disabled:bg-slate-700 text-white font-bold text-base py-3 px-4 rounded-xl transition-all duration-200 shadow-md active:scale-[0.99] cursor-pointer"
            >
              {carregando ? "Salvando alterações..." : "Salvar Alterações"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}