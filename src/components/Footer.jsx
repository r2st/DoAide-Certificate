export default function Footer() {
  return (
    <footer className="bg-doaide-dark text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-1">
            <span className="text-white font-bold font-montserrat">DoAide</span>
            <span className="font-playfair italic text-doaide-gold">Certificate</span>
          </div>
          <p className="text-sm text-center">Free certificate and award maker. No login required.</p>
          <div className="flex gap-4 text-sm">
            <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" className="hover:text-doaide-gold transition-colors">
              DoAide
            </a>
            <a href="https://tools.doaide.com" target="_blank" rel="noopener noreferrer" className="hover:text-doaide-gold transition-colors">
              Tools
            </a>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} DoAide. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
