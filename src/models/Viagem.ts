import type { Modalidade } from "./Modalidade";
import type usuario from "./Usuario";

export interface Viagem {
  id: number;
  origem: string;
  destino: string;
  dataHora: string; // ou Date dependendo de como trata na API
  preco: number;
  vagas: number;
  motorista?: usuario;
  modalidade?: Modalidade;
}