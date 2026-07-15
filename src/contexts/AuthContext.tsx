import { createContext, useState, type ReactNode } from "react";
import type usuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

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

    const [usuario, setUsuario] = useState<usuarioLogin>({
        id: 0,
        nome: "",
        email: "",
        telefone: "",
        senha: "",
        foto: "",
        tipo: "",
        token: "" 
    });

    const [ isLoading, setIsLoading ] = useState(false);

    async function handleLogin(usuarioLogin: usuarioLogin) {
        
        setIsLoading(true);

        try {
            await login("/usuarios/logar", usuarioLogin, setUsuario);
            alert("Usuário autenticado com sucesso!");
        } catch(error) {
           alert("Erro ao autenticar usuário.");
        }

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
    };

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading}}>
            {children}
        </AuthContext.Provider>       
    )
};