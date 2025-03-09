import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/', // URL de tu API de Flask
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
