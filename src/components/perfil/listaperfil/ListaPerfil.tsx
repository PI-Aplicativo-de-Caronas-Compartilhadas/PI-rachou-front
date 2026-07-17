import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Toast from "../../../utils/Toast";

export function ListaPerfil() {

    const navigate = useNavigate();

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === "") {
            navigate("/");
            Toast("Faça login para acessar o perfil.", "info");
        }
    }, [token]);

    return (
       <div className="w-[90vw] xs:w-full max-w-[360px] md:max-w-[380px] bg-[#0c0c24]/90 backdrop-blur-md rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden">
    
    <div className="h-16 w-full bg-gradient-to-r from-[#191980] via-[#2222a0] to-[#0c0c24] opacity-80" />

    <div className="flex w-full flex-col items-center px-6 pb-8 -mt-12">
        <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-cyan-400 to-[#191980] blur-sm opacity-75" />
            <div className="relative p-[3px] rounded-full bg-slate-900">
                <img
                    src={usuario.foto} 
                    alt="Foto do usuário"
                    className="rounded-full w-24 h-24 md:w-28 md:h-28 object-cover border border-white/10"
                />
            </div>
        </div>

        <div className="text-center mt-4 w-full">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">
                Meu Perfil
            </span>
            <h2 className="text-white font-bold text-xl md:text-2xl tracking-tight mt-1 mb-6">
                Informações de Registro
            </h2>
        </div>

        <div className="w-full space-y-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 mb-6">
            
            <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                    Nome Completo
                </span>
                <span className="text-white text-sm md:text-base font-medium mt-0.5 truncate">
                    {usuario.nome}
                </span>
            </div>

            <div className="h-px bg-white/[0.05]" />

            <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                    Endereço de E-mail
                </span>
                <span className="text-white text-sm md:text-base font-medium mt-0.5 break-all">
                    {usuario.email}
                </span>
                
                
            </div>

            <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                    Telefone
                </span>
                <span className="text-white text-sm md:text-base font-medium mt-0.5 break-all">
                    {usuario.telefone || "Telefone não informado"}
                </span>                    
            </div>

            <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                    Tipo de conta
                </span>
                <span className="text-white text-sm md:text-base font-medium mt-0.5 break-all">
                    {usuario.tipo || "Tipo não informado"}
                </span>                    
            </div>

            <div className="h-px bg-white/[0.05]" />

        </div>

        <img 
            src="/logo.png" 
            alt="Logo Rachou" 
            className="h-24 sm:h-32 w-auto object-contain brightness-0 invert -my-4 sm:-my-6 origin-left transition-all" 
        />
       

    </div>            
</div>
    )
};

export default ListaPerfil;