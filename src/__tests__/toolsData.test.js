import { describe, it, expect } from 'vitest';
import { tools, getTool } from '../data/toolsData';
import { getTemplate } from '../templates';

describe('toolsData', () => {
  it('has exactly 3 certificate tools', () => {
    expect(tools.length).toBe(3);
  });

  it('every tool has required fields', () => {
    for (const t of tools) {
      expect(t.slug).toBeTruthy();
      expect(t.templateId).toBeTruthy();
      expect(t.title).toBeTruthy();
      expect(t.shortTitle).toBeTruthy();
      expect(t.description).toBeTruthy();
      expect(t.heroDesc).toBeTruthy();
      expect(t.keywords).toBeTruthy();
      expect(Array.isArray(t.faqs)).toBe(true);
      expect(t.faqs.length).toBeGreaterThan(0);
    }
  });

  it('every tool references a valid template', () => {
    for (const t of tools) {
      const template = getTemplate(t.templateId);
      expect(template.id).toBe(t.templateId);
    }
  });

  it('every FAQ has question and answer', () => {
    for (const t of tools) {
      for (const faq of t.faqs) {
        expect(faq.q).toBeTruthy();
        expect(faq.a).toBeTruthy();
      }
    }
  });
});

describe('getTool', () => {
  it('returns the correct tool by slug', () => {
    const t = getTool('certificate-of-appreciation');
    expect(t.templateId).toBe('appreciation');
  });

  it('returns undefined for unknown slug', () => {
    expect(getTool('nonexistent')).toBeUndefined();
  });
});
