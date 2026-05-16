// ********* Au chargement du site, AuthContext va lire le localStorage, et vérifie si un token existe, et le mettre à jour l'état user.
import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

// 1. Ici : On "extrait" children de l'objet props avec les accolades
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);
    }, []);

    //Login
    const login = async (email, password) => {
        console.log("Login tentative:", email);
        setUser({ email, role: 'user' });
    };
    //Logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Si tu stockes un JWT
        window.location.href = '/login';   // Redirection propre
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!token, loading }}>
            {/* 2. Ici : children représente maintenant les composants à l'intérieur */}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);