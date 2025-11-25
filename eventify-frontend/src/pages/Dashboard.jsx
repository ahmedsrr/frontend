import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', location: '', date_time: '', is_public: 1 });

  const fetchEvents = () => {
    api.get('/organizer/my-events').then(res => setEvents(res.data));
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events', form);
      alert("Événement créé !");
      setForm({ title: '', description: '', location: '', date_time: '', is_public: 1 });
      fetchEvents();
    } catch (err) {
      alert("Erreur création: " + err.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    if(!confirm("Supprimer cet événement ?")) return;
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) { alert("Erreur suppression"); }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Organisateur</h1>

      {/* Formulaire */}
      <div className="bg-white p-6 rounded shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Créer un événement</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Titre" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Lieu" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required />
          <input className="border p-2 rounded" type="datetime-local" value={form.date_time} onChange={e => setForm({...form, date_time: e.target.value})} required />
          <select className="border p-2 rounded" value={form.is_public} onChange={e => setForm({...form, is_public: e.target.value})}>
            <option value={1}>Public</option>
            <option value={0}>Privé</option>
          </select>
          <textarea className="border p-2 rounded md:col-span-2" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
          <button className="bg-purple-600 text-white py-2 rounded md:col-span-2 hover:bg-purple-700">Publier</button>
        </form>
      </div>

      {/* Liste */}
      <h2 className="text-xl font-semibold mb-4">Mes événements</h2>
      <div className="space-y-4">
        {events.map(evt => (
          <div key={evt.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{evt.title}</h3>
              <p className="text-sm text-gray-600">{new Date(evt.date_time).toLocaleDateString()} - {evt.location}</p>
              <p className="text-xs text-gray-500">Inscrits: {evt.users_count || 0} | Status: {evt.is_public ? 'Public' : 'Privé'}</p>
            </div>
            <button onClick={() => handleDelete(evt.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}