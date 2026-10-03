import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CertificateEditor from '../components/CertificateEditor';

export default function EditorPage() {
  const { templateId } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <CertificateEditor templateId={templateId} />
      </main>
      <Footer />
    </div>
  );
}
