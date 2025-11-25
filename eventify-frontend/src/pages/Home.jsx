import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appel API pour récupérer les événements
    api.get('/events')
      .then(res => { // <--- C'EST ICI QUE 'res' EST DÉFINI
        console.log("Données reçues:", res.data);
        
        // Sécurisation des données (gestion tableau ou format Laravel paginé)
        let data = [];
        if (Array.isArray(res.data)) {
            data = res.data;
        } else if (res.data && Array.isArray(res.data.data)) {
            data = res.data.data;
        }

        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur:", err);
        setError("Impossible de charger les événements.");
        setLoading(false);
      });
  }, []);

  // Gestion du filtre de recherche
  useEffect(() => {
    if (!events) return;
    const results = events.filter(evt => {
      const title = evt.title ? evt.title.toLowerCase() : '';
      const location = evt.location ? evt.location.toLowerCase() : '';
      const search = searchTerm.toLowerCase();
      return title.includes(search) || location.includes(search);
    });
    setFilteredEvents(results);
  }, [searchTerm, events]);

  const registerToEvent = async (id) => {
    try {
      await api.post(`/events/${id}/register`);
      alert("✅ Inscription réussie !");
    } catch (err) {
      if (err.response?.status === 401) alert("Connectez-vous pour vous inscrire.");
      else alert(err.response?.data?.message || "Erreur lors de l'inscription.");
    }
  };

  // --- AFFICHAGE ---

  if (loading) return <div className="text-center mt-10 text-blue-600 font-bold">Chargement...</div>;
  
  if (error) return <div className="text-center mt-10 text-red-600 font-bold">{error}</div>;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Événements Publics</h1>
        
        {/* Barre de recherche */}
        <input 
          type="text" 
          placeholder="🔍 Rechercher par titre ou lieu..." 
          className="border border-gray-300 p-3 rounded-full w-full max-w-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500">Aucun événement trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredEvents.map(evt => (
            <div key={evt.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
              {/* Image */}
              <img 
                src={evt.image_url ? evt.image_url : `https://picsum.photos/seed/${evt.id}/400/200`} 
                alt={evt.title} 
                className="w-full h-48 object-cover bg-gray-200"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }}
              />
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{evt.title}</h3>
                <p className="text-sm text-gray-500 mb-1">📍 {evt.location}</p>
                <p className="text-sm text-gray-500 mb-4">📅 {evt.date_time ? new Date(evt.date_time).toLocaleDateString() : 'Date non définie'}</p>
                
                <div className="mt-auto flex gap-2">
                  <Link 
                    to={`/events/${evt.id}`} 
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-center font-medium hover:bg-gray-200 transition"
                  >
                    Détails
                  </Link>
                  <button 
                    onClick={() => registerToEvent(evt.id)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition"
                  >
                    S'inscrire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}