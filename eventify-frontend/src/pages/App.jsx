import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyRegistrations from './pages/MyRegistrations';
import EventDetails from './pages/EventDetails';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Garder la connexion active si on rafraîchit la page
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        
        {/* IMPORTANT : On passe user (pour savoir si on est connecté) et setUser (pour se déconnecter) */}
        <Navbar user={user} setUser={setUser} />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events/:id" element={<EventDetails />} />
            
            {/* Si on n'est pas connecté (!user), on affiche Login avec la fonction setUser */}
            <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            
            {/* Routes protégées */}
            <Route path="/dashboard" element={
              user && user.role === 'organizer' ? <Dashboard /> : <Navigate to="/login" />
            } />
            
            <Route path="/my-registrations" element={
              user && user.role === 'participant' ? <MyRegistrations /> : <Navigate to="/login" />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;