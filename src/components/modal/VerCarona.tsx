import { useState } from "react";
import { cidades } from "../../data/cidades";
import { CardResultado } from "./CardCarona";
import { buscarViagens } from "../../services/Service";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { usuario } = useContext(AuthContext);
  const [origem, setOrigem] = useState("");
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  const [destino, setDestino] = useState("");
  const [mostrarSugestoesDestino, setMostrarSugestoesDestino] = useState(false);

  const [passageiros, setPassageiros] = useState("");

  //const [mostrarResultado, setMostrarResultado] = useState(false);

  //const [viagens, setViagens] = useState<any[]>([]);
  const [resultado, setResultado] = useState<any | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrigem(e.target.value);
    setMostrarSugestoes(true);
  };

  const handleChangeDestino = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestino(e.target.value);
    setMostrarSugestoesDestino(true);
  };

  const cidadesFiltradas = cidades.filter((cidade) =>
    cidade.toLowerCase().includes(origem.toLowerCase()),
  );

  const cidadesFiltradasDestino = cidades.filter((cidade) =>
    cidade.toLowerCase().includes(destino.toLowerCase()),
  );

  const normalizarTexto = (texto: string) =>
    texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();

  const procurarCarona = async () => {
    console.log("Botão clicado!");

    const token =
      "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJqb2FvLnNpbHZhQGV4ZW1wbG8uY29tIiwiaWF0IjoxNzg0MjA3NTQ0LCJleHAiOjE3ODQyMTExNDR9.R86XBLRt6AOAhYkskytjBFXf4_HAbDW9tAnrQQD5lu9ma49B9_4zrP6NOcpz1vci";

    const viagens = await buscarViagens("/viagens", token);
    console.log(token);
    console.log(viagens);
    console.log("Origem digitada:", origem);
    console.log("Destino digitado:", destino);
    viagens.forEach((viagem) => {
      console.log(
        viagem.origem,
        viagem.destino,
        viagem.origem.toLowerCase() === origem.toLowerCase(),
        viagem.destino.toLowerCase() === destino.toLowerCase(),
      );
    });

    const viagemEncontrada = viagens.find(
      (viagem) =>
        normalizarTexto(viagem.origem) === normalizarTexto(origem) &&
        normalizarTexto(viagem.destino) === normalizarTexto(destino),
    );
    console.log("Viagem encontrada:", viagemEncontrada);
    setResultado(viagemEncontrada ?? null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-ultrasonic-blue-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-ultrasonic-blue-50 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-ultrasonic-blue-600">
            Buscar Carona
          </h2>
          <button
            onClick={onClose}
            className="text-ultrasonic-blue-300 text-4xl font-bold hover:text-ultrasonic-blue-600"
          >
            &times;
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
            <input
              type="text"
              value={origem}
              onChange={handleChange}
              placeholder="Origem"
              className="p-4 border border-ultrasonic-blue-600 rounded-xl w-full"
            />

            {mostrarSugestoes && origem && (
              <div className="border border-gray-200 rounded-xl bg-white shadow-md max-h-48 overflow-y-auto">
                {cidadesFiltradas.map((cidade) => (
                  <div
                    key={cidade}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setOrigem(cidade);
                      setMostrarSugestoes(false);
                    }}
                  >
                    {cidade}
                  </div>
                ))}
              </div>
            )}

            <input
              type="text"
              placeholder="Destino"
              value={destino}
              onChange={handleChangeDestino}
              className="p-4 border  border-ultrasonic-blue-600 rounded-xl w-full"
            />
          </div>
          {mostrarSugestoesDestino && destino && (
            <div className="border border-gray-200 rounded-xl bg-white shadow-md max-h-48 overflow-y-auto">
              {cidadesFiltradasDestino.map((cidade) => (
                <div
                  key={cidade}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDestino(cidade);
                    setMostrarSugestoesDestino(false);
                  }}
                >
                  {cidade}
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Ida"
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => {
                if (!e.currentTarget.value) {
                  e.currentTarget.type = "text";
                }
              }}
              className="w-full p-4 border  border-ultrasonic-blue-600  rounded-xl"
            />
            <input
              type="text"
              placeholder="Volta"
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => {
                if (!e.currentTarget.value) {
                  e.currentTarget.type = "text";
                }
              }}
              className="w-full p-4 border  border-ultrasonic-blue-600  rounded-xl"
            />
            <select
              value={passageiros}
              onChange={(e) => setPassageiros(e.target.value)}
              className={`p-4 border border-ultrasonic-blue-600 rounded-xl ${
                passageiros ? "text-gray-900" : "text-gray-400"
              }`}
            >
              <option value="" disabled>
                Passageiros
              </option>

              <option value="1">1 adulto</option>
              <option value="2">2 adultos</option>
              <option value="3">3 adultos</option>
              <option value="4">4 adultos</option>
            </select>
          </div>
          <button
            onClick={procurarCarona}
            className="mt-2 w-full bg-ultrasonic-blue-500 text-white py-4 rounded-xl font-bold hover:bg-ultrasonic-blue-600 transition"
          >
            Procurar
          </button>

          {resultado && (
            <CardResultado
              origem={resultado.origem}
              destino={resultado.destino}
              previsaoSaida={resultado.previsaoSaida}
              previsaoChegada={resultado.previsaoChegada}
              distancia={0}
              tempo=""
            />
          )}
        </div>
      </div>
    </div>
  );
}
