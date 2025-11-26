// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/apiClient';
import Accueil from '../Accueil';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // 1. Appel API pour la connexion
            const response = await api.post('/login', credentials);
            const { user, token } = response.data;
            
            // 2. Mise à jour du contexte d'authentification
            login(user, token); 
            
            // 3. Redirection basée sur le rôle
            const redirectPath = user.role === 'organizer' ? '/organizer/dashboard' : '/home';
            navigate(redirectPath);
            
        } catch (err) {
            // Gérer les erreurs de connexion (ex: identifiants incorrects)
            setError('Identifiants incorrects ou utilisateur non trouvé.');
            console.error('Erreur de connexion:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen-minus-header bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Connexion</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Message d'erreur */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Champ Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={credentials.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    
                    {/* Champ Mot de passe */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={credentials.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Bouton de soumission */}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
                    >
                        Se Connecter
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Pas encore de compte?{' '}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Inscrivez-vous ici
                    </Link>
                </p>
            </div>
        </div>
    );
}