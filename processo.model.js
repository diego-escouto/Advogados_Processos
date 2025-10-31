module.exports = (sequelize, DataTypes) => {
  const Processo = sequelize.define(
    'processo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      numero_processo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      descricao: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      id_advogado: {
        type: DataTypes.INTEGER,
        allowNull: true, // <-- MUDANÇA PRINCIPAL: permitir nulos
        references: {
          model: 'advogado',
          key: 'id',
        },
      },
    }
  );

  return Processo;
};