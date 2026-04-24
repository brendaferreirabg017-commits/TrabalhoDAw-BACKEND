const express = require('express');
const router = express.Router();
const { createObra, listObra, editObra, deleteObra } = require('../controllers/obraController');

router.post('/obras', createObra);
router.get('/obras', listObra);
router.put('/obras/:id', editObra);
router.delete('/obras/:id', deleteObra);

module.exports = router;
