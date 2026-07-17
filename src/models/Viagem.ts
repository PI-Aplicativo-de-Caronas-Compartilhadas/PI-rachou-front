import type { Modalidade } from "./Modalidade";
import type usuario from "./Usuario";

export interface Viagem{
id: number;
origem: string;
destino: string;
preco: number;
previsaoSaida: string;
previsaoChegada: string;
status: string;
modalidade: Modalidade | null;
usuario: usuario | null;

}