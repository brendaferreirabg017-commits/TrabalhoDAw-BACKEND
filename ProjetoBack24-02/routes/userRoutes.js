const express = require('express');
const router = express.Router();
const { criarArtista, listarArtista, editarArtista, deletarArtista } = require('../controllers/artistaController');

router.post("/artistas", criarArtista);
router.get("/artistas", listarArtista);
router.put("/artistas/:id", editarArtista);
router.delete("/artistas/:id", deletarArtista);

module.exports = router;