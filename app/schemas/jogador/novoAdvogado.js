module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    oab: { type: 'integer', maximum: 8 },
    especialidade: { type: 'integer', maximum: 100 },
  },
  required: ['nome', 'oab', 'especialidade'],
  additionalProperties: false,
};
