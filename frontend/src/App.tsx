import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ChatMain from './pages/ChatMain';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChatMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
