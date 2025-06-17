import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/chat', // FastAPI chat endpoint
});

export const sendChatMessage = async (
  user_id: string,
  character: string,
  message: string,
  show_emotion_score: boolean = false
) => {
  const response = await API.post('/', {
    user_id,
    character,
    message,
    show_emotion_score,
  });
  return response.data; // { reply: "...", emotion_score: {...} }
};