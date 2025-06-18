import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ChatMain from './pages/ChatMain';
<<<<<<< HEAD
=======
import CharacterPick from './pages/CharacterPick';
import DiagnosisPick from './pages/DiagnosisPick';

import PSS from './pages/PSS';
import PHQ9 from './pages/PHQ9';
import GAD7 from './pages/GAD7';
import MKPQ16 from './pages/MKPQ16';
>>>>>>> 8e2f56b0a443e58cbe5c6501d58ad74c58b8eae8

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChatMain />} />
        <Route path="/pick" element={<CharacterPick />} />
        <Route path="/diag" element={<DiagnosisPick />} />
        <Route path="/pss" element={<PSS />} />
        <Route path="/phq9" element={<PHQ9 />} />
        <Route path="/gad7" element={<GAD7 />} />
        <Route path="/mkpq16" element={<MKPQ16 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
