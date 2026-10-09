import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getBlogPost } from '../data/blogPosts';
import { formatDate } from '../utils/helpers';

function renderMarkdown(content) {
  return content
    .split('\n\n')
    .map((block, i) => {
      if (block.startsWith('## ')) {
        return (
          <h2 key={i} className="text-xl font-bold font-playfair text-gray-800 mt-8 mb-3">
            {block.replace('## ', '')}
          </h2>
        );
      }
      if (block.startsWith('### ')) {
        return (
          <h3 key={i} className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('---')) {
        return <hr key={i} className="my-6 border-gray-200" />;
      }
      if (block.includes('\n- ')) {
        const lines = block.split('\n');
        const heading = !lines[0].startsWith('- ') ? lines.shift() : null;
        return (
          <div key={i}>
            {heading && <p className="text-gray-700 leading-relaxed mb-2">{heading}</p>}
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm leading-relaxed mb-4">
              {lines
                .filter((l) => l.startsWith('- '))
                .map((l, j) => {
                  const text = l.replace(/^- /, '');
                  const parts = text.split(/\*\*(.*?)\*\*/);
                  return (
                    <li key={j}>
                      {parts.map((p, k) =>
                        k % 2 === 1 ? (
                          <strong key={k} className="text-gray-800">{p}</strong>
                        ) : (
                          <span key={k}>{p}</span>
                        )
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        );
      }

      const lines = block.split('\n');
      const isList = lines.every(
        (l) => l.match(/^\d+\.\s/) || l.trim() === ''
      );
      if (isList && lines.some((l) => l.match(/^\d+\.\s/))) {
        return (
          <ol key={i} className="list-decimal list-inside space-y-1 text-gray-600 text-sm leading-relaxed mb-4">
            {lines
              .filter((l) => l.match(/^\d+\.\s/))
              .map((l, j) => (
                <li key={j}>{l.replace(/^\d+\.\s/, '')}</li>
              ))}
          </ol>
        );
      }

      const parts = block.split(/\*\*(.*?)\*\*/);
      return (
        <p key={i} className="text-gray-700 text-sm leading-relaxed mb-4">
          {parts.map((p, k) =>
            k % 2 === 1 ? (
              <strong key={k} className="text-gray-800">{p}</strong>
            ) : (
              <span key={k}>{p}</span>
            )
          )}
        </p>
      );
    });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | DoAide Certificate Blog`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', post.description);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
            <Link to="/blog" className="text-doaide-gold hover:underline">Back to Blog</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    mainEntityOfPage: `https://certificate.doaide.com/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="bg-gradient-to-br from-doaide-dark to-gray-900 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav className="text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-doaide-gold">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-doaide-gold">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Article</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold font-playfair leading-tight mb-3">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>{formatDate(post.date)}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full" />
            <span>{post.author}</span>
          </div>
        </div>
      </section>

      <main className="flex-1 py-12 bg-gray-50">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            {renderMarkdown(post.content)}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/editor/custom"
              className="inline-block bg-doaide-gold text-doaide-dark px-8 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-900/20"
            >
              Create Your Certificate Now
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
