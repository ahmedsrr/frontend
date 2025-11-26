// src/pages/OrganizerDashboard.jsx
import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import api from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

export default function OrganizerDashboard() {
    const { user } = useAuth();
    const [myEvents, setMyEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                // Endpoint protégé pour récupérer les événements de cet organisateur
                const response = await api.get('/organizer/my-events');
                setMyEvents(response.data.events); // Assurez-vous que l'API renvoie les événements dans un tableau 'events'
                setError(null);
            } catch (err) {
                setError("Impossible de charger vos événements. Vérifiez l'API et l'authentification.");
                console.error("Erreur de récupération de données organisateur:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyEvents();
    }, []);

    // Fonction pour voir les participants (à implémenter)
    const handleViewParticipants = (eventId) => {
        alert(`Voir les participants pour l'événement ${eventId} - Fonctionnalité à implémenter!`);
    };

    if (loading) {
        return <div className="text-center py-10 text-xl text-indigo-600">Chargement de votre Dashboard...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600 font-bold">{error}</div>;
    }

    return (
        <div className="py-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-indigo-600 pb-2">
                Tableau de Bord de l'Organisateur
            </h1>
            <p className="mb-8 text-lg text-gray-700">Bienvenue, {user.name}. Gérez vos événements ci-dessous.</p>

            {myEvents.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="text-xl text-gray-500">Vous n'avez pas encore créé d'événement.</p>
                    {/* Ajoutez un bouton pour créer un événement ici */}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myEvents.map(event => (
                        <EventCard 
                            key={event.id} 
                            event={event} 
                            buttonText="Voir les Participants"
                            onActionClick={() => handleViewParticipants(event.id)}
                            participantCount={event.participants_count || 0} // Assurez-vous que l'API compte les participants
                        />
                    ))}
                </div>
            )}
        </div>
    );
}