module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    oab: { type: 'string', maxLength: 8 },
    especialidade: { type: 'string', maxLength: 100 },
  },
  required: ['nome', 'oab', 'especialidade'],
  additionalProperties: false,
};
