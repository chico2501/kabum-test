import axios from 'axios';

const api = axios.create({
  baseURL: 'https://5fcb62dc51f70e00161f189a.mockapi.io/api/v1',
});

export default api;
