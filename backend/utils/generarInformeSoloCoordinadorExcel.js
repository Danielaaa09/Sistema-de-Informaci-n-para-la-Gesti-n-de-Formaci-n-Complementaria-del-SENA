const ExcelJS = require('exceljs');

async function generarInformeSoloCoordinadorExcel(res, coordinador) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Informe');

  // Diseño del encabezado general del informe
  sheet.mergeCells('A1', 'F1');
  sheet.getCell('A1').value = 'SERVICIO NACIONAL DE APRENDIZAJE - SENA';
  sheet.getCell('A1').alignment = { horizontal: 'center' };

  sheet.mergeCells('A2', 'F2');
  sheet.getCell('A2').value = 'REGIONAL SANTANDER - CENTRO DE GESTIÓN AGROEMPRESARIAL DEL ORIENTE';
  sheet.getCell('A2').alignment = { horizontal: 'center' };

  sheet.mergeCells('A3', 'F3');
  sheet.getCell('A3').value = 'INFORME GENERAL DE FORMACIÓN COMPLEMENTARIA';
  sheet.getCell('A3').alignment = { horizontal: 'center' };

  sheet.mergeCells('A5', 'F5');
  sheet.getCell('A5').value = 'Fechas de ejecución: 01/03/2025 - 30/06/2025';
  sheet.getCell('A5').alignment = { horizontal: 'center' };

  sheet.mergeCells('A6', 'F6');
  sheet.getCell('A6').value = 'Modalidad: Presencial';
  sheet.getCell('A6').alignment = { horizontal: 'center' };

  sheet.mergeCells('A8', 'F8');
  sheet.getCell('A8').value = 'Observaciones:';
  sheet.getCell('A8').alignment = { horizontal: 'center' };

  sheet.mergeCells('A9', 'F13');
  sheet.getCell('A9').value = 'El proceso de formación complementaria se desarrolla con normalidad...';
  sheet.getCell('A9').alignment = { wrapText: true, vertical: 'top', horizontal: 'left' };

  // Espacio para firma
  sheet.mergeCells('A16', 'F16');
  sheet.getCell('A16').value = coordinador.nombre;
  sheet.getCell('A16').alignment = { horizontal: 'center' };

  sheet.mergeCells('A17', 'F17');
  sheet.getCell('A17').value = coordinador.cargo || 'COORDINADOR DE FORMACIÓN';
  sheet.getCell('A17').alignment = { horizontal: 'center' };

  // Enviar archivo
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=informe.xlsx');
  await workbook.xlsx.write(res);
  res.end();
}

module.exports = generarInformeSoloCoordinadorExcel;
