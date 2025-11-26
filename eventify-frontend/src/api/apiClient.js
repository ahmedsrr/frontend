import axios from 'axios';

const api = axios.create({
    // URL de votre backend Laravel
    baseURL: 'http://localhost:8000/api', 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    // Très important pour Laravel Sanctum (envoie le token dans le header)
    withCredentials: true, 
});

// Intercepteur : Ajoute le Token Bearer à chaque requête
api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = 'Bearer ${token};' 
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;