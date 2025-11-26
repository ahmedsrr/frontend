import React from 'react';
import EventCard from '../components/EventCard';
import { useFetchPublicEvents } from '../hooks/useFetchPublicEvents';

export default function PublicHome() {
    const { events, loading, error } = useFetchPublicEvents();

    if (loading) {
        return <div className="text-center py-10 text-xl text-indigo-600">Chargement des événements...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600 font-bold">{error}</div>;
    }

    return (
        <div className="py-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-indigo-600 pb-2">
                Événements Publics
            </h1>
            
            <p className="mb-8 text-gray-600">
                Bienvenue ! Connectez-vous ou inscrivez-vous pour interagir avec ces événements.
            </p>

            {events.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="text-xl text-gray-500">Aucun événement public n'est disponible pour le moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map(event => (
                        <EventCard 
                            key={event.id} 
                            event={event} 
                            // Pas de bouton d'action pour la page publique
                        />
                    ))}
                </div>
            )}
        </div>
    );
}