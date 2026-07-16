import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Modalidade } from "../../../models/Modalidade";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import Toast from "../../../utils/Toast";

interface FormModalidadeProps {
    atualizarLista: () => void;
    idModalidade?: any;    
}

export function FormModalidade({ atualizarLista, idModalidade }: FormModalidadeProps) {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [modalidade, setModalidade] = useState<Modalidade>({
        nome: "",
        descricao: ""
    });

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === "") {
            navigate("/");
            Toast("Você precisa estar logado.", "info");
        }
    }, [token]);

    async function buscarModalidadePorId(id: string) {
        try {
            await buscar(`/modalidades/${id}`, setModalidade, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes("500")) {
                Toast("Erro inesperado ao buscar modalidade.", "erro");
            }
        }
    }

    useEffect(() => {
        if (idModalidade !== undefined) {
            buscarModalidadePorId(idModalidade);
        }
    }, [idModalidade]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setModalidade({
            ...modalidade,
            [e.target.name]: e.target.value
        });
    }

    async function gerarNovaModalidade(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {

            if (idModalidade !== undefined) {

                await atualizar("/modalidades", modalidade, setModalidade, {
                    headers: { Authorization: token }
                });

                Toast("Modalidade alterada com sucesso", "sucesso");

            } else {

                await cadastrar("/modalidades", modalidade, setModalidade, {
                    headers: { Authorization: token }
                });

                Toast("Modalidade cadastrada com sucesso", "sucesso");
            }

            
            atualizarLista();

           
            setModalidade({
                nome: "",
                descricao: ""
            });

        } catch (error: any) {

            if (error.toString().includes("500")) {
                Toast(
                    idModalidade !== undefined
                        ? "Erro inesperado ao atualizar modalidade."
                        : "Erro inesperado ao cadastrar modalidade.",
                    "erro"
                );
            }

        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="container flex flex-col mx-auto items-center">

            <h1 className="text-4xl text-center my-8">
                {idModalidade !== undefined ? "Editar Modalidade" : "Cadastrar Modalidade"}
            </h1>

            <form 
                className="flex flex-col w-1/2 gap-4"
                onSubmit={gerarNovaModalidade}
            >

                <div className="flex flex-col gap-2">
                    <label>Nome da Modalidade</label>

                    <input
                        type="text"
                        placeholder="nome"
                        name="nome"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={modalidade.nome}
                        onChange={atualizarEstado}
                    />
                </div>


                <div className="flex flex-col gap-2">
                    <label>Descrição da Modalidade</label>

                    <input
                        type="text"
                        placeholder="descrição"
                        name="descricao"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={modalidade.descricao}
                        onChange={atualizarEstado}
                    />
                </div>


                <button
                    type="submit"
                    className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                    text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
                    disabled={isLoading}
                >

                    {isLoading ? (
                        <span className="animate-spin inline-block w-4 h-4 border-2
                        border-white border-t-transparent rounded-full">
                        </span>
                    ) : (
                        <span>
                            {idModalidade === undefined ? "Cadastrar" : "Atualizar"}
                        </span>
                    )}

                </button>

            </form>

        </div>
    );
}

export default FormModalidade;