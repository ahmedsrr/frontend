import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    // 1. On vide le navigateur
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // 2. On vide l'état React (App.jsx va se mettre à jour)
    setUser(null);
    // 3. Retour accueil ou login
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50 px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">Eventify</Link>
        
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Accueil</Link>

          {/* --- LA CONDITION MAGIQUE EST ICI --- */}
          {user ? (
            // SI CONNECTÉ : On affiche Dashboard + Déconnexion
            <div className="flex items-center gap-4">
              {user.role === 'organizer' ? (
                <Link to="/dashboard" className="text-purple-600 font-bold">Dashboard</Link>
              ) : (
                <Link to="/my-registrations" className="text-green-600 font-bold">Mes Billets</Link>
              )}
              
              <span className="text-gray-400 text-sm hidden md:inline">| {user.name}</span>
              
              <button 
                onClick={logout} 
                className="bg-red-50 text-red-600 px-3 py-1 rounded border border-red-200 hover:bg-red-100 text-sm font-bold"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            // SI NON CONNECTÉ : On affiche Connexion + Inscription
            <div className="flex gap-3">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Connexion</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700">Inscription</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}