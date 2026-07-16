import { createContext, useState, type ReactNode } from "react";
import type usuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import Toast from "../utils/Toast";

interface AuthContextProps {
    usuario: usuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: usuarioLogin): Promise<void>;
    isLoading: boolean;
};

interface AuthProviderProps {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {   

    const [usuario, setUsuario] = useState<usuarioLogin>(() => {

        const usuarioStorage = localStorage.getItem("usuario");

        if (usuarioStorage) {
            console.log(usuarioStorage);          
            return JSON.parse(usuarioStorage);          
        }

        return {
            id: 0,
            nome: "",
            email: "",
            telefone: "",
            senha: "",
            foto: "",
            tipo: "",
            token: "" 
        }        
    });

    const [ isLoading, setIsLoading ] = useState(false);

    async function handleLogin(usuarioLogin: usuarioLogin) {
        
        setIsLoading(true);

        await login("/usuarios/logar", usuarioLogin, setUsuario);

        setIsLoading(false);

    };

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            email: "",
            telefone: "",
            senha: "",
            foto: "",
            tipo: "",
            token: "" 
        })
        
        localStorage.removeItem("usuario");

        Toast("Você foi desconectado com sucesso.", "sucesso");
    };

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading}}>
            {children}
        </AuthContext.Provider>       
    )
};