import React, { useEffect, useState } from 'react';
import { X, Download, Loader2 } from 'lucide-react';
import { generatePdf } from '../services/pdfService';

const GoogleDocViewer = ({ docUrl }) => {
  // Helper to convert 'edit' link to 'preview' link
  const getPreviewUrl = (url) => {
    return url.replace(/\/edit.*$/, '/preview');
  };

  return (
    <iframe
      src={getPreviewUrl(docUrl)}
      className="w-full h-full"
      style={{ border: "none" }}
      title="Google Doc Viewer"
    ></iframe>
  );
};

const ResumeViewer = ({ isOpen, onClose, docUrl }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Completely lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Apply styles to prevent scrolling and hide scrollbar
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      // Create preview URL locally to send to service
      const previewUrl = docUrl.replace(/\/edit.*$/, '/preview');
      const blob = await generatePdf(previewUrl);
      
      // Create object URL and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "Gerald_Berongoy_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download resume:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl h-[85vh] bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-white/10" 
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button 
              onClick={handleDownload}
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Download Resume"
              disabled={isDownloading}
            >
                {isDownloading ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <Download size={24} />
                )}
            </button>
            <button 
              onClick={onClose} 
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              aria-label="Close Preview"
            >
                <X size={24} />
            </button>
        </div>
        <GoogleDocViewer docUrl={docUrl} />
      </div>
    </div>
  );
};

export default ResumeViewer;
