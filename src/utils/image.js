const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function isSupportedImageType(file) {
  return SUPPORTED_TYPES.includes(file.type);
}

export function fileReference(file) {
  return `${file.name}::${file.lastModified}`;
}

export function selectImageFiles() {
  return new Promise((resolve, reject) => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/jpeg,image/png,image/webp,image/gif';
      input.multiple = true;

      input.addEventListener('change', () => {
        const files = Array.from(input.files);
        resolve(files);
      });

      input.addEventListener('cancel', () => {
        resolve([]);
      });

      input.click();
    } catch (err) {
      reject(err);
    }
  });
}

export function createThumbnail(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const maxDim = 300;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg', 0.8);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

export function revokeImageUrl(url) {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}
