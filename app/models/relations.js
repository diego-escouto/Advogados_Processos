//foi optado em implementar os relacionamentos em arquivo separado
//porem cada relacionamento pode ser implementado dentro de sua model separadamente
module.exports = function (models) {
  //este relacionamento poderia estar em app/models/Advogado:
  models.advogado.hasMany(models.processo, {
    foreignKey: {
      name: 'id_advogado',
      allowNull: true, // <-- CORREÇÃO: Especifica que a FK pode ser nula
    },
    onDelete: 'SET NULL',
  });
  //este relacionamento poderia estar em app/models/Processo:
  models.processo.belongsTo(models.advogado, {
    foreignKey: 'id_advogado',
  });
};
