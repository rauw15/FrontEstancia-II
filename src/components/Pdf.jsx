import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Pdf({ url }) {
    const [numPages, setNumPages] = useState(null);
    const [scale, setScale] = useState(1.0);
    const url2 = '../../src/assets/pdfs/1_proyecto.pdf'
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const handleZoomIn = () => {
      setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
      setScale(scale - 0.1);
  };
  console.log(url)
  console.log(url2)
    if (!url) {
        return <div>Error: No URL provided for the PDF document.</div>;
    }
    return (
        <div>
          <div>
                <button onClick={handleZoomIn}>Zoom +</button>
                <button onClick={handleZoomOut}>Zoom -</button>
            </div>
            <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={scale} />
                ))}
            </Document>
        </div>
    );
}

export default Pdf;




//const url2 = '../../src/assets/pdfs/1_proyecto.pdf'