import { describe, expect, it } from 'vitest';

import { formatFileName } from '../../../shared/files/formatFileName';

describe('formatFileName', () => {
  it('should format simple filenames with extensions', () => {
    const result = formatFileName('document.pdf');
    expect(result).toMatch(/^document__[a-f0-9-]+\.pdf$/);
    expect(result).toContain('document');
    expect(result).toContain('.pdf');
  });

  it('should format filenames with spaces and special characters', () => {
    const result = formatFileName('My Document (2024).docx');
    expect(result).toMatch(/^my-document-\(2024\)__[a-f0-9-]+\.docx$/);
    expect(result).toContain('my-document-(2024)');
    expect(result).toContain('.docx');
  });

  it('should format French filenames with accents', () => {
    const result = formatFileName('bureau-électronique.jpg');
    expect(result).toMatch(/^bureau-electronique__[a-f0-9-]+\.jpg$/);
    expect(result).toContain('bureau-electronique');
    expect(result).toContain('.jpg');
  });

  it('should format filenames with multiple dots', () => {
    const result = formatFileName('file.backup.old.txt');
    expect(result).toMatch(/^file\.backup\.old__[a-f0-9-]+\.txt$/);
    expect(result).toContain('file.backup.old');
    expect(result).toContain('.txt');
  });

  it('should format filenames without extensions', () => {
    const result = formatFileName('README');
    expect(result).toMatch(/^readme__[a-f0-9-]+$/);
    expect(result).toContain('readme');
    expect(result).not.toContain('.');
  });

  it('should format filenames starting with dots', () => {
    const result = formatFileName('.env');
    expect(result).toMatch(/^\.env__[a-f0-9-]+$/);
    expect(result).toContain('.env');
  });

  it('should format filenames ending with dots', () => {
    const result = formatFileName('file.');
    expect(result).toMatch(/^file__[a-f0-9-]+$/);
    expect(result).toContain('file');
    expect(result).not.toContain('.');
  });

  it('should format filenames with only dots', () => {
    const result = formatFileName('...');
    expect(result).toMatch(/^\.\.__[a-f0-9-]+$/);
    expect(result).toContain('..');
  });

  it('should format empty filenames', () => {
    const result = formatFileName('');
    expect(result).toMatch(/^__[a-f0-9-]+$/);
    expect(result).not.toContain('.');
  });

  it('should format filenames with uppercase extensions', () => {
    const result = formatFileName('image.PNG');
    expect(result).toMatch(/^image__[a-f0-9-]+\.PNG$/);
    expect(result).toContain('image');
    expect(result).toContain('.PNG');
  });

  it('should format filenames with numbers and symbols', () => {
    const result = formatFileName('report_2024-Q1_v2.1.xlsx');
    expect(result).toMatch(/^report_2024-q1_v2\.1__[a-f0-9-]+\.xlsx$/);
    expect(result).toContain('report_2024-q1_v2.1');
    expect(result).toContain('.xlsx');
  });

  it('should generate unique filenames for same input', () => {
    const result1 = formatFileName('test.txt');
    const result2 = formatFileName('test.txt');
    
    expect(result1).not.toBe(result2);
    expect(result1).toMatch(/^test__[a-f0-9-]+\.txt$/);
    expect(result2).toMatch(/^test__[a-f0-9-]+\.txt$/);
  });

  it('should handle very long filenames', () => {
    const longName = 'a'.repeat(100) + '.txt';
    const result = formatFileName(longName);
    expect(result).toMatch(/^a+__[a-f0-9-]+\.txt$/);
    expect(result).toContain('.txt');
  });

  it('should format filenames with special characters', () => {
    const result = formatFileName('file@#$%^&*()_+.pdf');
    expect(result).toMatch(/^file@dollarpourcentet\*\(\)_\+__[a-f0-9-]+\.pdf$/);
    expect(result).toContain('file@dollarpourcentet*()_+');
    expect(result).toContain('.pdf');
  });

  it('should handle filenames with multiple consecutive dashes', () => {
    const result = formatFileName('file--name---test.docx');
    expect(result).toMatch(/^file-name-test__[a-f0-9-]+\.docx$/);
    expect(result).toContain('file-name-test');
    expect(result).toContain('.docx');
  });

  it('should format filenames with leading/trailing spaces', () => {
    const result = formatFileName('  spaced file  .txt');
    expect(result).toMatch(/^spaced-file__[a-f0-9-]+\.txt$/);
    expect(result).toContain('spaced-file');
    expect(result).toContain('.txt');
  });
}); 