const ExcelJS = require('exceljs');//npm install exceljs
const fs = require('fs');

async function generarExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Datos');

  // Encabezados
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Nombre', key: 'nombre', width: 30 },
    { header: 'Edad', key: 'edad', width: 10 }
  ];

  // Filas
  worksheet.addRow({ id: 1, nombre: 'Juan Pérez', edad: 28 });
  worksheet.addRow({ id: 2, nombre: 'Ana Gómez', edad: 34 });

  // Guardar archivo
  await workbook.xlsx.writeFile('./uploads/Reporte.xlsx');
  console.log('Archivo Excel generado con éxito');
}

generarExcel();