import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogPosts';
import { formatDate } from '../utils/helpers';

export default function Blog() {
  useEffect(() => {
    document.title = 'Blog — Certificate Design Tips & Guides | DoAide Certificate';
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        'content',
        'Tips, guides, and best practices for creating professional certificates, awards, and experience letters. Free templates and tools.'
      );
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-gradient-to-br from-doaide-dark to-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold font-playfair mb-3">Blog</h1>
          <p className="text-gray-300">
            Guides, tips, and best practices for creating professional certificates and documents
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all p-6"
              >
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <span>{formatDate(post.date)}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{post.author}</span>
                </div>
                <h2 className="text-lg font-semibold font-playfair text-gray-800 mb-2 group-hover:text-doaide-gold transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">{post.description}</p>
                <span className="inline-block mt-3 text-sm font-medium text-doaide-gold">
                  Read more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
