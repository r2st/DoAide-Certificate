import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TemplateGallery from '../components/TemplateGallery';
import { tools } from '../data/toolsData';
import { blogPosts } from '../data/blogPosts';
import { formatDate } from '../utils/helpers';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    title: '15+ Templates',
    desc: 'Beautiful pre-designed certificates for every occasion',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: 'Bulk Generation',
    desc: 'Upload a CSV and generate hundreds of certificates at once',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    title: 'Instant Download',
    desc: 'Export as high-resolution PNG or print-ready PDF',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: 'AI-Powered',
    desc: 'Generate experience letters instantly with AI',
  },
];

const steps = [
  { num: '1', title: 'Choose a Template', desc: 'Pick from 15+ professionally designed certificate templates.' },
  { num: '2', title: 'Customize', desc: 'Add recipient name, organization, dates, logo, and signature.' },
  { num: '3', title: 'Download & Share', desc: 'Export as PNG/PDF and share on WhatsApp or LinkedIn.' },
];

const freeTools = [
  {
    title: 'Certificate of Appreciation',
    desc: 'Recognize contributions with elegant appreciation certificates',
    link: '/tools/certificate-of-appreciation',
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Course Completion Certificate',
    desc: 'Issue certificates for courses, training programs, and workshops',
    link: '/tools/course-completion-certificate',
    color: 'bg-red-50 text-red-600',
  },
  {
    title: 'Award Certificate',
    desc: 'Create stunning certificates for achievements and competitions',
    link: '/tools/award-certificate',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Experience Letter Generator',
    desc: 'AI-powered experience letter and employment certificate creator',
    link: '/tools/experience-letter-generator',
    color: 'bg-blue-50 text-blue-600',
    badge: 'AI',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-doaide-dark to-gray-900 text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold font-playfair leading-tight mb-4">
            Create Beautiful Certificates
            <span className="block text-doaide-gold mt-1">— Free, No Login</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-montserrat">
            Design professional certificates, awards, and experience letters for your school, company, or
            event. Download instantly as PDF or PNG.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/editor/completion"
              className="bg-doaide-gold text-doaide-dark px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-900/20"
            >
              Start Creating
            </Link>
            <a
              href="#templates"
              className="border border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Browse Templates
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="text-center p-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-yellow-50 text-doaide-gold mb-3">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-center text-gray-800 mb-2">
            Free Certificate Tools
          </h2>
          <p className="text-center text-gray-500 mb-10">
            No sign-up needed. Create and download instantly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {freeTools.map((tool) => (
              <Link
                key={tool.link}
                to={tool.link}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl ${tool.color} flex items-center justify-center mb-3`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-doaide-gold transition-colors">
                  {tool.title}
                  {tool.badge && (
                    <span className="ml-1.5 text-xs bg-doaide-gold/20 text-doaide-gold px-1.5 py-0.5 rounded-full font-semibold">
                      {tool.badge}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-gray-500">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-center text-gray-800 mb-2">
            Certificate Templates
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Choose a template and customize it in seconds
          </p>
          <TemplateGallery />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-center text-gray-800 mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="w-12 h-12 rounded-full bg-doaide-dark text-doaide-gold font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {s.num}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-center text-gray-800 mb-2">
            From the Blog
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Guides and tips for creating professional certificates
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="bg-gray-50 rounded-2xl p-5 hover:shadow-md hover:bg-white transition-all border border-gray-100"
              >
                <p className="text-xs text-gray-400 mb-2">{formatDate(post.date)}</p>
                <h3 className="font-semibold text-gray-800 text-sm mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">{post.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/blog" className="text-sm font-medium text-doaide-gold hover:underline">
              View all posts &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-doaide-dark to-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-playfair mb-4">
            Ready to create your first certificate?
          </h2>
          <p className="text-gray-300 mb-8">
            It takes less than a minute. No sign-up, no cost, no catch.
          </p>
          <Link
            to="/editor/custom"
            className="inline-block bg-doaide-gold text-doaide-dark px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-900/20"
          >
            Create Free Certificate
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
