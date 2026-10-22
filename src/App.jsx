import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const EditorPage = lazy(() => import('./pages/EditorPage'));
const Verify = lazy(() => import('./pages/Verify'));
const ToolPage = lazy(() => import('./pages/ToolPage'));
const ExperienceLetter = lazy(() => import('./pages/ExperienceLetter'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

export default function App() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 1rem' }}>Loading…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:templateId" element={<EditorPage />} />
        <Route path="/verify/:certificateId" element={<Verify />} />
        <Route path="/tools/experience-letter-generator" element={<ExperienceLetter />} />
        <Route path="/tools/:slug" element={<ToolPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </Suspense>
  );
}
