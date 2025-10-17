const express = require('express');
var router = express.Router();
const UsuarioController = require('../controllers/UsuarioController.js');

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cria um novo usuario
 *     description: Cadastra um novo usuario no sistema.
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       '201':
 *         description: Usuario criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */
// Cria um novo usuario //
router.post('/usuario', UsuarioController.create);

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Faz o login de um usuario
 *     description: Faz o login de um usuario no sistema após a autenticação.
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginUsuario'
 *     responses:
 *       '201':
 *         description: Login realizado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */
// Faz o login de um usuario //
router.post('/usuario/login', UsuarioController.login);

module.exports = router;
