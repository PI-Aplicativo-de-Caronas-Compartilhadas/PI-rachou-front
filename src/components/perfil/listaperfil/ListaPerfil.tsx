import { useContext, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon, PencilSimpleIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
import { atualizar } from "../../../services/Service";
import Toast from "../../../utils/Toast";

export function ListaPerfil() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Estado para controlar se o card está em modo de visualização ou de edição
  const [modoEdicao, setModoEdicao] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // Estados locais do formulário de edição
  const [nome, setNome] = useState(usuario.nome || "");
  const [foto, setFoto] = useState(usuario.foto || "");
  const [telefone, setTelefone] = useState(usuario.telefone || "");
  const [email, setEmail] = useState(usuario.email || "");

  useEffect(() => {
    if (token === "") {
      navigate("/");
      Toast("Faça login para acessar o perfil.", "info");
    }
  }, [token, navigate]);

  // Função para salvar as edições na API
  async function salvarEdicao(e: FormEvent) {
    e.preventDefault();

    if (nome.trim() === "" || email.trim() === "") {
      Toast("Nome e E-mail são obrigatórios.", "info");
      return;
    }

    const dadosAtualizados = {
      ...usuario,
      nome: nome.trim(),
      foto: foto.trim(),
      telefone: telefone.trim(),
      email: email.trim(),
    };

    try {
      setCarregando(true);
      
      // Chamada para a rota de atualizar dados do usuário do backend
      await atualizar("/usuarios", dadosAtualizados, () => {}, {
        headers: { Authorization: token },
      });

      Toast("Perfil atualizado com sucesso!", "sucesso");
      Toast("Faça login novamente para validar as alterações.", "info");
      
      // Desloga o usuário de forma limpa para recarregar o novo token/dados do LocalStorage
      setTimeout(() => {
        handleLogout();
      }, 2000);

    } catch (error: any) {
      Toast("Erro ao atualizar o perfil. Tente novamente.", "erro");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="w-[90vw] xs:w-full max-w-90 md:max-w-95 bg-[#0c0c24]/90 backdrop-blur-md rounded-3xl border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300">
      
      {/* Faixa de fundo superior */}
      <div className="h-16 w-full bg-linear-to-r from-ultrasonic-blue-700 via-[#2222a0] to-[#0c0c24] opacity-80" />

      <form onSubmit={salvarEdicao} className="flex w-full flex-col items-center px-6 pb-8 -mt-12">
        
        {/* AVATAR / FOTO DO USUÁRIO */}
        <div className="relative group">
          <div className="absolute inset-0 rounded-full bg-linear-to-b from-cyan-400 to-ultrasonic-blue-700 blur-sm opacity-75" />
          <div className="relative p-0.75 rounded-full bg-slate-900">
            {foto ? (
              <img
                src={foto}
                alt="Foto do usuário"
                className="rounded-full w-24 h-24 md:w-28 md:h-28 object-cover border border-white/10"
              />
            ) : (
              <div className="text-[oklch(88.10%_0.048_285.37)] w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center bg-slate-800">
                <UserCircleIcon size={80} />
              </div>
            )}
          </div>
        </div>

        {/* TÍTULOS DO CARD */}
        <div className="text-center mt-4 w-full relative">
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">
            {modoEdicao ? "Editando dados" : "Meu Perfil"}
          </span>
          <h2 className="text-white font-bold text-xl md:text-2xl tracking-tight mt-1 mb-6">
            Informações de Registro
          </h2>

          {/* BOTÃO FLUTUANTE PARA ALTERAR MODO (EDITAR / CANCELAR) */}
          {!modoEdicao ? (
            <button
              type="button"
              onClick={() => setModoEdicao(true)}
              className="absolute top-0 right-0 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer"
              title="Editar Perfil"
            >
              <PencilSimpleIcon size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setModoEdicao(false);
                // Restaura os valores originais se cancelar
                setNome(usuario.nome || "");
                setFoto(usuario.foto || "");
                setTelefone(usuario.telefone || "");
                setEmail(usuario.email || "");
              }}
              className="absolute top-0 right-0 p-2 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-all cursor-pointer"
              title="Cancelar edição"
            >
              <XIcon size={18} />
            </button>
          )}
        </div>

        {/* LISTA DE CAMPOS (MUTA CONFORME O MODO) */}
        <div className="w-full space-y-4 bg-white/2 border border-white/5 rounded-2xl p-4 mb-6 text-left">
          
          {/* CAMPO 1: Nome Completo */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
              Nome Completo
            </span>
            {modoEdicao ? (
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 focus:border-cyan-400 text-white rounded-lg px-3 py-1.5 mt-1 text-sm focus:outline-none transition-colors"
                required
              />
            ) : (
              <span className="text-white text-sm md:text-base font-medium mt-0.5 truncate">
                {usuario.nome}
              </span>
            )}
          </div>

          <div className="h-px bg-white/5" />

          {/* CAMPO 2: E-mail */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
              Endereço de E-mail
            </span>
            {modoEdicao ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 focus:border-cyan-400 text-white rounded-lg px-3 py-1.5 mt-1 text-sm focus:outline-none transition-colors"
                required
              />
            ) : (
              <span className="text-white text-sm md:text-base font-medium mt-0.5 break-all">
                {usuario.email}
              </span>
            )}
          </div>

          <div className="h-px bg-white/5" />

          {/* CAMPO 3: Telefone */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
              Telefone
            </span>
            {modoEdicao ? (
              <input
                type="tel"
                value={telefone}
                placeholder="(00) 00000-0000"
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 focus:border-cyan-400 text-white rounded-lg px-3 py-1.5 mt-1 text-sm focus:outline-none transition-colors"
              />
            ) : (
              <span className="text-white text-sm md:text-base font-medium mt-0.5">
                {usuario.telefone || "Telefone não informado"}
              </span>
            )}
          </div>

          {/* EXCLUSIVO MODO EDIÇÃO: Input para URL da Foto */}
          {modoEdicao && (
            <>
              <div className="h-px bg-white/5" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                  URL da Foto de Perfil
                </span>
                <input
                  type="text"
                  placeholder="Link da imagem (Ex: Imgur)"
                  value={foto}
                  onChange={(e) => setFoto(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 focus:border-cyan-400 text-white rounded-lg px-3 py-1.5 mt-1 text-sm focus:outline-none transition-colors"
                />
              </div>
            </>
          )}

          {/* Se não estiver editando, exibe o tipo de conta estático */}
          {!modoEdicao && (
            <>
              <div className="h-px bg-white/5" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                  Tipo de conta
                </span>
                <span className="text-white text-sm md:text-base font-medium mt-0.5">
                  {usuario.tipo || "Comum"}
                </span>
              </div>
            </>
          )}

        </div>

        {/* BOTÃO DE SALVAR EDICÃO */}
        {modoEdicao ? (
          <button
            type="submit"
            disabled={carregando}
            className="w-full flex items-center justify-center gap-2 bg-[oklch(53.13%_0.202_277.03)] hover:bg-[oklch(64.35%_0.151_281.28)] disabled:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer text-sm"
          >
            <CheckIcon size={18} />
            {carregando ? "Salvando..." : "Confirmar Alterações"}
          </button>
        ) : (
          /* Se não estiver editando, mostra a logo normal do Rachou embaixo */
          <img
            src="/logo.png"
            alt="Logo Rachou"
            className="h-24 sm:h-32 w-auto object-contain brightness-0 invert -my-4 sm:-my-6 origin-left transition-all"
          />
        )}

      </form>
    </div>
  );
}

export default ListaPerfil;