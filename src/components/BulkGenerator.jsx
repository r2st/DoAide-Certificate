import { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { parseCSV } from '../utils/csv';
import { generateCertificateId } from '../utils/helpers';
import CertificateRenderer from './CertificateRenderer';

export default function BulkGenerator({ isOpen, onClose, template, baseData }) {
  const [names, setNames] = useState([]);
  const [format, setFormat] = useState('png');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [currentName, setCurrentName] = useState('');
  const hiddenRef = useRef(null);

  const handleFile = useCallback(async (file) => {
    if (!file) return;
    const parsed = await parseCSV(file);
    setNames(parsed);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const handleGenerate = async () => {
    if (!names.length || !hiddenRef.current) return;
    setIsGenerating(true);
    setProgress(0);

    const zip = new JSZip();

    for (let i = 0; i < names.length; i++) {
      setCurrentName(names[i]);
      setProgress(Math.round(((i) / names.length) * 100));

      await new Promise((r) => setTimeout(r, 100));

      const el = hiddenRef.current;
      if (!el) continue;

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const safeName = names[i].replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '_');

      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        zip.file(`certificate-${i + 1}-${safeName}.pdf`, pdf.output('blob'));
      } else {
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
        zip.file(`certificate-${i + 1}-${safeName}.png`, blob);
      }
    }

    setProgress(100);
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'certificates-bulk.zip');
    setIsGenerating(false);
    setCurrentName('');
  };

  if (!isOpen) return null;

  const renderName = currentName || (names.length > 0 ? names[0] : baseData.recipientName);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold font-montserrat">Bulk Generate Certificates</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
            &times;
          </button>
        </div>

        {/* Upload area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center mb-4 transition-colors ${
            dragActive ? 'border-doaide-gold bg-yellow-50' : 'border-gray-300'
          }`}
        >
          <svg className="mx-auto w-10 h-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <p className="text-sm text-gray-600 mb-2">
            Drag &amp; drop your CSV file here, or
          </p>
          <label className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-gray-200 transition-colors">
            Browse Files
            <input
              type="file"
              accept=".csv"
              onChange={(e) => handleFile(e.target.files[0])}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-400 mt-2">CSV with a "Name" column</p>
        </div>

        {/* Names list */}
        {names.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">{names.length} names found</p>
              <button onClick={() => setNames([])} className="text-xs text-red-500 hover:text-red-700">
                Clear
              </button>
            </div>
            <div className="max-h-32 overflow-auto bg-gray-50 rounded-lg p-3 space-y-1">
              {names.map((n, i) => (
                <div key={i} className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-6">{i + 1}.</span>
                  {n}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Format selector */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-gray-600">Format:</span>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="radio" value="png" checked={format === 'png'} onChange={() => setFormat('png')} className="text-doaide-gold focus:ring-doaide-gold" />
            <span className="text-sm">PNG</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="radio" value="pdf" checked={format === 'pdf'} onChange={() => setFormat('pdf')} className="text-doaide-gold focus:ring-doaide-gold" />
            <span className="text-sm">PDF</span>
          </label>
        </div>

        {/* Progress */}
        {isGenerating && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Generating...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-doaide-gold rounded-full h-2 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={names.length === 0 || isGenerating}
          className="w-full bg-doaide-gold text-doaide-dark px-4 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : `Generate ${names.length} Certificates`}
        </button>
      </div>

      {/* Hidden renderer for bulk capture */}
      <div style={{ position: 'fixed', left: -9999, top: 0 }}>
        <CertificateRenderer
          ref={hiddenRef}
          template={template}
          data={{ ...baseData, recipientName: renderName, certificateId: generateCertificateId() }}
          scale={1}
        />
      </div>
    </div>
  );
}
