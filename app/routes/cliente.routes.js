const express = require('express');
var router = express.Router();
const clienteController = require('../controllers/ClienteController.js');

/**
 * @swagger
 * /cliente:
 *   post:
 *     summary: Cria um novo cliente
 *     description: Cadastra um novo cliente no sistema.
 *     tags: [Cliente]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       '201':
 *         description: Cliente criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */
// Cria um novo cliente //
router.post('/cliente', clienteController.create);

/**
 * @swagger
 * /cliente/login:
 *   post:
 *     summary: Faz o login de um cliente
 *     description: Faz o login de um cliente no sistema após a autenticação.
 *     tags: [Cliente]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginCliente'
 *     responses:
 *       '201':
 *         description: Login realizado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */
// Faz o login de um cliente //
router.post('/cliente/login', clienteController.login);

module.exports = router;
