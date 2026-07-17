import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React, { type ReactNode } from "react";

interface ModalModalidadeProps {
    atualizarLista?: () => void;
    componente: ReactNode;
    icon: ReactNode;
    idModalidade?: any;
    fecharModal?: () => void;
}

export function ModalModalidade({ componente, icon, fecharModal }: ModalModalidadeProps) {
    return (
        <Popup
        trigger={
            <button>
                {icon}
            </button>
        }
            modal
            contentStyle={{
                width: "90%",
                maxWidth: "500px",
                maxHeight: "500px",
                borderRadius: "1.5rem",
                padding: "0",
                background: "transparent",
                border: "none"
            }}
        >
        {(close) => (
            <>
                {React.cloneElement(componente as React.ReactElement<any>, {
                    fecharModal: close
                })}
            </>
        )}
    </Popup>
    );
}

export default ModalModalidade;