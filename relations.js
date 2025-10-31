module.exports = (models) => {
  const { advogado, processo } = models;

  // Um advogado pode ter muitos processos
  advogado.hasMany(processo, {
    foreignKey: {
      name: 'id_advogado',
      allowNull: true, // Garante que a coluna no BD aceite nulos
    },
    onDelete: 'SET NULL', // Define a ação ao deletar um advogado
  });

  // Um processo pertence a um advogado
  processo.belongsTo(advogado, {
    foreignKey: 'id_advogado',
  });
};