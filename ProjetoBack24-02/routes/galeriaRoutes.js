const express = require('express');
const router = express.Router();
const { criarGaleria, listarGaleria, editarGaleria, deletarGaleria } = require('../controllers/galeriaController');

router.post("/galerias", criarGaleria);
router.get("/galerias", listarGaleria);
router.put("/galerias/:id", editarGaleria);
router.delete("/galerias/:id", deletarGaleria);

module.exports = router;
