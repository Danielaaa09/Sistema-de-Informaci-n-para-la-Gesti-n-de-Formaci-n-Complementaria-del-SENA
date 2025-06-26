const express = require('express');
const router = express.Router();
const generarInformePDF = require('../utils/generarConstanciaSoloCoordinador');
const generarExcel = require('../utils/generarInformeSoloCoordinadorExcel');


function obtenerCoordinador(req, res, next) {
  req.coordinador = {
    nombre: "JAVIER GONZALEZ FRANCO", 
    cargo: "COORDINADOR DE FORMACIÓN"
  };
  next();
}

router.get('/pdf', obtenerCoordinador, async (req, res) => {
  await generarInformePDF(res, req.coordinador);
});

router.get('/excel', obtenerCoordinador, async (req, res) => {
  await generarExcel(res, req.coordinador);
});

module.exports = router;




