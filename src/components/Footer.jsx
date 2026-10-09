import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-doaide-dark text-gray-400 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-white font-bold font-montserrat">DoAide</span>
              <span className="font-playfair italic text-doaide-gold">Certificate</span>
            </div>
            <p className="text-sm leading-relaxed">
              Free certificate and award maker. No login required. Create, customize, and download
              professional certificates instantly.
            </p>
          </div>

          {/* Free Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Free Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tools/certificate-of-appreciation" className="hover:text-doaide-gold transition-colors">
                  Certificate of Appreciation
                </Link>
              </li>
              <li>
                <Link to="/tools/course-completion-certificate" className="hover:text-doaide-gold transition-colors">
                  Course Completion Certificate
                </Link>
              </li>
              <li>
                <Link to="/tools/award-certificate" className="hover:text-doaide-gold transition-colors">
                  Award Certificate
                </Link>
              </li>
              <li>
                <Link to="/tools/experience-letter-generator" className="hover:text-doaide-gold transition-colors">
                  Experience Letter Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="hover:text-doaide-gold transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/#templates" className="hover:text-doaide-gold transition-colors">Templates</Link>
              </li>
              <li>
                <Link to="/editor/custom" className="hover:text-doaide-gold transition-colors">Custom Certificate</Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">DoAide</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" className="hover:text-doaide-gold transition-colors">
                  DoAide Home
                </a>
              </li>
              <li>
                <a href="https://tools.doaide.com" target="_blank" rel="noopener noreferrer" className="hover:text-doaide-gold transition-colors">
                  All Tools
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} DoAide. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
