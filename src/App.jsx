import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import Verify from './pages/Verify';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor/:templateId" element={<EditorPage />} />
      <Route path="/verify/:certificateId" element={<Verify />} />
    </Routes>
  );
}
