import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:6767/api/v1',
});

export default apiClient;
