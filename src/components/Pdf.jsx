import React from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function Pdf({ url }) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const zoomPluginInstance = zoomPlugin();

    if (!url) {
        return <div>Error: No URL provided for the PDF document.</div>;
    }

    return (
        <div style={{ height: '100%' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <Viewer 
                    fileUrl={url} 
                    plugins={[defaultLayoutPluginInstance, zoomPluginInstance]} 
                    defaultScale={SpecialZoomLevel.PageWidth} 
                />
            </Worker>
        </div>
    );
}

export default Pdf;
