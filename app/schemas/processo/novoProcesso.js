module.exports = {
  type: 'object',
  properties: {
    numero_processo: { type: 'string', maxLength: 20 },
    descricao: { type: 'string' },
    status: { type: 'string' }
  },
  required: ['numero_processo', 'descricao', 'status'],
  additionalProperties: false,
};