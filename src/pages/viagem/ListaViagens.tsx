import { Link } from "react-router-dom";

function ListaViagens() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-12 text-slate-100 min-h-[80vh]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-emerald-400">
              Caronas Disponíveis
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Encontre um trajeto compartilhado ou ofereça o seu.
            </p>
          </div>
          <Link
            to="/cadastrarviagem"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl transition-all shadow-md"
          >
            + Oferecer Carona
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col justify-between gap-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full border border-emerald-800/50"></span>
                <h3 className="text-lg font-bold mt-3 text-slate-100"></h3>
              </div>
              <span className="text-xl font-black text-emerald-400"></span>
            </div>

            <div className="text-xs text-slate-400 flex flex-col gap-1 border-t border-slate-800 pt-3">
              <p>
                Motorista: <span className="text-slate-200 font-medium"></span>
              </p>
              <p>
                Saída prevista: <span className="text-slate-200"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaViagens;
