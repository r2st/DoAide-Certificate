import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import Verify from './pages/Verify';
import ToolPage from './pages/ToolPage';
import ExperienceLetter from './pages/ExperienceLetter';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor/:templateId" element={<EditorPage />} />
      <Route path="/verify/:certificateId" element={<Verify />} />
      <Route path="/tools/experience-letter-generator" element={<ExperienceLetter />} />
      <Route path="/tools/:slug" element={<ToolPage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  );
}
