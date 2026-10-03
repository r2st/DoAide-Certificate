import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-doaide-dark text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-doaide-gold rounded-lg flex items-center justify-center">
            <span className="text-doaide-dark font-bold text-lg font-playfair">C</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-montserrat">DoAide</span>
            <span className="text-xl font-playfair italic text-doaide-gold">Certificate</span>
          </div>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-montserrat">
          <Link to="/" className="hover:text-doaide-gold transition-colors">Templates</Link>
          <Link
            to="/editor/custom"
            className="bg-doaide-gold text-doaide-dark px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            Create Certificate
          </Link>
        </nav>
        <Link
          to="/editor/custom"
          className="sm:hidden bg-doaide-gold text-doaide-dark px-3 py-1.5 rounded-lg text-sm font-semibold"
        >
          Create
        </Link>
      </div>
    </header>
  );
}
