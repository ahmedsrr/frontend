// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import api from '../api/apiClient'; // Pour la déconnexion côté serveur

export default function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/logout'); // Appel à l'endpoint de déconnexion Laravel
        } catch (error) {
            // Le serveur peut retourner 401 si le token est déjà expiré, mais on déconnecte quand même côté client
            console.error("Erreur lors de la déconnexion côté serveur :", error);
        }
        
        logout(); // Déconnexion côté client (suppression du token/rôle)
        navigate('/login'); // Rediriger vers la page de connexion
    };

    // Détermine le chemin du tableau de bord en fonction du rôle
    const dashboardPath = user?.role === 'organizer' ? '/organizer/dashboard' : '/home';

    return (
        <header className="bg-gray-900 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                
                {/* Logo / Nom de l'application */}
                <Link to="/" className="text-white text-3xl font-extrabold tracking-wider">Eventify</Link>
                
                {/* Navigation principale */}
                <nav className="space-x-6 flex items-center">
                    
                    {isAuthenticated ? (
                        <>
                            {/* Lien vers le tableau de bord de l'utilisateur (Organisateur ou Participant) */}
                            <Link to={dashboardPath} className="text-gray-300 hover:text-indigo-400 transition duration-150">
                                {user.role === 'organizer' ? 'Mon Dashboard' : 'Mes Événements'}
                            </Link>

                            {/* Nom d'utilisateur ou rôle */}
                            <span className="text-indigo-400 font-medium hidden sm:block">
                                Bienvenue, {user.role}
                            </span>
                            
                            {/* Bouton de Déconnexion */}
                            <button 
                                onClick={handleLogout} 
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition duration-150"
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Liens pour les utilisateurs non connectés */}
                            <Link to="/login" className="text-gray-300 hover:text-white transition duration-150">Connexion</Link>
                            <Link 
                                to="/register" 
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full transition duration-150"
                            >
                                Inscription
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}