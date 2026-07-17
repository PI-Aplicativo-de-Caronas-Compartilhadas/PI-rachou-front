import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FaCar, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { usuario } = useContext(AuthContext);

  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [dataIda, setDataIda] = useState("");
  const [passageiros, setPassageiros] = useState("");
  const [resultado, setResultado] = useState<any | null>(null);

  // Função para limpar estados ao fechar
  const handleClose = () => {
    setResultado(null);
    setOrigem("");
    setDestino("");
    onClose();
  };

  const inputBase =
    "p-4 bg-slate-900 border border-slate-700 rounded-xl w-full text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[oklch(53.13%_0.202_277.03)]";

  // ... (mantenha sua lógica de procurarCarona e cidades aqui) ...

  if (!isOpen) return null;

  function procurarCarona(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[oklch(20.20%_0.051_277.68)] border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* HEADER */}
        <div className="p-6 flex justify-between items-center border-b border-slate-700">
          <h2 className="text-xl font-bold text-[oklch(76.31%_0.097_283.87)]">
            Buscar Carona
          </h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-4">
          <input
            type="text"
            value={origem}
            placeholder="Origem"
            className={inputBase}
            onChange={(e) => setOrigem(e.target.value)}
          />
          <input
            type="text"
            value={destino}
            placeholder="Destino"
            className={inputBase}
            onChange={(e) => setDestino(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={dataIda}
              className={inputBase}
              onChange={(e) => setDataIda(e.target.value)}
            />
            <select
              value={passageiros}
              className={inputBase}
              onChange={(e) => setPassageiros(e.target.value)}
            >
              <option value="" disabled>
                Passageiros
              </option>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} adulto(s)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={procurarCarona}
            className="w-full bg-[oklch(53.13%_0.202_277.03)] text-white py-4 rounded-xl font-bold hover:bg-[oklch(64.35%_0.151_281.28)] transition"
          >
            Buscar Carona
          </button>

          {/* CARD DE RESULTADO ESTILIZADO IGUAL A LISTAVIAGENS */}
          {resultado && (
            <div className="mt-6 p-6 bg-slate-900 border border-slate-700 rounded-2xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full border border-blue-800">
                  1 vaga
                </span>
                <span className="text-sm text-slate-300 flex items-center gap-1">
                  <FaCar /> Carro
                </span>
              </div>

              <div className="flex flex-col relative pl-6 border-l-2 border-dashed border-slate-600 gap-4 mt-2">
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-400" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">
                    Partida
                  </p>
                  <h3 className="font-bold text-lg">{resultado.origem}</h3>
                </div>
                <span className="absolute -left-[5px] bottom-1.5 w-2 h-2 rounded-full bg-[oklch(76.31%_0.097_283.87)]" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">
                    Destino
                  </p>
                  <h3 className="font-bold text-lg">{resultado.destino}</h3>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
                <p className="text-sm text-slate-400 flex items-center gap-2">
                  <FaCalendarAlt /> {resultado.horario}
                </p>
                <span className="text-2xl font-black text-[oklch(76.31%_0.097_283.87)]">
                  {resultado.preco}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
