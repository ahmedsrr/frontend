// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/apiClient';

export default function Register() {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        password_confirmation: '', 
        role: 'participant', 
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // Nouveau Hook pour le message de succès
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null); // Réinitialiser le message de succès
        
        if (formData.password !== formData.password_confirmation) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            // 🎯 APPEL API : /register
            await api.post('/register', formData);
            
            // 🎯 NOUVELLE RÈGLE : Redirection vers la page de connexion
            setSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");

            // Rediriger après un court délai pour que l'utilisateur voie le message de succès
            setTimeout(() => {
                navigate('/login');
            }, 1500); 
            
        } catch (err) {
            // Gérer les erreurs de validation du backend
            const apiError = err.response?.data?.message || "Erreur d'inscription. Veuillez vérifier vos données.";
            setError(apiError);
            console.error("Erreur d'inscription:", err.response?.data || err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen-minus-header bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Inscription</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Message d'erreur/succès */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{success}</span>
                        </div>
                    )}

                    {/* ... Le reste des champs de formulaire (Nom, Email, Mdp, Confirmation, Rôle) est inchangé ... */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet</label>
                        <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse Email</label>
                        <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
</div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirmer Mot de passe</label>
                        <input id="password_confirmation" name="password_confirmation" type="password" required value={formData.password_confirmation} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Je m'inscris en tant que :</label>
                        <select id="role" name="role" required value={formData.role} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="participant">Participant</option>
                            <option value="organizer">Organisateur</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150">
                        S'inscrire
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Déjà un compte ?{' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Connectez-vous
                    </Link>
                </p>
            </div>
        </div>
    );
}