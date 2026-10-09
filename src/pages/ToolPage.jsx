import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CertificateEditor from '../components/CertificateEditor';
import { getTool } from '../data/toolsData';

export default function ToolPage() {
  const { slug } = useParams();
  const tool = getTool(slug);

  useEffect(() => {
    if (tool) {
      document.title = `${tool.title} | DoAide Certificate`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', tool.description);
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Tool Not Found</h1>
            <Link to="/" className="text-doaide-gold hover:underline">Back to Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.shortTitle,
    url: `https://certificate.doaide.com/tools/${tool.slug}`,
    description: tool.description,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-doaide-dark to-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <nav className="text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-doaide-gold">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Tools</span>
            <span className="mx-2">/</span>
            <span className="text-doaide-gold">{tool.shortTitle}</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-bold font-playfair leading-tight mb-3">
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
          <h2 className="text-2xl font-bold font-playfair text-gray-800 mb-8 text-center">
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
