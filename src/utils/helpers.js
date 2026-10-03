const ID_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateCertificateId() {
  const seg = () =>
    Array.from({ length: 5 }, () => ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)]).join('');
  return `CERT-${seg()}-${seg()}`;
}

export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export async function generateQRCode(text) {
  const QRCode = (await import('qrcode')).default;
  return QRCode.toDataURL(text, { width: 100, margin: 1, color: { dark: '#000000', light: '#ffffff' } });
}
