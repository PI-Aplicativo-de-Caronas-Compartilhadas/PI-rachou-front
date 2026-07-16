import { PencilIcon, TrashIcon } from "@phosphor-icons/react";
import type { Modalidade } from "../../../models/Modalidade";
import FormModalidade from "../formmodalidade/FormModalidade";
import { useState } from "react";
import ModalModalidade from "../modalmodalidade/ModalModalidade";
import DeletarModalidade from "../deletarpostagem/DeletarModalidade";

interface CardModalidadeProps {
    modalidade: Modalidade;
};

function CardModalidade ( { modalidade }: CardModalidadeProps ) {

    const [reload, setReload] = useState(false);

    function atualizarLista() {
    setReload(prev => !prev);
}
    return (

        <div
        className="flex flex-col w-full max-w-sm rounded-2xl border border-ultrasonic-blue-600 bg-ultrasonic-blue-800
        p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-ultrasonic-blue-400
        hover:shadow-2xl sm:max-w-[320px] md:w-[350px]"
        >
            <div className="flex items-start justify-between">
                <div className="min-w-0">
                <span className="rounded-full bg-ultrasonic-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Modalidade
                </span>

            <h2 className="mt-3 truncate text-xl font-bold text-white sm:text-2xl">
                {modalidade.nome}
            </h2>
            </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-gray-300 ">
            {modalidade.nome}
        </p>

        <div className="mt-5 h-px bg-ultrasonic-blue-600" />

        <div className="mt-4 flex justify-end gap-2">

            <div          
                className="flex h-10 w-10 items-center justify-center rounded-xl 
                bg-ultrasonic-blue-600 text-white transition hover:bg-ultrasonic-blue-500">
                <ModalModalidade
                    icon={ <PencilIcon size={18} weight="bold"/> }
                    idModalidade={modalidade.id}
                    componente={<FormModalidade
                    idModalidade={modalidade.id}
                    atualizarLista={atualizarLista}/>}
                />
                
            </div>

            <button
                className="flex h-10 w-10 items-center justify-center rounded-xl
                bg-red-500 text-white transition hover:bg-red-600">
                <ModalModalidade
                icon={ <TrashIcon size={18} weight="bold" /> }
                idModalidade={modalidade.id}
                componente={<DeletarModalidade
                idModalidade={modalidade.id}
                atualizarLista={atualizarLista}/>}
                />                
            </button>

        </div>
    </div>
    )
};

export default CardModalidade;