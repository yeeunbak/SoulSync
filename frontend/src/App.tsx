import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ChatMain from './pages/ChatMain';
import DiagnosisPick from './pages/DiagnosisPick';
import CrisisSupport from './pages/CrisisSupport'; // ✅ 위기지원 페이지 import 추가
import PSS from './pages/PSS';
import PHQ9 from './pages/PHQ9';
import GAD7 from './pages/GAD7';
import MKPQ16 from './pages/MKPQ16';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChatMain />} />
        <Route path="/diagnosis" element={<DiagnosisPick />} />
        <Route path="/crisis" element={<CrisisSupport />} /> {/* ✅ 위기지원 라우팅 추가 */}
        <Route path="/pss" element={<PSS />} />
        <Route path="/phq9" element={<PHQ9 />} />
        <Route path="/gad7" element={<GAD7 />} />
        <Route path="/mkpq16" element={<MKPQ16 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;