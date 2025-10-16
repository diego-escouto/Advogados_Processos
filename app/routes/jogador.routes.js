const express = require('express');
var router = express.Router();
const jogadorController = require('../controllers/JogadorController.js');
const equipamentoController = require('../controllers/EquipamentoController.js');
const authMiddleware = require('../middlewares/TokenValido.js');

/**
 * @swagger
 * tags:
 *   - name: Jogador
 *     description: Rotas para gerenciar jogadores
 *   - name: Equipamento
 *     description: Rotas para gerenciar equipamentos de um jogador
 *   - name: Cliente
 *     description: Rotas para gerenciar os clientes
 */

/**
 * @swagger
 * /jogador:
 *   get:
 *     summary: Lista todos os jogadores
 *     description: Retorna uma lista com todos os jogadores e seus equipamentos.
 *     tags: [Jogador]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de jogadores retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jogador'
 *       '401':
 *         description: Não autorizado.
 */
//retorna todos os jogadores
router.get('/jogador', [authMiddleware.check], jogadorController.findAll);


/**
 * @swagger
 * /jogador/{id}:
 *   get:
 *     summary: Recupera um jogador pelo seu ID
 *     description: Busca e retorna os dados de um jogador específico.
 *     tags: [Jogador]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do jogador.
 *     responses:
 *       '200':
 *         description: Dados do jogador.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jogador'
 *       '404':
 *         description: Jogador não encontrado.
 */
//recupera um jogador pelo seu id
router.get('/jogador/:id', [authMiddleware.check], jogadorController.find);


/**
 * @swagger
 * /jogador:
 *   post:
 *     summary: Cria um novo jogador
 *     description: Cadastra um novo jogador no sistema.
 *     tags: [Jogador]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoJogador'
 *     responses:
 *       '201':
 *         description: Jogador criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */
//cria um novo jogador
router.post('/jogador', [authMiddleware.check], jogadorController.create);

/**
 * @swagger
 * /jogador/{id}:
 *   put:
 *     summary: Modifica um jogador pelo seu ID
 *     description: Modifica os dados de um jogador específico.
 *     tags: [Jogador]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do jogador.
 *     responses:
 *       '200':
 *         description: Dados do jogador.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jogador'
 *       '500':
 *         description: Erro no servidor.
 */
//atualiza um jogador pelo seu id
router.put('/jogador/:id', [authMiddleware.check], jogadorController.update);

/**
 * @swagger
 * /jogador/{id}:
 *   delete:
 *     summary: Exclui um jogador pelo seu ID
 *     description: Apaga os dados de um jogador específico.
 *     tags: [Jogador]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do jogador.
 *     responses:
 *       '200':
 *         description: Dados do jogador.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jogador'
 *       '404':
 *         description: Jogador não encontrado.
 */
//exclui um jogador pelo seu id
router.delete('/jogador/:id', [authMiddleware.check], jogadorController.delete);

/**
 * @swagger
 * /jogador/{id_jogador}/equipamento:
 *   get:
 *     summary: Cria um novo equipamento para um jogador
 *     description: Adiciona um novo equipamento e o associa a um jogador.
 *     tags: [Equipamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_jogador
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do jogador que receberá o equipamento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoEquipamento'
 *     responses:
 *       '201':
 *         description: Equipamento criado e associado ao jogador.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipamento'
 *       '400':
 *         description: Dados do equipamento são inválidos.
 */
//retorna todos os equipamentos de um jogador
router.get('/jogador/:id_jogador/equipamento', [authMiddleware.check], equipamentoController.findByJogador);

/**
 * @swagger
 * /jogador/{id_jogador}/equipamento:
 *   post:
 *     summary: Cria um novo equipamento para um jogador
 *     description: Adiciona um novo equipamento e o associa a um jogador.
 *     tags: [Equipamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_jogador
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do jogador que receberá o equipamento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoEquipamento'
 *     responses:
 *       '201':
 *         description: Equipamento criado e associado ao jogador.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipamento'
 *       '400':
 *         description: Dados do equipamento são inválidos.
 */
//cria um novo equipamento para um jogador
router.post('/jogador/:id_jogador/equipamento', [authMiddleware.check], equipamentoController.create);

/**
 * @swagger
 * /jogador/{id_jogador}/equipamento/:id_equipamento:
 *   put:
 *     summary: Atualiza um equipamento de um jogador
 *     description: Modifica o equipamento associado a um jogador.
 *     tags: [Equipamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_jogador
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do jogador que terá o equipamento atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoEquipamento'
 *     responses:
 *       '201':
 *         description: Equipamento atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipamento'
 *       '500':
 *         description: Erro no servidor.
 */
//atualiza o equipamento de um jogador
router.put('/jogador/:id_jogador/equipamento/:id_equipamento', [authMiddleware.check], equipamentoController.update);

module.exports = router;