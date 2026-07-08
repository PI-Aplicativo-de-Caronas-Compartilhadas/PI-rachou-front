function CadastrarViagem() {
  return (
    <>
      <div className="max-w-xl mx-auto px-6 py-12 text-ultrasonic-blue-50 min-h-[80vh]">
        <h1 className="text-3xl font-extrabold text-ultrasonic-blue-300 mb-2">
          Publicar Oferta de Carona
        </h1>
        <p className="text-ultrasonic-blue-50 font-semibold text-sm mb-8">
          Preencha os dados do trajeto para compartilhar os custos.
        </p>

        <form className="flex flex-col gap-5 bg-ultrasonic-blue-950 border-ultrasonic-blue-900 p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Origem</label>
            <input
              type="text"
              name="origem"
              placeholder="Ex: São Paulo - SP"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-ultrasonic-blue-400"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">
              Destino
            </label>
            <input
              type="text"
              name="destino"
              placeholder="Ex: Campinas - SP"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-ultrasonic-blue-400"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">
              Preço (R$)
            </label>
            <input
              type="number"
              name="preco"
              placeholder="0.00"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-ultrasonic-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-ultrasonic-blue-500 hover:bg-ultrasonic-blue-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md"
          >
            Cadastrar Trajeto
          </button>
        </form>
      </div>
    </>
  );
}

export default CadastrarViagem;
