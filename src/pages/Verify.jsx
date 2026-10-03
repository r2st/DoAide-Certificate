import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Verify() {
  const { certificateId } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold font-playfair text-gray-800 mb-2">Certificate Verification</h1>
          <p className="text-gray-500 text-sm mb-6">
            This certificate was generated using DoAide Certificate
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-400 mb-1">Certificate ID</p>
            <p className="font-mono font-semibold text-gray-800 text-lg">{certificateId}</p>
          </div>
          <p className="text-xs text-gray-400 mb-6">
            QR code verification confirms this certificate was created on cert.doaide.com
          </p>
          <Link
            to="/"
            className="inline-block bg-doaide-gold text-doaide-dark px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-yellow-400 transition-colors"
          >
            Create Your Own Certificate
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
