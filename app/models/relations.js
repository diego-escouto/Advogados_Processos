//foi optado em implementar os relacionamentos em arquivo separado
//porem cada relacionamento pode ser implementado dentro de sua model separadamente
module.exports = function (models) {
  //este relacionamento poderia estar em app/models/Advogado:
  models.advogado.hasMany(models.processo, {
    foreignKey: 'id_advogado', //nome da FK
    onDelete: 'SET NULL', //configuracao da FK
  });
  //este relacionamento poderia estar em app/models/Processo:
  models.processo.belongsTo(models.advogado, {
    foreignKey: 'id_advogado',
    onDelete: 'SET NULL',
  });
};
