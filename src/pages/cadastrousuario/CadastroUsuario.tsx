import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../services/Service"; // Ajuste o caminho até o Service.ts
import type usuario from "../../models/Usuario";
import Toast from "../../utils/Toast";
import { ClipLoader } from "react-spinners";

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<usuario>({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    tipo: "",
    foto: "",
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/login");
  }

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 12) {
      setLoading(true);

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        Toast("Usuário cadastrado com sucesso!", "sucesso");
      } catch (erro) {
        Toast("Erro ao cadastrar o Usuário!", "erro");
      }
    } else {
      Toast(
        "Dados do usuário inconsistentes! Verifique as informações do cadastro",
        "erro",
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="max-w-xl mx-auto px-6 py-12 text-ultrasonic-blue-50 min-h-[80vh] flex flex-col justify-center">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-ultrasonic-blue-300 mb-2">
            Criar Conta
          </h1>
          <p className="text-ultrasonic-blue-50 font-semibold text-sm">
            Cadastre-se para começar a compartilhar suas caronas.
          </p>
        </div>

        <form
          onSubmit={cadastrarNovoUsuario}
          className="flex flex-col gap-5 bg-ultrasonic-blue-950 border border-ultrasonic-blue-900 p-8 rounded-2xl shadow-lg"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">
              Nome Completo
            </label>
            <input
              type="text"
              name="nome"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              placeholder="Ex: Ana Maria Silva"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-ultrasonic-blue-400 transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">E-mail</label>
            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              placeholder="Ex: passageiro@email.com"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-ultrasonic-blue-400 transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">
              Telefone (apenas numeros)
            </label>
            <input
              type="tel"
              name="telefone"
              value={usuario.telefone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              placeholder="Ex: 11999999999"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-ultrasonic-blue-400 transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">
              Tipo de Perfil
            </label>
            <select
              name="tipo"
              value={usuario.tipo}
              onChange={atualizarEstado}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-ultrasonic-blue-400 transition-all appearance-none cursor-pointer"
            >
              <option value="">Selecione...</option>
              <option value="Passageiro">Passageiro (Busco Carona)</option>
              <option value="Motorista">Motorista (Ofereço Carona)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">
              Foto de Perfil (URL Link)
            </label>
            <input
              type="url"
              name="foto"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              placeholder="Ex: https://usuario.png"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-ultrasonic-blue-400 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Senha</label>
            <input
              type="password"
              name="senha"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              placeholder="Digite sua senha"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-ultrasonic-blue-400 transition-all"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">
              Confirmar Senha
            </label>
            <input
              type="password"
              name="confirmarSenha"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleConfirmarSenha(e)
              }
              placeholder="Confrime a senha"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-ultrasonic-blue-400 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-ultrasonic-blue-500 hover:bg-ultrasonic-blue-600 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold py-3 rounded-xl transition-all shadow-md active:scale-98 flex justify-center items-center gap-2"
          >
            {loading ? (
              <ClipLoader color="#ffff" size={24} />
            ) : (
              <span>Cadastrar</span>
            )}
          </button>

          <div className="text-center mt-3 pt-4 border-t border-slate-800/60">
            <p className="text-xs text-slate-400">
              Já tem uma conta no Rachou?
            </p>
            {/* Navega diretamente para a rota /login */}
            <Link
              to="/login"
              className="inline-block text-sm font-semibold text-ultrasonic-blue-300 hover:text-ultrasonic-blue-200 mt-1 transition-colors underline underline-offset-4"
            >
              Acessar com Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
