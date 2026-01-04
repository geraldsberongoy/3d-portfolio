import React, { useEffect, useState } from 'react';
import { X, Download, Loader2, ZoomIn, ZoomOut } from 'lucide-react';
import { generatePdf } from '../services/pdfService';

const GoogleDocViewer = ({ docUrl, zoom }) => {
  // Helper to convert 'edit' link to 'preview' link
  const getPreviewUrl = (url) => {
    return url.replace(/\/edit.*$/, '/preview');
  };

  return (
    <>
      <div className="w-full h-full overflow-hidden flex justify-center bg-white">
        <div 
            style={{ 
                transform: `scale(${zoom})`, 
                transformOrigin: 'top center',
                width: `${100 / zoom}%`,
                height: `${100 / zoom}%`,
                transition: 'transform 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out'
            }}
        >
            <iframe
                src={getPreviewUrl(docUrl)}
                className="w-full h-full scrollbar-hide"
                style={{ border: "none" }}
                title="Google Doc Viewer"
            ></iframe>
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

const ResumeViewer = ({ isOpen, onClose, docUrl }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Reset zoom when modal opens
  useEffect(() => {
    if (isOpen) setZoom(1);
  }, [isOpen]);

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
      const previewUrl = docUrl.replace(/\/edit.*$/, '/preview');
      const blob = await generatePdf(previewUrl);
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

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl h-[90vh] md:h-[85vh] bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-white/10" 
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10 flex gap-2">
            {/* Zoom Controls */}
            <div className="flex bg-black/50 rounded-full text-white mr-2">
                <button 
                  onClick={handleZoomOut}
                  className="p-1.5 md:p-2 hover:bg-black/70 rounded-l-full transition-colors flex justify-center items-center"
                  aria-label="Zoom Out"
                >
                    <ZoomOut size={20} className="md:w-6 md:h-6" />
                </button>
                <div className="w-[1px] bg-white/20 my-2"></div>
                <button 
                  onClick={handleZoomIn}
                  className="p-1.5 md:p-2 hover:bg-black/70 rounded-r-full transition-colors flex justify-center items-center"
                  aria-label="Zoom In"
                >
                    <ZoomIn size={20} className="md:w-6 md:h-6" />
                </button>
            </div>

            <button 
              onClick={handleDownload}
              className="p-1.5 md:p-2 bg-black/50 hover:bg-black/70 flex justify-center items-center rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Download Resume"
              disabled={isDownloading}
            >
                {isDownloading ? (
                  <Loader2 size={20} className="animate-spin md:w-6 md:h-6" />
                ) : (
                  <Download size={20} className="md:w-6 md:h-6" />
                )}
            </button>
            <button 
              onClick={onClose} 
              className="p-1.5 md:p-2 bg-black/50 hover:bg-black/70 flex justify-center items-center rounded-full text-white transition-colors"
              aria-label="Close Preview"
            >
                <X size={20} className="md:w-6 md:h-6" />
            </button>
        </div>
        <GoogleDocViewer docUrl={docUrl} zoom={zoom} />
      </div>
    </div>
  );
};

export default ResumeViewer;
