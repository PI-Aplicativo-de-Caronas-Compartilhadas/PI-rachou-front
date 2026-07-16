import { useContext, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type UsuarioLogin from '../../models/UsuarioLogin';
import { AuthContext } from '../../contexts/AuthContext';

export function Login() {

  const navigate = useNavigate();

  const { handleLogin } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  async function login(e: FormEvent) {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await handleLogin(usuarioLogin);

      navigate("/home");

    } catch (error: any) {

      if (error.toString().includes("500")) {
        setErrorMessage("Erro interno, por favor tente novamente mais tarde.");
      }

      const apiError = error.response?.data?.message || 'E-mail ou senha inválidos.';
      setErrorMessage(apiError);
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12 text-ultrasonic-blue-50 min-h-[80vh] flex flex-col justify-center">
      
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-ultrasonic-blue-300 mb-2">Entrar no Rachou</h1>
        <p className="text-ultrasonic-blue-50 font-semibold text-sm">
          Faça login para buscar ou publicar novos trajetos.
        </p>
      </div>

      <form 
        onSubmit={login} 
        className="flex flex-col gap-5 bg-ultrasonic-blue-950 border border-ultrasonic-blue-900 p-8 rounded-2xl shadow-lg"
      >
        {errorMessage && (
          <div className="bg-red-900/40 border border-red-500 text-red-200 text-sm p-3 rounded-xl text-center">
            ⚠️ {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-900/40 border border-emerald-500 text-emerald-200 text-sm p-3 rounded-xl text-center">
            ✅ {successMessage}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300">E-mail</label>
          <input
            type="email"
            name="email"
            value={usuarioLogin.email}
            onChange={handleChange}
            placeholder="Ex: passageiro@email.com"
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-ultrasonic-blue-400 transition-all"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300">Senha</label>
          <input
            type="password"
            name="senha"
            value={usuarioLogin.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-ultrasonic-blue-400 transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-ultrasonic-blue-500 hover:bg-ultrasonic-blue-600 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold py-3 rounded-xl transition-all shadow-md active:scale-98 flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              Entrando...
            </>
          ) : (
            'Entrar na Conta'
          )}
        </button>

        <div className="text-center mt-3 pt-4 border-t border-slate-800/60">
          <p className="text-xs text-slate-400">Ainda não possui cadastro?</p>
          {/* Navega diretamente para a rota /cadastrousuario */}
          <Link
            to="/cadastro/usuario"
            className="inline-block text-sm font-semibold text-ultrasonic-blue-300 hover:text-ultrasonic-blue-200 mt-1 transition-colors underline underline-offset-4"
          >
            Criar nova conta grátis
          </Link>
        </div>

      </form>
    </div>
  )
};

export default Login;