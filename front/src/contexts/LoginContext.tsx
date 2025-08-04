import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginType } from "types/user.types";

interface LoginContextType {
    user: LoginType | null;
    login: (user: LoginType) => void;
    logout: () => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({children}: {children: React.ReactNode}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<LoginType | null>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');

        if(storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData: LoginType) => {
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <LoginContext.Provider value={{user, login, logout}}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (!context) throw new Error();
    return context;
}