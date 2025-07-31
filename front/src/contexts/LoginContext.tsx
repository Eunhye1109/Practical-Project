import React from "react";
import { createContext, useContext, useState } from "react";
import { UserDTO, LoginType } from "types/user.types";

interface LoginContextType {
    user: LoginType | null;
    login: (user: LoginType) => void;
    logout: () => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<LoginType | null>(null);

    const login = (userData: LoginType) => {
        setUser(userData);
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