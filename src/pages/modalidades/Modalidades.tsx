import { useState } from "react";
import ListaModalidade from "../../components/modalidade/listamodalidade/ListaModalidades";
import ModalModalidade from "../../components/modalidade/modalmodalidade/ModalModalidade";
import FormModalidade from "../../components/modalidade/formmodalidade/FormModalidade";


export function Modalidades() {

    const [reload, setReload] = useState(false);

    function atualizarLista() {
        setReload(prev => !prev);
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-450px)] flex-1 w-full">
            
            <div className="md:flex p-4 md:px-22 px-16 justify-between mb-4 items-center">
                <header>
                    <h1 className="text-ultrasonic-blue-100 md:text-[2rem] text-md md:mb-0 mb-2 font-semibold">
                        Modalidades
                    </h1>                                
                    <h3 className="text-ultrasonic-blue-100 md:text-md text-sm font-semibold">
                        Gerencie as modalidades de carona disponíveis no sistema.
                    </h3>
                </header>
                
                <div              
                    className="w-full sm:w-auto flex justify-center items-center mt-4 sm:mt-0
                    bg-[oklch(53.13%_0.202_277.03)] hover:bg-[oklch(64.35%_0.151_281.28)]
                    text-white text-[10px] xs:text-xs sm:text-sm md:text-base font-semibold
                    px-3 xs:px-4 sm:px-5 py-2.5 sm:py-2 rounded-lg transition-all
                    duration-200 shadow-sm whitespace-nowrap"
                >
                    <ModalModalidade
                        icon={"Nova Modalidade"}
                        atualizarLista={atualizarLista}
                        componente={<FormModalidade atualizarLista={atualizarLista}/>}
                    />
                </div>                         
            </div>     
            
            <div className="flex justify-center w-full flex-grow pb-8">
                <ListaModalidade
                reload={reload}
                atualizarLista={atualizarLista} />
            </div>
            
        </div>
    );
}

export default Modalidades;