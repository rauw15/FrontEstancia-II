import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';
import './BtnExportar.css'

const BtnExportarExcel = ({ datos, nombreArchivo, textoBoton = "Exportar a Excel", className = "" }) => {
  const exportToExcel = () => {
    if (!datos || datos.length === 0) {
      return { success: false, message: "No hay datos para exportar" };
    }

    try {
      // Crear hoja de trabajo
      const worksheet = XLSX.utils.json_to_sheet(datos);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
      
      // Generar nombre de archivo con fecha si no se proporciona
      const nombreFinal = nombreArchivo 
        ? `${nombreArchivo}_${new Date().toISOString().split('T')[0]}.xlsx`
        : `exportacion_${new Date().toISOString().split('T')[0]}.xlsx`;
      
      // Generar archivo Excel
      XLSX.writeFile(workbook, nombreFinal);
      
      return { success: true, message: "Archivo exportado con éxito" };
    } catch (error) {
      return { success: false, message: "Error al exportar el archivo" };
    }
  };

  return (
    <button
      onClick={exportToExcel}
      className={`btn-exportar-excel ${className}`}
      title="Exportar a Excel"
    >
      <Download size={16} />
      {textoBoton}
    </button>
  );
};

export default BtnExportarExcel;