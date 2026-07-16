import Popup from "reactjs-popup";
import Formmodalidade from "../formmodalidade/FormModalidade";
import "reactjs-popup/dist/index.css";

export function ModalModalidade() {
    return (
        <>
            <Popup
            trigger={
                <button className='rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                    Nova Postagem
                </button>
            }
            modal
            contentStyle={{
                borderRadius: '1rem',
                paddingBottom: '2rem'
            }}>
                <Formmodalidade />

            </Popup>
        </>
    )
};

export default ModalModalidade;