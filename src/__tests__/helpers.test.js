import { describe, it, expect } from 'vitest';
import { generateCertificateId, formatDate } from '../utils/helpers';

describe('generateCertificateId', () => {
  it('returns a string in CERT-XXXXX-XXXXX format', () => {
    const id = generateCertificateId();
    expect(id).toMatch(/^CERT-[A-Z2-9]{5}-[A-Z2-9]{5}$/);
  });

  it('generates unique IDs', () => {
    const ids = new Set(Array.from({ length: 50 }, () => generateCertificateId()));
    expect(ids.size).toBe(50);
  });

  it('does not contain ambiguous characters (0, 1, I, O)', () => {
    for (let i = 0; i < 100; i++) {
      const id = generateCertificateId();
      expect(id).not.toMatch(/[01IO]/);
    }
  });
});

describe('formatDate', () => {
  it('formats a date string as "Month Day, Year"', () => {
    const result = formatDate('2026-10-08');
    expect(result).toBe('October 8, 2026');
  });

  it('returns empty string for falsy input', () => {
    expect(formatDate('')).toBe('');
    expect(formatDate(null)).toBe('');
    expect(formatDate(undefined)).toBe('');
  });

  it('handles different months correctly', () => {
    expect(formatDate('2026-01-15')).toBe('January 15, 2026');
    expect(formatDate('2026-12-25')).toBe('December 25, 2026');
  });
});
