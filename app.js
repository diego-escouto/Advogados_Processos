require('dotenv').config();
const express = require('express');
const config = require('./config.js');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig'); // Importa a configuração

//PRE-CONFIGURACAO
app.use(express.json()); //parser dados de requisicoes em JSON
app.use(
  cors({
    origin: '*',
  })
);

//BANCO DE DADOS
const conexao = require('./app/models'); //inicializa a config do BD com sequelize

// --- ROTA PARA A DOCUMENTAÇÃO ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//ROTAS
app.get('/', (request, response) => {
  response.json({
    //documento JSON
    message: 'Game API',
    version: '1.0',
  });
});
const jogadorRotas = require('./app/routes/jogador.routes.js');
const clienteRotas = require('./app/routes/cliente.routes.js');
app.use(jogadorRotas);
app.use(clienteRotas);

//RODANDO SERVER
app.listen(config.port, () => {
  console.log('servidor on-line');
});
