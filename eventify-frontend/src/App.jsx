// src/App.jsx

// Assurez-vous d'importer tous ces composants et hooks
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Le composant que nous avions défini
import Header from './components/Header'; 
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ParticipantHome from './pages/ParticipantHome'; 
import OrganizerDashboard from './pages/OrganizerDashboard';
import Accueil from './pages/Accueil';



function AppContent() {
    const { isAuthenticated, user } = useAuth();
    const defaultRedirectPath = user && user.role === 'organizer'
    ?'/organizer/dashboard'
    :'/home'
    
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto p-4">
                <Routes>
                    {/* Si l'utilisateur est connecté, il va à /home ou /organizer/dashboard (via le login) 
                        Sinon, la page d'accueil affiche le login. */}
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Accueil />} />
                    
                    {/* ROUTES PROTÉGÉES */}
                    <Route element={<ProtectedRoute allowedRoles={['participant']} />}>
                        <Route path="/participanthome" element={<ParticipantHome />} /> 
                    </Route>
                    <Route element={<ProtectedRoute allowedRoles={['organizer']} />}>
                        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
                    </Route>

                    {/* 404 */}
                    <Route path="*" element={<h1>404 - Page Non Trouvée</h1>} />
                </Routes>
            </main>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </BrowserRouter>
    );
}