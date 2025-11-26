import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 👇 Importation du fichier CSS principal qui contient les directives Tailwind
import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode est recommandé pour le développement
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)