import axios from 'axios';
import { getTokenFromLocalStorage } from '@/utils';

const apiClient = axios.create({
  timeout: 10000,
  // TODO 왜 안되는거지?
  // withCredentials: true
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    const newConfig = { ...config };

    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }

    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;