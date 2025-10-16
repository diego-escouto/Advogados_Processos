const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Game API - Pack de Aprendizado',
      version: '1.0.0',
      description: 'Documentação da API RESTful para gestão de Jogadores e Equipamentos.',
    },
    servers: [
      {
        url: 'http://localhost:3000', // A URL base do seu servidor (verifique em seu .env)
        description: 'Servidor de Desenvolvimento',
      },
    ],
    // Define o esquema de segurança para o Token JWT
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Para acessar as rotas protegidas, insira o token no formato: Bearer [seu_token]'
        }
      },
      // Define os "objetos" que sua API usa
      schemas: {
        Jogador: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID do jogador', example: 1 },
            nome: { type: 'string', description: 'Nome do jogador', example: 'player1' },
            ataque: { type: 'integer', description: 'Pontos de ataque', example: 40 },
            defesa: { type: 'integer', description: 'Pontos de defesa', example: 50 },
            pontos_vida: { type: 'integer', description: 'Pontos de vida', example: 100 },
          }
        },
        NovoJogador: {
          type: 'object',
          required: ['nome', 'ataque', 'defesa'],
          properties: {
            nome: { type: 'string', description: 'Nome do novo jogador' },
            ataque: { type: 'integer', description: 'Pontos de ataque (máx 100)', maximum: 100 },
            defesa: { type: 'integer', description: 'Pontos de defesa (máx 100)', maximum: 100 },
            pontos_vida: { type: 'integer', description: 'Pontos de vida (máx 100)', maximum: 100 }
          }
        },
        Equipamento: {
            type: 'object',
            properties: {
                id: { type: 'integer', description: 'ID do equipamento' },
                id_jogador: { type: 'integer', description: 'ID do jogador dono do equipamento' },
                descricao: { type: 'string', description: 'Descrição do equipamento', example: 'espada' },
                bonus_ataque: { type: 'integer', description: 'Bônus de ataque fornecido', example: 30 },
                bonus_defesa: { type: 'integer', description: 'Bônus de defesa fornecido', example: 15 }
            }
        },
        NovoEquipamento: {
            type: 'object',
            required: ['descricao', 'bonus_ataque', 'bonus_defesa'],
            properties: {
                descricao: { type: 'string', description: 'Descrição do novo equipamento' },
                bonus_ataque: { type: 'integer', description: 'Bônus de ataque' },
                bonus_defesa: { type: 'integer', description: 'Bônus de defesa' }
            }
        },
        Cliente: {
            type: 'object',
            required: ['nome', 'email', 'senha'],
            properties: {
                nome: { type: 'string', description: 'Nome do cliente' },
                email: { type: 'string', description: 'Email do cliente' },
                senha: { type: 'string', description: 'Senha do cliente' }
            }
        },
         LoginCliente: {
            type: 'object',
            required: ['email', 'senha'],
            properties: {
                email: { type: 'string', description: 'Email do cliente' },
                senha: { type: 'string', description: 'Senha do cliente' }
            }
        }
      }
    }
  },
  // Caminho para os arquivos que contêm os comentários do Swagger
  apis: [
    './app/routes/*.js', // Aponta para todos os arquivos na sua pasta de rotas
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;