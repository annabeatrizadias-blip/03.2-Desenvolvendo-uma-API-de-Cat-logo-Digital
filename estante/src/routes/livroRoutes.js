const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

router.get('/listar', livroController.listar);
router.get('/buscar/:id', livroController.buscar);
router.post('/cadastrar', livroController.cadastrar);
router.put('/atualizar/:id', livroController.atualizar);
router.delete('/remover/:id', livroController.remover);


module.exports = router;