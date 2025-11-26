import { useState, useEffect } from 'react';
import api from '../api/apiClient'; // Utilise la configuration Axios

/**
 * Hook personnalisé pour récupérer la liste de tous les événements publics.
 * Ne nécessite pas d'authentification.
 */
export const useFetchPublicEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // L'endpoint est accessible publiquement (configuré dans Laravel)
                const response = await api.get('/events'); 
                setEvents(response.data);
                setError(null);
            } catch (err) {
                setError('Impossible de charger les événements publics.');
                console.error("Erreur API lors de la récupération des événements:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une seule fois

    return { events, loading, error };
};