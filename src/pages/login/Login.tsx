import { useState, type ChangeEvent, type FormEvent } from 'react';

export default function Login() {
  // Estado para alternar entre a tela de Login e a tela de Cadastro
  const [isRegister, setIsRegister] = useState(false);

  // Estados para os inputs do formulário
  const [formData, setFormData] = useState({
    nome: '',
    usuario: '', 
    senha: '',
    foto: '',
  });

  // Função para capturar as mudanças nos inputs de forma dinâmica
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Função para lidar com o envio do formulário
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isRegister) {
      console.log('Dados para Cadastro:', formData);
    } else {
      console.log('Dados para Login:', {
        usuario: formData.usuario,
        senha: formData.senha,
      });
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12 text-ultrasonic-blue-50 min-h-[80vh] flex flex-col justify-center">
      
      {/* Cabeçalho alinhado com CadastrarViagem */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-ultrasonic-blue-300 mb-2">
          {isRegister ? 'Criar Conta' : 'Entrar no Rachou'}
        </h1>
        <p className="text-ultrasonic-blue-50 font-semibold text-sm">
          {isRegister 
            ? 'Cadastre-se para começar a compartilhar suas caronas.' 
            : 'Faça login para buscar ou publicar novos trajetos.'}
        </p>
      </div>

      {/* Formulário com a mesma estrutura de container do CadastrarViagem */}
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-5 bg-ultrasonic-blue-950 border border-ultrasonic-blue-900 p-8 rounded-2xl shadow-lg"
      >
        
        {/* Campo Nome (Apenas no Cadastro) */}
        {isRegister && (
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
        )}

        {/* Campo E-mail / Usuário */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300">E-mail (Usuário)</label>
          <input
            type="email"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            placeholder="Ex: passageiro@email.com"
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-ultrasonic-blue-400 transition-all"
            required
          />
        </div>

        {/* Campo Foto URL (Apenas no Cadastro) */}
        {isRegister && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Foto de Perfil (URL Link)</label>
            <input
              type="url"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
              placeholder="Ex: https://github.com/usuario.png"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-ultrasonic-blue-400 transition-all"
            />
          </div>
        )}

        {/* Campo Senha */}
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

        {/* Botão de Enviar com idêntica estilização */}
        <button
          type="submit"
          className="mt-4 bg-ultrasonic-blue-500 hover:bg-ultrasonic-blue-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md active:scale-98"
        >
          {isRegister ? 'Finalizar Cadastro' : 'Entrar na Conta'}
        </button>

        {/* Link para Alternar Telas integrado suavemente abaixo do botão */}
        <div className="text-center mt-3 pt-4 border-t border-slate-800/60">
          <p className="text-xs text-slate-400">
            {isRegister ? 'Já tem uma conta no Rachou?' : 'Ainda não possui cadastro?'}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setFormData({ nome: '', usuario: '', senha: '', foto: '' });
            }}
            className="text-sm font-semibold text-ultrasonic-blue-300 hover:text-ultrasonic-blue-200 mt-1 transition-colors underline underline-offset-4"
          >
            {isRegister ? 'Acessar com Login' : 'Criar nova conta grátis'}
          </button>
        </div>

      </form>
    </div>
  );
}