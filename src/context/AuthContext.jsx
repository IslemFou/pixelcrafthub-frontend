import { createContext, useState } from 'react';

export const AuthContext = createContext();

// 1. Ici : On "extrait" children de l'objet props avec les accolades
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        console.log("Login tentative:", email);
        setUser({ email, role: 'user' });
    };

    return (
        <AuthContext.Provider value={{ user, login }}>
            {/* 2. Ici : children représente maintenant les composants à l'intérieur */}
            {children}
        </AuthContext.Provider>
    );
};