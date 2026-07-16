import ListaModalidade from "../../components/modalidade/listamodalidade/ListaModalidade";
import ModalModalidade from "../../components/modalidade/modalmodalidade/ModalModalidade";

export function Modalidades() {
    return (
        <div className="flex flex-col">
            <div className="flex p-4 md:px-22 px-16 justify-between mb-4 items-center">
                <header>
                    <h1 className="text-ultrasonic-blue-100 md:text-[2rem] text-md font-semibold">
                        Modalidades
                    </h1>                                
                    <h3 className="text-ultrasonic-blue-100 md:text-md  text-sm font-semibold">
                        Gerencie as modalidades de carona disponíveis no sistema.
                    </h3>
                </header>

                <div              
                className="bg-[oklch(53.13%_0.202_277.03)] hover:bg-[oklch(64.35%_0.151_281.28)]
                text-white text-[11px] xs:text-xs sm:text-sm md:text-base font-semibold
                px-2.5 xs:px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all
                duration-200 shadow-sm whitespace-nowrap">
                    <ModalModalidade />
                </div>                         
            </div>     

            <div className="flex justify-center w-full max-h-screen">
                <ListaModalidade />
            </div>
            

        </div>
        
    )
};