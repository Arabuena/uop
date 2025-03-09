import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Log de configuração
console.log('API Configuration:', {
  environment: process.env.NODE_ENV,
  baseURL: api.defaults.baseURL,
  apiUrl: process.env.REACT_APP_API_URL
});

// Interceptor para requisições
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    
    console.log('Making request:', {
      method: config.method,
      url: config.url,
      fullUrl: `${config.baseURL}${config.url}`,
      hasToken: !!token
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  response => {
    console.log('Response Success:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  error => {
    if (error.response) {
      console.error('Response Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url
      });
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 