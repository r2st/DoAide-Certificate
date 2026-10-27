import { describe, expect, it } from 'vitest';
import { tools } from '../data/toolsData';
import { blogPosts } from '../data/blogPosts';
import { jsonLdFor, metaForPath, routes } from '../routeMeta';

describe('routeMeta', () => {
  it('has unique paths, titles and descriptions', () => {
    for (const key of ['path', 'title', 'description']) {
      const values = routes.map((r) => r[key]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it('covers every tool and blog post, and no per-user pages', () => {
    for (const t of tools) expect(metaForPath(`/tools/${t.slug}`)).toBeDefined();
    for (const p of blogPosts) expect(metaForPath(`/blog/${p.slug}`)).toBeDefined();
    expect(metaForPath('/tools/experience-letter-generator')).toBeDefined();
    expect(routes.some((r) => /^\/(editor|verify)\//.test(r.path))).toBe(false);
  });

  it('keeps titles within 70 chars unless the post title alone is longer', () => {
    for (const r of routes) {
      if (r.title.length > 70) expect(r.title).toBe(r.h1);
    }
  });

  it('builds complete FAQ entries for both FAQ data shapes', () => {
    for (const r of routes.filter((x) => x.faqs?.length)) {
      const faq = jsonLdFor(r)['@graph'].find((n) => n['@type'] === 'FAQPage');
      for (const q of faq.mainEntity) {
        expect(q.name, r.path).toBeTruthy();
        expect(q.acceptedAnswer.text, r.path).toBeTruthy();
      }
    }
  });

  it('dates every BlogPosting', () => {
    for (const p of blogPosts) {
      const post = jsonLdFor(metaForPath(`/blog/${p.slug}`))['@graph'][0];
      expect(post['@type']).toBe('BlogPosting');
      expect(post.datePublished).toBe(p.date);
    }
  });
});
