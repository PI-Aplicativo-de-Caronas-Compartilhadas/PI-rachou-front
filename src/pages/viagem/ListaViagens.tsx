import { Link } from "react-router-dom";

// Caronas fictícias para simular como a página fica com dados reais
const caronasMock = [
  {
    id: 1,
    origemDestino: "São Paulo ➔ Campinas",
    preco: "R$ 35,00",
    motorista: "Rodrigo Silva",
    horario: "Hoje às 18:30",
    vagas: "3 vagas",
  },
  {
    id: 2,
    origemDestino: "Rio de Janeiro ➔ Niterói",
    preco: "R$ 15,00",
    motorista: "Beatriz Costa",
    horario: "Amanhã às 08:00",
    vagas: "2 vagas",
  },
  {
    id: 3,
    origemDestino: "Belo Horizonte ➔ Ouro Preto",
    preco: "R$ 40,00",
    motorista: "Gabriel Souza",
    horario: "18 de Julho às 14:00",
    vagas: "4 vagas",
  }
];

function ListaViagens() {
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
          {caronasMock.map((carona) => (
            <div 
              key={carona.id}
              className="bg-[oklch(20.20%_0.051_277.68)] border border-[oklch(23.84%_0.118_272.92)] rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-[oklch(53.13%_0.202_277.03)]/50 transition-all duration-300 flex flex-col justify-between gap-5 group"
            >
              {/* TOPO DO CARD */}
              <div className="flex justify-between items-start gap-3">
                <div>
                  {/* Badge de Vagas */}
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[oklch(53.13%_0.202_277.03)]/10 text-[oklch(76.31%_0.097_283.87)] px-3 py-1.5 rounded-full border border-[oklch(53.13%_0.202_277.03)]/25">
                    {carona.vagas} disponíveis
                  </span>
                  
                  {/* Trajeto */}
                  <h3 className="text-lg sm:text-xl font-bold mt-4 text-slate-100 group-hover:text-[oklch(76.31%_0.097_283.87)] transition-colors duration-200">
                    {carona.origemDestino}
                  </h3>
                </div>

                {/* Preço */}
                <span className="text-2xl font-black text-[oklch(76.31%_0.097_283.87)] whitespace-nowrap shrink-0">
                  {carona.preco}
                </span>
              </div>

              {/* DETALHES (BASE DO CARD) */}
              <div className="text-xs sm:text-sm text-slate-400 flex flex-col gap-2 border-t border-[oklch(23.84%_0.118_272.92)] pt-4">
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

            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default ListaViagens;