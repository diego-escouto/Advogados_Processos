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
    message: 'Advogados Processos API',
    version: '1.0',
  });
});
const advogadoRotas = require('./app/routes/advogado.routes.js');
const usuarioRotas = require('./app/routes/usuario.routes.js');
app.use(advogadoRotas);
app.use(usuarioRotas);

//RODANDO SERVER
app.listen(config.port, () => {
  console.log('servidor on-line');
});
