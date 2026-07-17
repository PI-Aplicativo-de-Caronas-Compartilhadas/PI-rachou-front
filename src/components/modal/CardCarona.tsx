import { MapPin, ArrowDown, Car, Motorcycle } from "@phosphor-icons/react";

interface CardResultadoProps {
  origem: string;
  destino: string;
  modalidade: string;
  preco: number | string;
  previsaoSaida: string;
  previsaoChegada: string;
}

export function CardResultado({
  origem,
  destino,
  modalidade,
  preco,
  previsaoSaida,
  previsaoChegada,
}: CardResultadoProps) {
  const nomeModalidade = modalidade || "Carro";
  const ehMoto = nomeModalidade.toLowerCase() === "moto";

  const precoFormatado =
    typeof preco === "number"
      ? `R$ ${preco.toFixed(2).replace(".", ",")}`
      : preco;

  const formatarData = (data: string) => {
    if (!data) return "Não informado";
    const date = new Date(data);
    return (
      date.toLocaleDateString("pt-BR") +
      " • " +
      date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    // Removi mt-5 para não empurrar o card para fora do modal
    <div className="rounded-2xl border border-ultrasonic-blue-100 bg-ultrasonic-blue-50 shadow-sm overflow-hidden text-slate-900 w-full">
      {/* Header reduzido */}
      <div className="bg-ultrasonic-blue-50 px-4 py-3 border-b flex justify-between items-center">
        <h3 className="text-sm font-bold text-ultrasonic-blue-600">
          Carona disponível
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase bg-slate-800/80 text-slate-300 px-2 py-1 rounded-full inline-flex items-center gap-1">
            {ehMoto ? <Motorcycle size={12} /> : <Car size={12} />}{" "}
            {nomeModalidade}
          </span>
          <span className="text-sm font-black text-ultrasonic-blue-600">
            {precoFormatado}
          </span>
        </div>
      </div>

      {/* Conteúdo com padding ajustado para ser mais compacto */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <MapPin
            size={18}
            weight="fill"
            className="text-ultrasonic-blue-500"
          />
          <div>
            <p className="text-[10px] text-gray-500 uppercase">Origem</p>
            <p className="font-bold text-sm">{origem}</p>
          </div>
        </div>

        <div className="pl-6 text-[10px] text-slate-500 font-medium">
          Saída: {formatarData(previsaoSaida)}
        </div>

        <ArrowDown size={16} className="ml-0.5 text-ultrasonic-blue-400" />

        <div className="flex items-center gap-2">
          <MapPin
            size={18}
            weight="fill"
            className="text-ultrasonic-blue-500"
          />
          <div>
            <p className="text-[10px] text-gray-500 uppercase">Destino</p>
            <p className="font-bold text-sm">{destino}</p>
          </div>
        </div>

        <div className="pl-6 text-[10px] text-slate-500 font-medium">
          Chegada: {formatarData(previsaoChegada)}
        </div>

        <button className="mt-4 w-full rounded-xl bg-ultrasonic-blue-500 py-3 text-white text-sm font-bold transition hover:bg-ultrasonic-blue-600">
          Solicitar carona
        </button>
      </div>
    </div>
  );
}

export default CardResultado;
