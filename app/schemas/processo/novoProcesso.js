module.exports = {
  type: 'object',
  properties: {
    numero_processo: { type: 'integer' },
    descricao: { type: 'string' },
    status: { type: 'string' },
    id_advogado: { type: 'integer' },
  },
  required: ['numero_processo', 'descricao', 'status', 'id_advogado'],
  additionalProperties: false,
};