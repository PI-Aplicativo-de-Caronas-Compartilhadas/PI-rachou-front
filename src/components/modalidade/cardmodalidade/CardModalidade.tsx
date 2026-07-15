import { PencilIcon, TrashIcon } from "@phosphor-icons/react";
import type { Modalidade } from "../../../models/Modalidade";

function CardModalidade ( ) {
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
                Carro
            </h2>
            </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-gray-300 ">
            Viaje com conforto e segurança utilizando transporte particular.
        </p>

        <div className="mt-5 h-px bg-ultrasonic-blue-600" />

        <div className="mt-4 flex justify-end gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-ultrasonic-blue-600 text-white transition hover:bg-ultrasonic-blue-500">
            <PencilIcon size={18} weight="bold" />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white transition hover:bg-red-600">
            <TrashIcon size={18} weight="bold" />
            </button>
        </div>
    </div>
    )
};

export default CardModalidade;