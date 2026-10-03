import { useState, useEffect, useRef, useCallback } from 'react';
import { getTemplate, templates } from '../templates';
import CertificateRenderer from './CertificateRenderer';
import { generateCertificateId, formatDate, generateQRCode } from '../utils/helpers';
import { exportToPNG, exportToPDF } from '../utils/export';
import BulkGenerator from './BulkGenerator';
import ShareModal from './ShareModal';

export default function CertificateEditor({ templateId }) {
  const [currentTemplateId, setCurrentTemplateId] = useState(templateId || 'custom');
  const template = getTemplate(currentTemplateId);

  const [recipientName, setRecipientName] = useState('John Doe');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [organization, setOrganization] = useState('Your Organization');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [signatureName, setSignatureName] = useState('Authorized Signatory');
  const [signatureImage, setSignatureImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [certificateId] = useState(() => generateCertificateId());
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const certRef = useRef(null);
  const previewContainerRef = useRef(null);
  const [previewScale, setPreviewScale] = useState(0.5);

  useEffect(() => {
    setDescription(template.defaultDescription || '');
  }, [template]);

  useEffect(() => {
    setPrimaryColor(template.colors.primary);
  }, [template]);

  useEffect(() => {
    if (showQR) {
      generateQRCode(`https://cert.doaide.com/verify/${certificateId}`).then(setQrCodeUrl);
    } else {
      setQrCodeUrl(null);
    }
  }, [showQR, certificateId]);

  useEffect(() => {
    const updateScale = () => {
      if (previewContainerRef.current) {
        const w = previewContainerRef.current.offsetWidth;
        setPreviewScale(Math.min((w - 16) / 1056, 0.75));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleImageUpload = useCallback((e, setter) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const handleExportPNG = async () => {
    if (!certRef.current || exporting) return;
    setExporting(true);
    try {
      await exportToPNG(certRef.current, `certificate-${recipientName.replace(/\s+/g, '-')}.png`);
    } finally {
      setExporting(false);
    }
  };

  const handleExportPDF = async () => {
    if (!certRef.current || exporting) return;
    setExporting(true);
    try {
      await exportToPDF(certRef.current, `certificate-${recipientName.replace(/\s+/g, '-')}.pdf`);
    } finally {
      setExporting(false);
    }
  };

  const certData = {
    recipientName,
    title,
    description,
    organization,
    date: formatDate(date),
    signatureName,
    signatureImage,
    logoImage,
    primaryColor,
    certificateId,
    qrCodeUrl,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Editor panel */}
        <div className="lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h2 className="font-semibold text-lg font-montserrat text-gray-800">Customize Certificate</h2>

            {/* Template selector */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Template</label>
              <select
                value={currentTemplateId}
                onChange={(e) => setCurrentTemplateId(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-doaide-gold/50"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Recipient Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-doaide-gold/50"
                placeholder="Enter recipient name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Certificate Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-doaide-gold/50"
                placeholder="e.g. Web Development Course"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-doaide-gold/50 resize-none"
                placeholder="Certificate description text"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Organization</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-doaide-gold/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-doaide-gold/50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Accent Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={primaryColor || template.colors.primary}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <span className="text-xs text-gray-400">{primaryColor || template.colors.primary}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Signature Name</label>
              <input
                type="text"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-doaide-gold/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Signature Image</label>
                <label className="block border border-dashed border-gray-300 rounded-lg p-2 text-center cursor-pointer hover:border-doaide-gold transition-colors">
                  <span className="text-xs text-gray-400">{signatureImage ? 'Change' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setSignatureImage)}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Organization Logo</label>
                <label className="block border border-dashed border-gray-300 rounded-lg p-2 text-center cursor-pointer hover:border-doaide-gold transition-colors">
                  <span className="text-xs text-gray-400">{logoImage ? 'Change' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setLogoImage)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showQR}
                onChange={(e) => setShowQR(e.target.checked)}
                className="rounded border-gray-300 text-doaide-gold focus:ring-doaide-gold"
              />
              <span className="text-sm text-gray-600">Add QR verification code</span>
            </label>

            <div className="text-xs text-gray-400">Certificate ID: {certificateId}</div>

            {/* Export buttons */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleExportPNG}
                  disabled={exporting}
                  className="bg-doaide-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {exporting ? 'Exporting...' : 'Download PNG'}
                </button>
                <button
                  onClick={handleExportPDF}
                  disabled={exporting}
                  className="bg-doaide-dark text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {exporting ? 'Exporting...' : 'Download PDF'}
                </button>
              </div>
              <button
                onClick={() => setIsShareOpen(true)}
                className="w-full bg-doaide-gold text-doaide-dark px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-yellow-400 transition-colors"
              >
                Share Certificate
              </button>
              <button
                onClick={() => setIsBulkOpen(true)}
                className="w-full border border-gray-200 text-gray-600 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Bulk Generate from CSV
              </button>
            </div>
          </div>
        </div>

        {/* Preview panel */}
        <div className="flex-1 min-w-0" ref={previewContainerRef}>
          <div className="bg-gray-100 rounded-2xl p-4 overflow-auto">
            <div
              style={{
                width: 1056 * previewScale,
                height: 748 * previewScale,
                margin: '0 auto',
              }}
            >
              <CertificateRenderer
                ref={certRef}
                template={template}
                data={certData}
                scale={previewScale}
              />
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">Live preview — edit fields on the left</p>
        </div>
      </div>

      <BulkGenerator
        isOpen={isBulkOpen}
        onClose={() => setIsBulkOpen(false)}
        template={template}
        baseData={certData}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        certificateId={certificateId}
        certificateName={title}
      />
    </div>
  );
}
