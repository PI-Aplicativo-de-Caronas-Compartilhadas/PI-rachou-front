import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import type { ReactNode } from "react";

interface ModalModalidadeProps {
    atualizarLista?: () => void;
    componente: ReactNode;
    icon: ReactNode;
    idModalidade?: any;
}

export function ModalModalidade({ atualizarLista, componente, idModalidade, icon }: ModalModalidadeProps) {
    return (
        <>
            <Popup
                trigger={
                    <button className='rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                       { icon }
                    </button>
                }
                modal
                contentStyle={{
                    borderRadius: '1rem',
                    paddingBottom: '2rem'
                }}
            >
                {componente}

            </Popup>
        </>
    )
};

export default ModalModalidade;