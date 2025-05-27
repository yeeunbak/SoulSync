import axios from 'axios';

export async function login(username: string, password: string) {
  return await axios.post('http://127.0.0.1:8000/user/login', {
    username,
    password,
  });
}