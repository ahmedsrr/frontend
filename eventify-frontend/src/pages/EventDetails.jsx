import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';


export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    api.get(`/events/${id}`)
       .then(res => {
         setEvent(res.data);
         setLoading(false);
       })
       .catch(() => {
         alert("Événement introuvable");
         navigate('/');
       });
  }, [id, navigate]);

  const registerToEvent = async () => {
    try {
      await api.post(`/events/${id}/register`);
      alert("✅ Inscription réussie !");
      navigate('/my-registrations'); // Redirection vers mes inscriptions
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Connectez-vous pour vous inscrire.");
        navigate('/login');
      } else {
        alert(err.response?.data?.message || "Erreur lors de l'inscription");
      }
    }
  };

  if (loading) return <div className="text-center mt-20">Chargement...</div>;

  return (
    <div className="container mx-auto px-6 py-10">
      <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline mb-4">← Retour</button>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
        <img 
          src={`https://picsum.photos/seed/${event.id}/800/300`} 
          alt={event.title} 
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {event.is_public ? 'Public' : 'Privé'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <strong>Date :</strong> {new Date(event.date_time).toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <strong>Lieu :</strong> {event.location}
            </div>
            <div className="flex items-center gap-2">
              <span>👤</span>
              <strong>Organisateur ID :</strong> {event.user_id}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {event.description || "Aucune description fournie."}
            </p>
          </div>

          <div className="border-t pt-6 text-center">
            <button 
              onClick={registerToEvent} 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition shadow-lg transform hover:-translate-y-1"
            >
              S'inscrire à cet événement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

