import { API_URL } from './config';
export const API_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:8000'
  : '${API_URL}';
