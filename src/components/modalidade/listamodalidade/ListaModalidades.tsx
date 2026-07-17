import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Modalidade } from "../../../models/Modalidade";
import { AuthContext } from "../../../contexts/AuthContext";
import Toast from "../../../utils/Toast";
import { buscar } from "../../../services/Service";
import CardModalidade from "../cardmodalidade/CardModalidade";
import { SpinnerIcon } from "@phosphor-icons/react";

interface ListaModalidadesProps {
    reload: boolean;
    atualizarLista: () => void;
}

export function ListaModalidades({ reload, atualizarLista }: ListaModalidadesProps) {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [modalidades, setModalidades] = useState<Modalidade[]>([]);

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === "") {
            navigate("/");
            Toast("Você precisa estar logado.", "info");
        }
    }, [token]);

    useEffect(() => {
        buscarModalidades();
    }, [reload]);

    async function buscarModalidades() {
        setIsLoading(true);

        try {
            await buscar("/modalidades", setModalidades, {
                headers: { Authorization: token }
            });

        } catch (error: any) {
            if (error.toString().includes("500")) {
                Toast("Erro inesperado ao buscar modalidades", "erro");
            }

        } finally {
            setIsLoading(false);
        }
    }


    return (
        
        <div className="flex flex-col items-center w-[85%]">
            {modalidades.length === 0 && !isLoading && (
            <div className="flex justify-center items-center w-[85%] mt-6">
                <p className="text-white">
                    Sem Modalidades encontradas, cadastre através do botão.
                </p>
            </div>
            
        )
            
        }     

       {!isLoading && modalidades.length > 0 ? (
        
        <div className="flex flex-wrap justify-center sm:justify-start items-start w-full gap-8 bg-ultrasonic-blue-200/10 backdrop-blur-xl border
            border-ultrasonic-blue-400/50 text-ultrasonic-blue-100 p-8">

            {modalidades.map((mod) => (
                <CardModalidade 
                    key={mod.id} 
                    modalidade={mod}
                    atualizarLista={atualizarLista}
                />
            ))}

        </div>

       ) : ( isLoading &&

        <div className="flex justify-center items-center w-full gap-2 text-ultrasonic-blue-100 p-8">
            <p className="animate-pulse">Carregando...</p>
            <SpinnerIcon size={34} className="animate-spin font-bold"/>
        </div>
       )}            

    </div>
);
}

export default ListaModalidades;