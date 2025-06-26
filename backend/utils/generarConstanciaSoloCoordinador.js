const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function generarConstanciaSoloCoordinador(res, coordinador) {
  const plantillaPath = path.join(__dirname, 'plantillas', 'Formato.pdf');
  const plantillaBytes = fs.readFileSync(plantillaPath);

  const pdfDoc = await PDFDocument.load(plantillaBytes);
  const [pagina] = await pdfDoc.copyPages(pdfDoc, [0]);

  const nuevaPagina = pdfDoc.addPage([pagina.getWidth(), pagina.getHeight()]);
  nuevaPagina.drawPage(pagina);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;
  const width = nuevaPagina.getWidth();

  
  const centrarTexto = (texto, y) => {
    const textWidth = font.widthOfTextAtSize(texto, fontSize);
    nuevaPagina.drawText(texto, {
      x: (width - textWidth) / 2,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
  };

  
  centrarTexto("INFORME DE SEGUIMIENTO DE ACTIVIDADES", 640);
  centrarTexto("FORMACIÓN COMPLEMENTARIA - REGIONAL SANTANDER", 620);
  centrarTexto("Modalidad: Presencial", 600);
  centrarTexto("Fechas de ejecución: 01/03/2025 - 30/06/2025", 580);
  centrarTexto("Centro de Gestión Agroempresarial del Oriente", 560);
  centrarTexto("SENA - VÉLEZ", 540);

  
  centrarTexto(coordinador.nombre, 440);
  centrarTexto(coordinador.cargo || "COORDINADOR DE FORMACIÓN", 420);

  const pdfBytes = await pdfDoc.save();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=informe.pdf');
  res.send(Buffer.from(pdfBytes));
}

module.exports = generarConstanciaSoloCoordinador;
