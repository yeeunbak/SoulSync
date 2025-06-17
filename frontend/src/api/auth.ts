import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/user', // 백엔드 서버 주소
});

export const login = async (username: string, password: string) => {
  return await API.post('/login', { username, password });
};