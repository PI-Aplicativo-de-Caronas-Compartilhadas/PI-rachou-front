import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Modalidade } from "../../../models/Modalidade";
import Toast from "../../../utils/Toast";
import { AuthContext } from "../../../contexts/AuthContext";
import { deletar } from "../../../services/Service";
import { SpinnerIcon } from "@phosphor-icons/react";

interface DeletarModalidadeProps {
    atualizarLista: () => void;
    idModalidade?: any;   
    fecharModal?: () => void; 
    modalidadeObject?: Modalidade;
}

export function DeletarModalidade({ atualizarLista, idModalidade, fecharModal, modalidadeObject }: DeletarModalidadeProps) {

    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    
    // Inicia o estado com o objeto que já veio do card para evitar a piscada do "buscarPorId"
    const [modalidade] = useState<Modalidade>(modalidadeObject || {} as Modalidade);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    
    useEffect(() => {
        if (token === "") {
            navigate("/");
            Toast("Você precisa estar logado.", "info");
        }
    }, [token]);

    async function deletarModalidade() {
        setIsDeleting(true);

        try {
            await deletar(`/modalidades/${idModalidade}`, {
                headers: {
                    'Authorization': token
                }
            });

            Toast('Modalidade apagada com sucesso.', 'sucesso');
            
            atualizarLista();
            
            if (fecharModal) {
                fecharModal();
            }

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            } else {
                Toast('Erro interno ao deletar a postagem.', 'erro');
            }
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="w-full flex justify-center px-3 sm:px-6 py-4 sm:py-6">
            <div
                className="
                w-full
                max-w-xl
                rounded-3xl
                border
                border-ultrasonic-blue-400/40
                bg-ultrasonic-blue-900/90
                backdrop-blur-xl
                shadow-2xl
                p-4
                sm:p-6
                md:p-10
                "
            >
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-400/90">
                        Excluir Modalidade
                    </h1>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-ultrasonic-blue-100 leading-relaxed">
                        Você tem certeza que deseja excluir permanentemente esta modalidade?
                    </p>
                </div>

                <div className="rounded-2xl overflow-hidden border border-ultrasonic-blue-600/50 bg-ultrasonic-blue-950/60">
                    <header className="px-4 sm:px-6 py-3 sm:py-4 bg-ultrasonic-blue-600/80 text-white font-bold text-lg sm:text-xl">
                        Modalidade
                    </header>

                    <div className="p-4 sm:p-6 space-y-3">
                        <h2 className="text-xl sm:text-2xl font-bold text-white break-words">
                            {modalidade.nome}
                        </h2>
                        <p className="text-ultrasonic-blue-100 text-sm sm:text-base break-words leading-relaxed">
                            {modalidade.descricao}
                        </p>
                    </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 mt-6">
                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => fecharModal && fecharModal()}
                        className="w-full sm:w-[100px] rounded-xl text-white hover:font-semibold py-3 transition-all active:scale-95 disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={deletarModalidade}
                        className="w-full sm:w-auto min-w-[160px] rounded-xl bg-red-700 hover:bg-red-500 text-white font-bold py-3 px-5 shadow-lg shadow-ultrasonic-blue-950/50 transition-all active:scale-95 flex justify-center items-center disabled:bg-red-800/80"
                    >
                        {isDeleting ? (
                            <SpinnerIcon size={20} className="text-white animate-spin" />
                        ) : (
                            <span className="text-sm sm:text-base">
                                Excluir Modalidade
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletarModalidade;