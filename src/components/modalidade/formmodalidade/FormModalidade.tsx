import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Modalidade } from "../../../models/Modalidade";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, cadastrar } from "../../../services/Service";
import Toast from "../../../utils/Toast";
import { SpinnerIcon } from "@phosphor-icons/react";

interface FormModalidadeProps {
    atualizarLista: () => void;
    idModalidade?: any;
    fecharModal?: () => void;
    modalidadeObject?: Modalidade;
}

export function FormModalidade({ atualizarLista, idModalidade, fecharModal, modalidadeObject }: FormModalidadeProps) {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    
    const [modalidade, setModalidade] = useState<Modalidade>(
        modalidadeObject || { nome: "", descricao: "" }
    );

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === "") {
            navigate("/");
            Toast("Você precisa estar logado.", "info");
        }
    }, [token]);

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
            if (fecharModal) fecharModal();

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
        <div className="w-full flex justify-center px-4 sm:px-6 py-6">
            <div
                className="
                w-full
                max-w-2xl
                rounded-3xl
                border
                border-ultrasonic-blue-400/40
                bg-ultrasonic-blue-900/90
                backdrop-blur-xl
                shadow-2xl
                p-6
                sm:p-10
                "
            >
                <div className="text-center mb-8">
                    <span
                        className="
                        inline-flex
                        items-center
                        justify-center
                        text-xs
                        uppercase
                        tracking-wider
                        font-bold
                        text-ultrasonic-blue-200
                        bg-ultrasonic-blue-600/30
                        border
                        border-ultrasonic-blue-500/30
                        rounded-full
                        px-5
                        py-2
                        mb-5
                        "
                    >
                        Modalidade
                    </span>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                        {idModalidade !== undefined ? "Editar Modalidade" : "Cadastrar Modalidade"}
                    </h1>
                </div>

                <form className="flex flex-col gap-6 w-full" onSubmit={gerarNovaModalidade}>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-ultrasonic-blue-100">
                            Nome da Modalidade
                        </label>
                        <input
                            type="text"
                            placeholder="Ex: Carro"
                            name="nome"
                            required
                            disabled={isLoading}
                            className="
                            w-full
                            bg-ultrasonic-blue-950/80
                            border
                            border-ultrasonic-blue-600/70
                            rounded-xl
                            px-5
                            py-4
                            text-white
                            placeholder:text-slate-500
                            outline-none
                            focus:border-ultrasonic-blue-300
                            focus:ring-2
                            focus:ring-ultrasonic-blue-500/30
                            transition-all
                            disabled:opacity-50
                            "
                            value={modalidade.nome}
                            onChange={atualizarEstado}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-ultrasonic-blue-100">
                            Descrição da Modalidade
                        </label>
                        <input
                            type="text"
                            placeholder="Viagens rápidas e econômicas."
                            name="descricao"
                            required
                            disabled={isLoading}
                            className="
                            w-full
                            bg-ultrasonic-blue-950/80
                            border
                            border-ultrasonic-blue-600/70
                            rounded-xl
                            px-5
                            py-4
                            text-white
                            placeholder:text-slate-500
                            outline-none
                            focus:border-ultrasonic-blue-300
                            focus:ring-2
                            focus:ring-ultrasonic-blue-500/30
                            transition-all
                            disabled:opacity-50
                            "
                            value={modalidade.descricao}
                            onChange={atualizarEstado}
                        />
                    </div>

                    <div className="w-full flex items-center justify-center gap-8">
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => fecharModal && fecharModal()}
                            className="
                            w-[100px]
                            rounded-xl
                            text-white
                            hover:font-semibold
                            py-2
                            shadow-lg
                            shadow-ultrasonic-blue-950/50
                            transition-all
                            active:scale-95
                            disabled:opacity-50
                            "
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="                        
                            rounded-xl
                            bg-ultrasonic-blue-500
                            hover:bg-ultrasonic-blue-400
                            text-white
                            font-bold
                            py-4
                            px-4                      
                            shadow-lg
                            shadow-ultrasonic-blue-950/50
                            transition-all
                            active:scale-95
                            min-w-[180px]
                            flex
                            justify-center
                            items-center
                            disabled:bg-ultrasonic-blue-700
                            "
                        >
                            {isLoading ? (
                                <SpinnerIcon size={20} className="text-white animate-spin" />
                            ) : (
                                idModalidade !== undefined ? "Atualizar Modalidade" : "Cadastrar Modalidade"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormModalidade;