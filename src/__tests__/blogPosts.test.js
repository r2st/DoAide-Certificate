import { describe, it, expect } from 'vitest';
import { blogPosts, getBlogPost } from '../data/blogPosts';

describe('blogPosts', () => {
  it('has at least 3 posts', () => {
    expect(blogPosts.length).toBeGreaterThanOrEqual(3);
  });

  it('every post has required fields', () => {
    for (const p of blogPosts) {
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.author).toBeTruthy();
      expect(p.keywords).toBeTruthy();
      expect(p.content.length).toBeGreaterThan(500);
    }
  });

  it('every post has a unique slug', () => {
    const slugs = blogPosts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('post content contains headings', () => {
    for (const p of blogPosts) {
      expect(p.content).toContain('## ');
    }
  });
});

describe('getBlogPost', () => {
  it('returns the correct post by slug', () => {
    const p = getBlogPost('how-to-create-professional-certificates-online-free');
    expect(p.title).toContain('Professional Certificates');
  });

  it('returns undefined for unknown slug', () => {
    expect(getBlogPost('nonexistent')).toBeUndefined();
  });
});
