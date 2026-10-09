import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { generateExperienceLetter } from '../utils/gemini';
import { jsPDF } from 'jspdf';

export default function ExperienceLetter() {
  const [form, setForm] = useState({
    employeeName: '',
    designation: '',
    companyName: '',
    joiningDate: '',
    leavingDate: '',
    responsibilities: '',
  });
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const letterRef = useRef(null);

  useEffect(() => {
    document.title = 'Free Experience Letter Generator (AI-Powered) | DoAide Certificate';
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        'content',
        'Generate professional experience letters instantly with AI. Enter employee details and get a ready-to-use experience certificate. Free, no login required.'
      );
  }, []);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const canGenerate =
    form.employeeName && form.designation && form.companyName && form.joiningDate && form.leavingDate;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setError('');
    setLetter('');
    try {
      const result = await generateExperienceLetter(form);
      setLetter(result);
    } catch (err) {
      setError(err.message || 'Failed to generate letter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
    const margin = 20;
    const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
    const lines = pdf.splitTextToSize(letter, pageWidth);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    let y = margin;
    for (const line of lines) {
      if (y > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += 6;
    }
    const safeName = form.employeeName.replace(/\s+/g, '-') || 'experience-letter';
    pdf.save(`experience-letter-${safeName}.pdf`);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Experience Letter Generator',
    url: 'https://certificate.doaide.com/tools/experience-letter-generator',
    description:
      'Generate professional experience letters instantly with AI. Free, no login required.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an experience letter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An experience letter is a formal document issued by an employer confirming an employee\'s tenure, designation, and responsibilities during their employment period.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the AI experience letter generator work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enter the employee details (name, designation, company, dates, responsibilities) and our AI generates a professionally worded experience letter that you can download as PDF or copy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my data safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All processing happens in your browser. We do not store any of the information you enter. The AI generates the letter on-the-fly and nothing is saved on our servers.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-doaide-dark to-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <nav className="text-sm text-gray-400 mb-4">
            <a href="/" className="hover:text-doaide-gold">Home</a>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Tools</span>
            <span className="mx-2">/</span>
            <span className="text-doaide-gold">Experience Letter Generator</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-bold font-playfair leading-tight mb-3">
            Free Experience Letter Generator
            <span className="block text-lg sm:text-xl text-doaide-gold mt-1 font-montserrat font-normal">
              AI-Powered
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Generate professional experience letters and employment certificates instantly. Enter the
            details below and let AI create a polished, ready-to-use letter.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Form */}
            <div className="lg:w-96 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
                <h2 className="font-semibold text-lg font-montserrat text-gray-800">
                  Employee Details
                </h2>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Employee Name</label>
                  <input
                    type="text"
                    value={form.employeeName}
                    onChange={update('employeeName')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-doaide-gold/50"
                    placeholder="e.g. Priya Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={update('designation')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-doaide-gold/50"
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={update('companyName')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-doaide-gold/50"
                    placeholder="e.g. Acme Technologies Pvt. Ltd."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Joining Date</label>
                    <input
                      type="date"
                      value={form.joiningDate}
                      onChange={update('joiningDate')}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-doaide-gold/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Leaving Date</label>
                    <input
                      type="date"
                      value={form.leavingDate}
                      onChange={update('leavingDate')}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-doaide-gold/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Key Responsibilities
                  </label>
                  <textarea
                    value={form.responsibilities}
                    onChange={update('responsibilities')}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-doaide-gold/50 resize-none"
                    placeholder="e.g. Led a team of 5 developers, managed cloud infrastructure, implemented CI/CD pipelines"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!canGenerate || loading}
                  className="w-full bg-doaide-gold text-doaide-dark px-4 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Generating with AI...' : 'Generate Experience Letter'}
                </button>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
              </div>
            </div>

            {/* Output */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
                {letter ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-800">Generated Experience Letter</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCopy}
                          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                          onClick={handleDownloadPDF}
                          className="px-3 py-1.5 text-sm bg-doaide-dark text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Download PDF
                        </button>
                      </div>
                    </div>
                    <div
                      ref={letterRef}
                      className="bg-gray-50 rounded-xl p-6 font-mono text-sm text-gray-700 whitespace-pre-wrap leading-relaxed"
                    >
                      {letter}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-center py-20">
                    <div>
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <p className="text-sm">
                        Fill in the employee details and click <br />
                        <strong>Generate Experience Letter</strong> to get started
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold font-playfair text-gray-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-gray-800 mb-2">What is an experience letter?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                An experience letter (also called an experience certificate) is a formal document issued by an
                employer that confirms an employee's tenure, designation, and responsibilities during their
                employment period. It is commonly required when applying for new jobs.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                How does the AI generator work?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enter the employee details in the form — name, designation, company, dates, and key
                responsibilities. Our AI (powered by Google Gemini) generates a professionally worded
                experience letter that follows the standard format. You can then copy the text or download
                it as a PDF.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Is my data safe?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes. The information you enter is sent directly to the AI for generation and is not stored on
                our servers. The generated letter exists only in your browser until you close the page.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                Can I edit the generated letter?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The generated letter is plain text that you can copy and paste into any word processor for
                further editing. You can also regenerate with different details or responsibilities to get a
                new version.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
