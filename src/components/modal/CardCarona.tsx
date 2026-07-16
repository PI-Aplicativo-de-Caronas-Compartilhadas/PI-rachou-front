import { MapPin, ArrowDown, ClockCountdown } from "@phosphor-icons/react";

interface CardResultadoProps {
  origem: string;
  destino: string;
  distancia: number;
  previsaoSaida: string;
  previsaoChegada: string;
  tempo: string;
}

// Componente para exibir data e hora formatadas
const InfoData = ({ data }: { data: string }) => (
  <div className="flex items-center gap-2 text-right">
    <ClockCountdown size={18} className="text-ultrasonic-blue-500" />
    <div>
      <p className="font-semibold text-sm">
        {new Date(data).toLocaleDateString("pt-BR")}
      </p>
      <p className="font-bold text-lg leading-none">
        {new Date(data).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  </div>
);

export function CardResultado({
  origem,
  destino,
  previsaoSaida,
  previsaoChegada,
}: CardResultadoProps) {
  return (
    <div className="mt-5 rounded-2xl border border-ultrasonic-blue-100 bg-ultrasonic-blue-50 shadow-sm overflow-hidden">
      <div className="bg-ultrasonic-blue-50 px-6 py-4 border-b">
        <h3 className="text-lg font-bold text-ultrasonic-blue-600">
          Carona disponível
        </h3>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-6">
          {/* Linha Origem + Saída */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <MapPin
                size={22}
                weight="fill"
                className="text-ultrasonic-blue-500"
              />
              <div>
                <p className="text-xs text-gray-500 uppercase">Origem</p>
                <p className="font-bold text-lg">{origem}</p>
              </div>
            </div>
            <InfoData data={previsaoSaida} />
          </div>

          <ArrowDown size={22} className="ml-1 text-ultrasonic-blue-400" />

          {/* Linha Destino + Chegada */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <MapPin
                size={22}
                weight="fill"
                className="text-ultrasonic-blue-500"
              />
              <div>
                <p className="text-xs text-gray-500 uppercase">Destino</p>
                <p className="font-bold text-lg">{destino}</p>
              </div>
            </div>
            <InfoData data={previsaoChegada} />
          </div>
        </div>

        <button className="mt-8 w-full rounded-xl bg-ultrasonic-blue-500 py-4 text-white font-bold transition hover:bg-ultrasonic-blue-600">
          Solicitar carona
        </button>
      </div>
    </div>
  );
}
