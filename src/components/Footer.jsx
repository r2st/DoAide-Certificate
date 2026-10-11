import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-da-dark text-gray-400 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-white font-bold font-inter">DoAide</span>
              <span className="text-white/40 font-light">|</span>
              <span className="font-semibold font-inter text-da-teal-light">Certificate</span>
            </div>
            <p className="text-sm leading-relaxed">
              Free certificate and award maker. No login required. Create, customize, and download
              professional certificates instantly.
            </p>
            <span className="inline-block mt-3 text-xs bg-da-teal/15 text-da-teal-light px-2.5 py-1 rounded-full font-medium">
              A DoAide Product
            </span>
          </div>

          {/* Free Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Free Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tools/certificate-of-appreciation" className="hover:text-da-teal-light transition-colors">
                  Certificate of Appreciation
                </Link>
              </li>
              <li>
                <Link to="/tools/course-completion-certificate" className="hover:text-da-teal-light transition-colors">
                  Course Completion Certificate
                </Link>
              </li>
              <li>
                <Link to="/tools/award-certificate" className="hover:text-da-teal-light transition-colors">
                  Award Certificate
                </Link>
              </li>
              <li>
                <Link to="/tools/experience-letter-generator" className="hover:text-da-teal-light transition-colors">
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
                <Link to="/blog" className="hover:text-da-teal-light transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/#templates" className="hover:text-da-teal-light transition-colors">Templates</Link>
              </li>
              <li>
                <Link to="/editor/custom" className="hover:text-da-teal-light transition-colors">Custom Certificate</Link>
              </li>
            </ul>
          </div>

          {/* DoAide Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">DoAide Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" className="hover:text-da-teal-light transition-colors">
                  DoAide Home
                </a>
              </li>
              <li>
                <a href="https://tools.doaide.com" target="_blank" rel="noopener noreferrer" className="hover:text-da-teal-light transition-colors">
                  DoAide Tools
                </a>
              </li>
              <li>
                <a href="https://certificate.doaide.com" target="_blank" rel="noopener noreferrer" className="hover:text-da-teal-light transition-colors">
                  DoAide Certificate
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} DoAide. All rights reserved.</span>
          <span className="text-da-teal/60">A DoAide Product</span>
        </div>
      </div>
    </footer>
  );
}
