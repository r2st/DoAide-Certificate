import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { templates, categories } from '../templates';

export default function TemplateGallery() {
  const [active, setActive] = useState('All');
  const navigate = useNavigate();

  const filtered = active === 'All' ? templates : templates.filter((t) => t.category === active);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === cat
                ? 'bg-doaide-dark text-doaide-gold shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <div
            key={t.id}
            onClick={() => navigate(`/editor/${t.id}`)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
          >
            {/* Preview */}
            <div
              className="relative h-44 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: t.colors.background }}
            >
              {/* Mini certificate preview */}
              <div
                className="w-64 h-40 rounded relative flex flex-col items-center justify-center p-3"
                style={{
                  border: `2px solid ${t.colors.border}`,
                  backgroundColor: t.colors.background,
                }}
              >
                <p
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    color: t.colors.primary,
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {t.titleLine1}
                </p>
                {t.titleLine2 && (
                  <p
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: 7,
                      letterSpacing: '0.1em',
                      color: t.colors.primary,
                      margin: '1px 0 0',
                    }}
                  >
                    {t.titleLine2}
                  </p>
                )}
                <div
                  className="my-1.5"
                  style={{ width: 40, height: 1, backgroundColor: t.colors.border, opacity: 0.5 }}
                />
                <p
                  style={{
                    fontFamily: '"Great Vibes", cursive',
                    fontSize: 16,
                    color: t.colors.primary,
                    margin: 0,
                  }}
                >
                  John Doe
                </p>
                <div className="mt-2 flex items-end justify-between w-full px-2">
                  <div style={{ width: 20, height: 0.5, backgroundColor: t.colors.text, opacity: 0.3 }} />
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      backgroundColor: t.colors.secondary,
                      opacity: 0.5,
                    }}
                  />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-white text-doaide-dark px-4 py-2 rounded-lg font-semibold text-sm shadow-lg transition-opacity">
                  Use Template
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-800 text-sm">{t.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                  {t.category}
                </span>
              </div>
              <p className="text-xs text-gray-500">{t.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
