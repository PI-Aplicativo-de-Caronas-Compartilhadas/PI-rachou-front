import { Bounce, toast } from "react-toastify";

export function Toast(mensagem: string, tipo: string) {

    switch(tipo) {
         case 'sucesso':
            toast.success(mensagem, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: 'dark',
                progress: undefined,
                transition: Bounce,
                closeButton: true
            });
            break;

            case 'erro':
            toast.error(mensagem, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: 'dark',
                progress: undefined,
                transition: Bounce,
                closeButton: true
            });
            break;

            case 'info':
            default:
            toast.info(mensagem, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: 'dark',
                progress: undefined,
                transition: Bounce,
                closeButton: true
            });

    }
};

export default Toast;