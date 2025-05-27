import axios from 'axios';

export async function login(username: string, password: string) {
  const response = await axios.post('http://localhost:8000/user/login', {
    username,
    password,
  });
  return response;
}