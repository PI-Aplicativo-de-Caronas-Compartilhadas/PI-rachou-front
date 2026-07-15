import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../../services/Service'; // Ajuste o caminho até o Service.ts

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userResponse, setUserResponse] = useState<any>(null);

  const [formData, setFormData] = useState({
    nome: '',
    email: '', 
    telefone: '',
    senha: '',
    tipo: 'Passageiro',
    foto: '',
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await cadastrarUsuario('/usuarios/cadastrar', {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        senha: formData.senha,
        tipo: formData.tipo,
        foto: formData.foto || 'https://i.imgur.com/8Q5R9mB.png',
      }, setUserResponse);

      setSuccessMessage('Cadastro realizado com sucesso! Redirecionando para a tela de login...');
      
      // Aguarda 2 segundos para o usuário ler o feedback e redireciona para a página de Login
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      const apiError = error.response?.data?.message || 'Erro ao processar o cadastro. Verifique os dados inseridos.';
      setErrorMessage(apiError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12 text-ultrasonic-blue-50 min-h-[80vh] flex flex-col justify-center">
      
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-ultrasonic-blue-300 mb-2">Criar Conta</h1>
        <p className="text-ultrasonic-blue-50 font-semibold text-sm">
          Cadastre-se para começar a compartilhar suas caronas.
        </p>
      </div>

      <form 
        onSubmit={handleSubmit} 
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
          <label className="text-sm font-medium text-slate-300">Nome Completo</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
            placeholder="Ex: passageiro@email.com"
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-ultrasonic-blue-400 transition-all"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300">Telefone / WhatsApp</label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Ex: (11) 99999-9999"
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-ultrasonic-blue-400 transition-all"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300">Tipo de Perfil</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-ultrasonic-blue-400 transition-all appearance-none cursor-pointer"
          >
            <option value="Passageiro">Passageiro (Busco Carona)</option>
            <option value="Motorista">Motorista (Ofereço Carona)</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300">Foto de Perfil (URL Link)</label>
          <input
            type="url"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
            placeholder="Ex: https://usuario.png"
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-ultrasonic-blue-400 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300">Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
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
              Cadastrando...
            </>
          ) : (
            'Finalizar Cadastro'
          )}
        </button>

        <div className="text-center mt-3 pt-4 border-t border-slate-800/60">
          <p className="text-xs text-slate-400">Já tem uma conta no Rachou?</p>
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
  );
}