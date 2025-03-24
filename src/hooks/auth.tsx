import React, { ReactNode } from 'react'
import { createContext,useState, useContext } from 'react'
import { MdPassword } from 'react-icons/md';

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}

interface IAuthProviderProps {
    children: ReactNode,
}

const AuthContext =  createContext<IAuthContext> ({} as IAuthContext);

const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
    const [logged, setLogged] = useState<boolean>(() =>{
        const isLogged = localStorage.getItem('@minha-carteira:logged');

            return !! isLogged;

    });

    const signIn = (email:string, password:string) => {
        if(email === "martinho.guilherme13@hotmail.com" && password === "123"){
            localStorage.setItem('@-minha-carteira:logged', 'true');
            setLogged(true);
        }else{
            alert('Senha ou usuário inválidos');
        }
        
    };

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        setLogged(false);
    }
    return (
    <AuthContext.Provider value={{logged, signIn, signOut}}>
        {children}
    </AuthContext.Provider>
    );
}; 

function useAuth(): IAuthContext{
    const context = useContext(AuthContext);
    return context;
};

export {AuthProvider, useAuth  };