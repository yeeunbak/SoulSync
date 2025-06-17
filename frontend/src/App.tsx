import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ChatMain from './pages/ChatMain';
import CharacterPick from './pages/CharacterPick';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChatMain />} />
        <Route path="/pick" element={<CharacterPick />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
