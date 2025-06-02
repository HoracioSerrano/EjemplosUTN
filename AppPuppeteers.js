const ejs = require("ejs"); //npm install ejs.
const path = require("path");
const puppeteer = require("puppeteer"); //npm install puppeteer

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true })); //const datos = req.body;
app.use(express.json()); //const datos = req.body;

class Ticket {
  id = "";
  fecha = "";
  nombre = "";
  producto = "";
  total = 0;
  view = true;
}

async function getTicket(req, res) {
  const newTicket = new Ticket();
  newTicket.id = req.params.id;
  newTicket.fecha = new Date().toLocaleDateString();
  newTicket.nombre = "John Doe";
  newTicket.producto = "Sample Product";
  newTicket.total = 100.0;
  newTicket.view = true;

  let html = await ejs.renderFile(
    path.join(__dirname, "./", "Vistas", "ticket.ejs"),
    { ticket: newTicket }
  );
  res.status(200).send(html);
}

async function downloadTicket(req, res) {
  const newTicket = new Ticket();
  newTicket.id = req.params.id;
  newTicket.fecha = new Date().toLocaleDateString();
  newTicket.nombre = "John Doe";
  newTicket.producto = "Sample Product";
  newTicket.total = 100.0;
  newTicket.view = false;

  let html = await ejs.renderFile(
    path.join(__dirname, "./", "Vistas", "ticket.ejs"),
    { ticket: newTicket }
  );

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.setContent(html);

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      right: "20px",
      bottom: "20px",
      left: "20px",
    },
    headerTemplate: "<div>Esto es el header</div>",
  });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=${req.params.id}.pdf`,
  });
  res.status(200).send(pdfBuffer);
}

async function downloadPdf(req, res) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(`https://${req.params.page}`, { waitUntil: "networkidle2" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      right: "20px",
      bottom: "20px",
      left: "20px",
    },
  });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=${req.params.page}.pdf`,
  });
  res.status(200).send(pdfBuffer);
}

app.get("/ticket/:id", getTicket);
app.get("/ticket/download/:id", downloadTicket);
app.get("/downloadPdf/:page", downloadPdf);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
