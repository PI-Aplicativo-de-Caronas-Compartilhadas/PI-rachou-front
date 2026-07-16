import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Modalidade } from "../../../models/Modalidade";
import Toast from "../../../utils/Toast";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";

interface DeletarModalidadeProps {
    atualizarLista: () => void;
    idModalidade?: any;    
}

export function DeletarModalidade( {atualizarLista, idModalidade } : DeletarModalidadeProps) {

    const navigate = useNavigate()

    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ modalidade, setModalidade ] = useState<Modalidade>({} as Modalidade);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    
    useEffect(() => {
        if (token === "") {
            navigate("/");
            Toast("Você precisa estar logado.", "info");
        }
    }, [token]);

    useEffect(() => {
        if (idModalidade !== undefined) {
            buscarPorId(idModalidade)
        }
    }, [idModalidade]);

    async function buscarPorId(id: string) {
        try {
            await buscar(`/modalidades/${id}`, setModalidade, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }
    };

    async function deletarModalidade() {
        setIsLoading(true);

        try {
            await deletar(`/modalidades/${idModalidade}`, {
                headers: {
                    'Authorization': token
                }
            });

            Toast('Modalidade apagada com sucesso.', 'sucesso');

        } catch (error: any) {
            if (error.toString().includes('500')) {
                handleLogout()
            }else {
                Toast('Erro interno ao deletar a postagem.', 'erro');
            }
        }

        atualizarLista();

        setIsLoading(false);

    }

    return (        
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Modalidade</h1>

            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar a Modalidade a seguir?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Modalidade
                </header>
                <div className="p-4">
                    <p className='text-xl h-full'>{modalidade.nome}</p>
                    <p>{modalidade.descricao}</p>
                </div>
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        >
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-indigo-400 
                        hover:bg-indigo-600 flex items-center justify-center'
                        onClick={deletarModalidade}>

                        { isLoading ? 
                            <span className="animate-spin inline-block w-4 h-4 border-2
                            border-white border-t-transparent rounded-full">
                            </span> : 
                            <span>Sim</span>
                        }                        
                    </button>
                </div>
            </div>
        </div>
    )
};

export default DeletarModalidade;