// src/components/EventCard.jsx
import React from 'react';

/**
 * Fonction utilitaire pour générer un ID aléatoire basé sur l'ID de l'événement.
 * Cela assure qu'une même carte a toujours la même image, mais des cartes différentes ont des images différentes.
 * Nous utilisons l'ID de l'événement comme graine pour l'aléatoire (seed).
 * @param {number} seed - L'ID de l'événement
 */
const generateRandomImageSeed = (seed) => {
    // Utiliser l'ID de l'événement comme base pour un nombre pseudo-aléatoire stable
    // Un grand nombre premier (par exemple 997) permet d'obtenir une bonne distribution
    return (seed * 997) % 1000; 
};

/**
 * Composant de carte pour afficher les détails d'un événement.
 */
export default function EventCard({ event, buttonText, onActionClick, participantCount }) {
    
    const formattedDate = new Date(event.date_time).toLocaleDateString('fr-FR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    
    // 🎯 LOGIQUE DE L'IMAGE ALÉATOIRE
    // 1. Générer une graine (seed) stable basée sur l'ID de l'événement
    const imageSeed = generateRandomImageSeed(event.id);
    
    // 2. Construire l'URL de Picsum pour une image aléatoire (taille 400x200, basée sur la seed)
    const imageUrl = `https://picsum.photos/seed/${imageSeed}/400/200`;


    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl">
            
            {/* 🖼️ BLOC DE L'IMAGE ALÉATOIRE */}
            <img 
                src={imageUrl} 
                alt={`Image pour l'événement ${event.title}`} 
                className="w-full h-48 object-cover" 
            />

            <div className="p-6">
                
                {/* Statut (pour l'organisateur ou public) */}
                {participantCount !== undefined ? (
                    <div className="text-sm font-semibold mb-2 text-indigo-600">
                        {event.is_public ? 'Événement Public' : 'Événement Privé'}
                    </div>
                ) : (
                    <div className="text-sm font-semibold mb-2 text-gray-500">
                        Événement Public
                    </div>
                )}

                {/* Titre et Description */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                {/* ... Reste du contenu de la carte ... */}
                
                <div className="space-y-2 text-sm text-gray-700">
                    <p>
                        <i className="fas fa-calendar-alt text-indigo-500 mr-2"></i>
                        Date : <span className="font-medium">{formattedDate}</span>
                    </p>
                    <p>
                        <i className="fas fa-map-marker-alt text-indigo-500 mr-2"></i>
                        Lieu : <span className="font-medium">{event.location}</span>
                    </p>

                    {/* Affichage spécifique pour l'organisateur */}
                    {participantCount !== undefined && (
                        <p className="text-lg font-bold text-green-600">
                            <i className="fas fa-users mr-2"></i>
                            Inscrits : {participantCount}
                        </p>
                    )}
                </div>

                {/* Bouton d'Action */}
                {onActionClick && (
                    <button
                        onClick={onActionClick}
                        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition duration-150 shadow-md hover:shadow-lg"
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
}