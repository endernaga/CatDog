export const BASE_URL = process.env.PUBLIC_URL;

//const apiUrl = process.env.REACT_APP_BACKEND_API;

const isDocker = process.env.DOCKER_ENV === 'docker';

// Умовний оператор для визначення урл
const apiUrl = isDocker
  ? 'http://backend:8000/api'   // У Docker
  : 'http://localhost:8000/api'; // Локально

  const backendUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000'
  : 'http://192.168.x.x:8000';
