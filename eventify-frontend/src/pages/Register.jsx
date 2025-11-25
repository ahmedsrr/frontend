import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const [form, setForm] = useState({ 
    name: '', email: '', password: '', password_confirmation: '', role: 'participant' 
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', form);
      alert("Compte créé ! Connectez-vous.");
      navigate('/login');
    } catch (err) {
      alert("Erreur : " + (err.response?.data?.message || "Vérifiez vos champs"));
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nom complet" className="w-full border p-2 rounded"
            onChange={e => setForm({...form, name: e.target.value})} required />
          
          <input type="email" placeholder="Email" className="w-full border p-2 rounded"
            onChange={e => setForm({...form, email: e.target.value})} required />
          
          <input type="password" placeholder="Mot de passe (min 6)" className="w-full border p-2 rounded"
            onChange={e => setForm({...form, password: e.target.value})} required />
            
          <input type="password" placeholder="Confirmer mot de passe" className="w-full border p-2 rounded"
            onChange={e => setForm({...form, password_confirmation: e.target.value})} required />
          
          <select className="w-full border p-2 rounded bg-white"
            onChange={e => setForm({...form, role: e.target.value})}>
            <option value="participant">Participant</option>
            <option value="organizer">Organisateur</option>
          </select>

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Créer mon compte</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Déjà un compte ? <Link to="/login" className="text-blue-600">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}