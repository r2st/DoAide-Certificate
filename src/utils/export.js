import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function exportToPNG(element, filename = 'certificate.png') {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export async function exportToPDF(element, filename = 'certificate.pdf') {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const w = pdf.internal.pageSize.getWidth();
  const h = pdf.internal.pageSize.getHeight();
  pdf.addImage(imgData, 'PNG', 0, 0, w, h);
  pdf.save(filename);
}

export async function exportBulkAsZip(captureElement, names, data, template, format = 'png') {
  const zip = new JSZip();
  const total = names.length;

  for (let i = 0; i < total; i++) {
    const el = captureElement();
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
      const w = pdf.internal.pageSize.getWidth();
      const h = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, w, h);
      zip.file(`certificate-${i + 1}-${safeName}.pdf`, pdf.output('blob'));
    } else {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      zip.file(`certificate-${i + 1}-${safeName}.png`, blob);
    }
  }

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'certificates-bulk.zip');
}
