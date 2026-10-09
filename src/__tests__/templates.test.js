import { describe, it, expect } from 'vitest';
import { templates, categories, getTemplate, getTemplatesByCategory } from '../templates';

describe('templates', () => {
  it('has at least 10 templates', () => {
    expect(templates.length).toBeGreaterThanOrEqual(10);
  });

  it('every template has required fields', () => {
    for (const t of templates) {
      expect(t.id).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(t.category).toBeTruthy();
      expect(t.description).toBeTruthy();
      expect(t.colors).toBeDefined();
      expect(t.colors.primary).toBeTruthy();
      expect(t.colors.background).toBeTruthy();
      expect(t.colors.text).toBeTruthy();
      expect(t.colors.border).toBeTruthy();
      expect(t.titleLine1).toBeDefined();
      expect(t.defaultDescription).toBeTruthy();
    }
  });

  it('every template has a unique ID', () => {
    const ids = templates.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every template category is in the categories list', () => {
    for (const t of templates) {
      expect(categories).toContain(t.category);
    }
  });

  it('has all expected categories', () => {
    expect(categories).toContain('Education');
    expect(categories).toContain('Corporate');
    expect(categories).toContain('Events');
    expect(categories).toContain('Custom');
  });
});

describe('getTemplate', () => {
  it('returns the correct template by ID', () => {
    const t = getTemplate('completion');
    expect(t.name).toBe('Certificate of Completion');
  });

  it('returns the last template (custom) for unknown IDs', () => {
    const t = getTemplate('nonexistent');
    expect(t.id).toBe('custom');
  });
});

describe('getTemplatesByCategory', () => {
  it('returns all templates when category is "All"', () => {
    expect(getTemplatesByCategory('All')).toEqual(templates);
  });

  it('filters templates by category', () => {
    const edu = getTemplatesByCategory('Education');
    expect(edu.length).toBeGreaterThan(0);
    for (const t of edu) {
      expect(t.category).toBe('Education');
    }
  });
});
