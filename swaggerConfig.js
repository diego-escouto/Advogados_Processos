const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Advogados e Processos API - Pack de Aprendizado', 
      version: '1.0.0',
      description: 'Documentação da API RESTful para gestão de Advogados, Processos e Usuários.', // Descrição da API
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
      // Define os "objetos" (schemas) que sua API usa
      schemas: {
        Advogado: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID do advogado', example: 1 },
            nome: { type: 'string', description: 'Nome do advogado', example: 'Maria Silva' },
            oab: { type: 'string', description: 'Número da OAB', example: '12345678' },
            especialidade: { type: 'string', description: 'Especialidade', example: 'Penal' }
          }
        },
        NovoAdvogado: {
          type: 'object',
          required: ['nome', 'oab', 'especialidade'],
          properties: {
            nome: { type: 'string', description: 'Nome do advogado' },
            oab: { type: 'string', description: 'Número da OAB' },
            especialidade: { type: 'string', description: 'Especialidade' }
          }
        },
        Processo: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID do processo', example: 1 },
            numero_processo: { type: 'string', description: 'Número do processo', example: '00000000000000000001' },
            descricao: { type: 'string', description: 'Descrição do processo', example: 'Processo de exemplo' },
            status: { type: 'string', description: 'Status do processo', example: 'em andamento' },
            id_advogado: { type: 'integer', description: 'ID do advogado responsável', example: 1 }
          }
        },
        NovoProcesso: {
          type: 'object',
          required: ['numero_processo', 'descricao', 'status', 'id_advogado'],
          properties: {
            numero_processo: { type: 'string', description: 'Número do processo' },
            descricao: { type: 'string', description: 'Descrição do processo' },
            status: { type: 'string', description: 'Status do processo' },
            id_advogado: { type: 'integer', description: 'ID do advogado responsável' }
          }
        },
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID do usuário', example: 1 },
            nome: { type: 'string', description: 'Nome do usuário', example: 'João' },
            email: { type: 'string', description: 'Email do usuário', example: 'joao@email.com' }
          }
        },
        NovoUsuario: {
          type: 'object',
          required: ['nome', 'email', 'senha'],
          properties: {
            nome: { type: 'string', description: 'Nome do usuário' },
            email: { type: 'string', description: 'Email do usuário' },
            senha: { type: 'string', description: 'Senha do usuário' }
          }
        },
        LoginUsuario: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: { type: 'string', description: 'Email do usuário' },
            senha: { type: 'string', description: 'Senha do usuário' }
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