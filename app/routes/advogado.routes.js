const express = require('express');
var router = express.Router();
const AdvogadoController = require('../controllers/AdvogadoController.js');
const ProcessoController = require('../controllers/ProcessoController.js');
const authMiddleware = require('../middlewares/TokenValido.js');

/**
 * @swagger
 * tags:
 *   - name: Advogado
 *     description: Rotas para gerenciar advogados
 *   - name: Processos
 *     description: Rotas para gerenciar processos de um advogado
 *   - name: Usuário
 *     description: Rotas para gerenciar os usuários
 */

/**
 * @swagger
 * /advogado:
 *   get:
 *     summary: Lista todos os advogados
 *     description: Retorna uma lista com todos os advogados e seus processos.
 *     tags: [Advogado]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de advogados retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Advogado'
 *       '401':
 *         description: Não autorizado.
 */
//retorna todos os advogados
router.get('/advogado', [authMiddleware.check], AdvogadoController.findAll);


/**
 * @swagger
 * /advogado/{id}:
 *   get:
 *     summary: Recupera um advogado pelo seu ID
 *     description: Busca e retorna os dados de um advogado específico.
 *     tags: [Advogado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado.
 *     responses:
 *       '200':
 *         description: Dados do advogado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advogado'
 *       '404':
 *         description: Advogado não encontrado.
 */
//recupera um advogado pelo seu id
router.get('/advogado/:id', [authMiddleware.check], AdvogadoController.find);


/**
 * @swagger
 * /advogado:
 *   post:
 *     summary: Cria um novo advogado
 *     description: Cadastra um novo advogado no sistema.
 *     tags: [Advogado]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoAdvogado'
 *     responses:
 *       '201':
 *         description: Advogado criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 */
//cria um novo advogado
router.post('/advogado', [authMiddleware.check], AdvogadoController.create);

/**
 * @swagger
 * /advogado/{id}:
 *   put:
 *     summary: Modifica um advogado pelo seu ID
 *     description: Modifica os dados de um advogado específico.
 *     tags: [Advogado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado.
 *     responses:
 *       '200':
 *         description: Dados do advogado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advogado'
 *       '500':
 *         description: Erro no servidor.
 */
//atualiza um jogador pelo seu id
router.put('/advogado/:id', [authMiddleware.check], AdvogadoController.update);

/**
 * @swagger
 * /advogado/{id}:
 *   delete:
 *     summary: Exclui um advogado pelo seu ID
 *     description: Apaga os dados de um advogado específico.
 *     tags: [Advogado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado.
 *     responses:
 *       '200':
 *         description: Dados do advogado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advogado'
 *       '404':
 *         description: Advogado não encontrado.
 */
//exclui um advogado pelo seu id
router.delete('/advogado/:id', [authMiddleware.check], AdvogadoController.delete);

/**
 * @swagger
 * /advogado/{id_advogado}/processo:
 *   get:
 *     summary: Lista todos os processos um advogado
 *     description: Retorna todos os processos associados a um advogado.
 *     tags: [Processo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_advogado
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado que receberá o processo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoProcesso'
 *     responses:
 *       '201':
 *         description: Processo criado e associado ao advogado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Processo'
 *       '400':
 *         description: Dados do processo são inválidos.
 */
//retorna todos os processos de um advogado
router.get('/advogado/:id_advogado/processo', [authMiddleware.check], ProcessoController.findByAdvogado);

/**
 * @swagger
 * /advogado/{id_advogado}/processo:
 *   post:
 *     summary: Cria um novo processo para um advogado
 *     description: Adiciona um novo processo e o associa a um advogado.
 *     tags: [Processo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_advogado
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado que receberá o processo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoProcesso'
 *     responses:
 *       '201':
 *         description: Processo criado e associado ao advogado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Processo'
 *       '400':
 *         description: Dados do processo são inválidos.
 */
//cria um novo processo para um advogado
router.post('/advogado/:id_advogado/processo', [authMiddleware.check], ProcessoController.create);

/**
 * @swagger
 * /advogado/{id_advogado}/processo/:id_processo:
 *   put:
 *     summary: Atualiza um processo de um advogado
 *     description: Modifica o processo associado a um advogado.
 *     tags: [Processo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_advogado
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do advogado que terá o processo atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoProcesso'
 *     responses:
 *       '201':
 *         description: Processo atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Processo'
 *       '500':
 *         description: Erro no servidor.
 */
//atualiza o processo de um advogado
router.put('/advogado/:id_advogado/processo/:id_processo', [authMiddleware.check], ProcessoController.update);

/**
 * @swagger
 * /processo/{id_processo}:
 *   delete:
 *     summary: Exclui um processo pelo seu ID
 *     description: Remove um processo do banco de dados.
 *     tags: [Processo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_processo
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do processo a ser excluído.
 *     responses:
 *       '200':
 *         description: Processo excluído com sucesso.
 *       '404':
 *         description: Processo não encontrado.
 *       '500':
 *         description: Erro no servidor.
 */
// Exclui um processo pelo seu ID
router.delete('/processo/:id_processo', [authMiddleware.check], ProcessoController.delete);


module.exports = router;