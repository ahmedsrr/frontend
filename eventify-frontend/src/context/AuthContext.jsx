
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/apiClient'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // 🎯 INITIALISATION DE L'ÉTAT AVEC LOCAL STORAGE
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const isAuthenticated = !!token;

    // Fonction de connexion qui enregistre les données dans l'état et le localStorage
    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', tokenData);
        // Important: met à jour le token dans l'instance Axios immédiatement
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`; 
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
    };

    // 🎯 EFFET DE BORD POUR LA PERSISTANCE
    // Ce useEffect est essentiel si votre application se réinitialise trop vite.
    useEffect(() => {
        // Optionnel : Vérification de la validité du token à chaque chargement de page.
        // Pour l'instant, nous nous basons sur la simple présence du token.
    }, []); 
    
    // S'assurer que le token dans l'instance Axios est toujours à jour
    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.common['Authorization'];
        }
    }, [token]);


    const value = {
        user,
        token,
        isAuthenticated,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};