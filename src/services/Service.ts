import axios from "axios";

const api = axios.create({
  baseURL: "https://rachou.onrender.com",
});

export const cadastrarUsuario = async (
  url: string,
  dados: Object,
  setDados: Function,
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const buscar = async (
  url: string,
  setDados: Function,
  dados: Object,
) => {
  const resposta = await api.get(url, dados);
  setDados(resposta.data);
};

export const buscarViagens = async (
  url: string,
  token: string,
): Promise<any[]> => {
  const resposta = await api.get(url, {
    headers: {
      Authorization: token,
    },
  });

  return resposta.data;
};
