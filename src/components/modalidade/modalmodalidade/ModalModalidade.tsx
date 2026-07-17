import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React, { type ReactNode } from "react";

interface ModalModalidadeProps {
    atualizarLista?: () => void;
    componente: React.ReactElement;
    icon: ReactNode;
    idModalidade?: any;
}

export function ModalModalidade({ componente, icon }: ModalModalidadeProps) {
    const renderPopupContent = (close: () => void) =>
        React.cloneElement(componente as React.ReactElement, {
            fecharModal: close,
        });

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
                border: "none",
            }}
        >
            {renderPopupContent as unknown as ReactNode}
        </Popup>
    );
}

export default ModalModalidade;