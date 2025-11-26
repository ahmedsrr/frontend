import React from 'react';
import { Link } from 'react-router-dom';

const Accueil = () => {
  // Données adaptées pour le Sénégal (Dakar, Saly, etc.)
  const featuredEvents = [
    {
      id: 1,
      title: "Grand Concert de Fin d'Année",
      date: "31 Déc, 2024",
      location: "Monument de la Renaissance, Dakar",
      price: "15 000 FCFA",
      // Image de concert/nuit
      image: "https://images.unsplash.com/photo-1459749411177-0473ef71607b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 2,
      title: "Dakar Tech Summit 2025",
      date: "15 Jan, 2025",
      location: "King Fahd Palace, Dakar",
      price: "Gratuit",
      // Image de conférence business
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 3,
      title: "Festival de Jazz de Saint-Louis",
      date: "24 Mai, 2025",
      location: "Place Faidherbe, Saint-Louis",
      price: "5 000 FCFA",
      // Image d'instrument de musique/jazz
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 4,
      title: "Weekend Détente à Saly",
      date: "10 Fév, 2025",
      location: "Saly Portudal, Mbour",
      price: "30 000 FCFA",
      // Image de plage/ressort
      image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- HERO SECTION --- */}
      {/* J'ai changé la couleur en 'emerald' pour rappeler les couleurs du drapeau ou la nature, 
          mais 'indigo' marche aussi très bien */}
      <header className="bg-emerald-700 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Vibrez au rythme du <span className="text-yellow-400">Sénégal</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-emerald-100">
            Concerts, conférences, festivals... Trouvez les meilleurs événements à Dakar et partout au pays.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link 
              to="/login" 
              className="bg-white text-emerald-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
            >
              Se connecter
            </Link>
            <Link 
              to="/register" 
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-emerald-700 transition duration-300"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </header>

      {/* --- SECTION RECHERCHE --- */}
      <div className="container mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Ex: Concert Youssou N'Dour..." 
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <select className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
            <option value="">Toutes les villes</option>
            <option value="Dakar">Dakar</option>
            <option value="Saint-Louis">Saint-Louis</option>
            <option value="Thiès">Thiès</option>
            <option value="Saly">Saly</option>
            <option value="Ziguinchor">Ziguinchor</option>
          </select>
          <button className="bg-emerald-600 text-white py-3 px-8 rounded-md hover:bg-emerald-700 transition">
            Rechercher
          </button>
        </div>
      </div>

{/* --- LISTE DES ÉVÉNEMENTS --- */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-gray-800">À la une cette semaine</h2>
            <Link to="/events" className="text-emerald-600 font-semibold hover:underline">
                Tout voir &rarr;
            </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {event.price}
                </div>
              </div>
              
              <div className="p-5">
                <div className="text-sm font-semibold text-emerald-600 mb-2 uppercase tracking-wide">
                    {event.date}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
                <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                  📍 {event.location}
                </p>
                <button className="w-full bg-gray-50 text-emerald-700 py-2 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition border border-gray-200">
                  Réserver
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER SIMPLE --- */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="container mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
                <h4 className="text-2xl font-bold text-white">Eventify<span className="text-emerald-500">.sn</span></h4>
                <p className="text-sm mt-2">La plateforme événementielle n°1 au Sénégal.</p>
            </div>
            <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-white transition">À propos</a>
                <a href="#" className="hover:text-white transition">Contact</a>
                <a href="#" className="hover:text-white transition">Mentions Légales</a>
            </div>
        </div>
        <div className="text-center text-xs mt-8 pt-8 border-t border-gray-800">
            &copy; 2024 Eventify Sénégal. Fait à Dakar.
        </div>
      </footer>
    </div>
  );
};

export default Accueil;