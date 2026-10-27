import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CertificateEditor from '../components/CertificateEditor';
import { getTool } from '../data/toolsData';
import useSEO from '../hooks/useSEO';

export default function ToolPage() {
  const { slug } = useParams();
  const tool = getTool(slug);

  useSEO(`/tools/${slug}`);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Tool Not Found</h1>
            <Link to="/" className="text-da-teal hover:underline">Back to Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-da-dark to-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <nav className="text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-da-teal-light">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Tools</span>
            <span className="mx-2">/</span>
            <span className="text-da-teal-light">{tool.shortTitle}</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-bold font-inter leading-tight mb-3">
            {tool.title}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {tool.heroDesc}
          </p>
        </div>
      </section>

      {/* Editor */}
      <main className="flex-1 bg-gray-50">
        <CertificateEditor templateId={tool.templateId} />
      </main>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold font-inter text-gray-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {tool.faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-6">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
