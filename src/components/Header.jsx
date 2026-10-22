import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-da-dark text-white shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-da-teal rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg font-inter">C</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-inter">DoAide</span>
            <span className="text-white/40 font-light">|</span>
            <span className="text-xl font-semibold font-inter text-da-teal-light">Certificate</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm font-inter">
          <Link to="/" className="hover:text-da-teal-light transition-colors">Templates</Link>
          <div className="relative group">
            <button className="hover:text-da-teal-light transition-colors flex items-center gap-1">
              Free Tools
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 py-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <Link to="/tools/certificate-of-appreciation" className="block px-4 py-2 hover:bg-gray-50 text-sm">Certificate of Appreciation</Link>
              <Link to="/tools/course-completion-certificate" className="block px-4 py-2 hover:bg-gray-50 text-sm">Course Completion Certificate</Link>
              <Link to="/tools/award-certificate" className="block px-4 py-2 hover:bg-gray-50 text-sm">Award Certificate</Link>
              <Link to="/tools/experience-letter-generator" className="block px-4 py-2 hover:bg-gray-50 text-sm">
                Experience Letter Generator
                <span className="ml-1.5 text-xs bg-da-teal/20 text-da-teal px-1.5 py-0.5 rounded-full font-semibold">AI</span>
              </Link>
            </div>
          </div>
          <Link to="/blog" className="hover:text-da-teal-light transition-colors">Blog</Link>
          <Link
            to="/editor/custom"
            className="bg-da-teal text-white px-4 py-2 rounded-lg font-semibold hover:bg-da-teal-dark transition-colors"
          >
            Create Certificate
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-1.5"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-700 px-4 py-3 space-y-2 text-sm font-inter">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center min-h-[48px] py-2 hover:text-da-teal-light">Templates</Link>
          <Link to="/tools/certificate-of-appreciation" onClick={() => setMenuOpen(false)} className="flex items-center min-h-[48px] py-2 hover:text-da-teal-light">Certificate of Appreciation</Link>
          <Link to="/tools/course-completion-certificate" onClick={() => setMenuOpen(false)} className="flex items-center min-h-[48px] py-2 hover:text-da-teal-light">Course Completion Certificate</Link>
          <Link to="/tools/award-certificate" onClick={() => setMenuOpen(false)} className="flex items-center min-h-[48px] py-2 hover:text-da-teal-light">Award Certificate</Link>
          <Link to="/tools/experience-letter-generator" onClick={() => setMenuOpen(false)} className="flex items-center min-h-[48px] py-2 hover:text-da-teal-light">Experience Letter (AI)</Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)} className="flex items-center min-h-[48px] py-2 hover:text-da-teal-light">Blog</Link>
          <Link
            to="/editor/custom"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center min-h-[48px] bg-da-teal text-white px-4 py-2 rounded-lg font-semibold text-center mt-2"
          >
            Create Certificate
          </Link>
        </div>
      )}
    </header>
  );
}
