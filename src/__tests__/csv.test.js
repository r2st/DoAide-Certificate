import { describe, it, expect } from 'vitest';
import Papa from 'papaparse';

function extractNames(csvString) {
  const results = Papa.parse(csvString, { header: true, skipEmptyLines: true });
  return results.data
    .map(
      (row) =>
        row.name ||
        row.Name ||
        row.NAME ||
        row['Full Name'] ||
        row['full_name'] ||
        row['Recipient'] ||
        row['Student Name'] ||
        row['Employee Name'] ||
        Object.values(row)[0] ||
        ''
    )
    .filter((n) => n.trim() !== '');
}

describe('CSV name extraction logic', () => {
  it('extracts names from a "Name" column', () => {
    const names = extractNames('Name,Email\nAlice,a@b.com\nBob,b@c.com');
    expect(names).toEqual(['Alice', 'Bob']);
  });

  it('extracts names from a "name" (lowercase) column', () => {
    const names = extractNames('name,age\nCharlie,25\nDiana,30');
    expect(names).toEqual(['Charlie', 'Diana']);
  });

  it('skips empty rows', () => {
    const names = extractNames('Name\nAlice\n\nBob\n');
    expect(names).toEqual(['Alice', 'Bob']);
  });

  it('falls back to first column if no "Name" header', () => {
    const names = extractNames('Participant,Score\nEve,90\nFrank,85');
    expect(names).toEqual(['Eve', 'Frank']);
  });

  it('handles "Full Name" column', () => {
    const names = extractNames('Full Name,Department\nJohn Smith,Engineering');
    expect(names).toEqual(['John Smith']);
  });

  it('handles "Student Name" column', () => {
    const names = extractNames('Student Name,Grade\nAlex,A+\nSam,B');
    expect(names).toEqual(['Alex', 'Sam']);
  });
});
