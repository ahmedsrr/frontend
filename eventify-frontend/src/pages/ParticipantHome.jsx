// src/pages/ParticipantHome.jsx
import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import api from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

export default function ParticipantHome() {
    const { user } = useAuth();
    const [publicEvents, setPublicEvents] = useState([]);
    const [myRegistrations, setMyRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Événements Publics (nécessite le token si c'est la page d'accueil)
                const publicRes = await api.get('/events');
                setPublicEvents(publicRes.data);
                
                // 2. Mes inscriptions (nécessite le token)
                const registrationsRes = await api.get('/participant/my-registrations');
                setMyRegistrations(registrationsRes.data);
                
                setError(null);
            } catch (err) {
                setError("Impossible de charger les données. Vérifiez l'API.");
                console.error("Erreur de récupération de données:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fonction d'inscription (à implémenter)
    const handleRegister = (eventId) => {
        alert(`Inscription à l'événement ${eventId} - Fonctionnalité à implémenter!`);
        // Ici, vous feriez l'appel api.post('/participant/register', { event_id: eventId })
    };

    if (loading) {
        return <div className="text-center py-10 text-xl text-indigo-600">Chargement des événements et de vos inscriptions...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600 font-bold">{error}</div>;
    }

    // Filtre les événements publics pour exclure ceux auxquels l'utilisateur est déjà inscrit
    const registeredEventIds = myRegistrations.map(reg => reg.event_id);
    const availableEvents = publicEvents.filter(event => !registeredEventIds.includes(event.id));

    return (
        <div className="py-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-indigo-600 pb-2">
                Bienvenue, {user.name} !
            </h1>

            {/* Section Mes Inscriptions */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 mt-10">Mes Inscriptions ({myRegistrations.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {myRegistrations.length > 0 ? (
                    myRegistrations.map(registration => (
                        <EventCard 
                            key={registration.id} 
                            event={registration.event} 
                            buttonText="Se Désinscrire"
                            onActionClick={() => alert('Désinscription à implémenter')}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full">Vous n'êtes inscrit à aucun événement pour le moment.</p>
                )}
            </div>
            
            {/* Section Événements Publics Disponibles */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-t pt-6">Événements Publics Disponibles ({availableEvents.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {availableEvents.length > 0 ? (
                    availableEvents.map(event => (
                        <EventCard 
                            key={event.id} 
                            event={event}
                            buttonText="S'inscrire"
                            onActionClick={() => handleRegister(event.id)}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full">Toutes les événements publics ont été consultés.</p>
                )}
            </div>
        </div>
    );
}