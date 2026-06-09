import { describe, it, expect } from 'vitest';
import { isSupportedImageType, fileReference } from '../../src/utils/image.js';

describe('isSupportedImageType', () => {
  it('accepts JPEG', () => {
    expect(isSupportedImageType({ type: 'image/jpeg' })).toBe(true);
    expect(isSupportedImageType({ type: 'image/jpg' })).toBe(false); // non-standard
  });

  it('accepts PNG', () => {
    expect(isSupportedImageType({ type: 'image/png' })).toBe(true);
  });

  it('accepts WebP', () => {
    expect(isSupportedImageType({ type: 'image/webp' })).toBe(true);
  });

  it('accepts GIF', () => {
    expect(isSupportedImageType({ type: 'image/gif' })).toBe(true);
  });

  it('rejects unsupported formats', () => {
    expect(isSupportedImageType({ type: 'image/bmp' })).toBe(false);
    expect(isSupportedImageType({ type: 'image/svg+xml' })).toBe(false);
    expect(isSupportedImageType({ type: 'application/pdf' })).toBe(false);
    expect(isSupportedImageType({ type: '' })).toBe(false);
  });
});

describe('fileReference', () => {
  it('generates a stable reference from name and lastModified', () => {
    const file = { name: 'photo.jpg', lastModified: 1749500000000 };
    expect(fileReference(file)).toBe('photo.jpg::1749500000000');
  });

  it('handles files with special characters in name', () => {
    const file = { name: 'my photo (1).jpg', lastModified: 1749500000000 };
    expect(fileReference(file)).toBe('my photo (1).jpg::1749500000000');
  });

  it('generates different references for same name but different timestamps', () => {
    const a = { name: 'photo.jpg', lastModified: 100 };
    const b = { name: 'photo.jpg', lastModified: 200 };
    expect(fileReference(a)).not.toBe(fileReference(b));
  });
});
