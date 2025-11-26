// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assurez-vous que le chemin est correct

/**
 * Composant de Route Protégée basé sur l'authentification et le rôle.
 * @param {string} allowedRoles - Le rôle ou les rôles autorisés (ex: 'organizer', 'participant').
 */
const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();

   // if (!isAuthenticated) {
        // 1. Non authentifié : rediriger vers la page de connexion
      //  return <Navigate to="/login" replace />;
    //}

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // 2. Authentifié mais rôle non autorisé : rediriger vers une page d'accès refusé ou la page d'accueil
        // Nous redirigeons vers la page par défaut de l'utilisateur pour une meilleure expérience
        const defaultPath = user.role === 'organizer' ? '/organizer/dashboard' : '/home';
        return <Navigate to={defaultPath} replace />;
    }

    // 3. Authentifié et rôle autorisé : afficher le contenu de la route
    return <Outlet />;
};

export default ProtectedRoute;