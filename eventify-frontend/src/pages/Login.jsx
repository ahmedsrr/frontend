import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

// IMPORTANT : Les accolades { } ici !
export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await api.post('/auth/login', { email, password });
      
      const token = res.data.access_token || res.data.token;
      const userData = res.data.user;

      if (token && userData) {
        // 1. Sauvegarde
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // 2. Mise à jour de App.jsx (qui mettra à jour Navbar)
        setUser(userData); 

        // 3. Redirection
        if (userData.role === 'organizer') navigate('/dashboard');
        else navigate('/');
      }
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 border rounded" 
            onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" className="w-full p-3 border rounded" 
            onChange={e => setPassword(e.target.value)} required />
          <button className="w-full bg-blue-600 text-white py-3 rounded font-bold">Se connecter</button>
        </form>
        <p className="mt-4 text-center text-sm">
            Pas de compte ? <Link to="/register" className="text-blue-600 font-bold">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}