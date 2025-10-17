const Sequelize = require('sequelize');
const db = require('./conexao.js');

class Processo {
  #numero_processo;
  #descricao;
  #status;
  #id_advogado

  constructor() {}
  
  get numero_processo() {
    return this.#numero_processo;
  }
  set numero_processo(numero) {
    this.#numero_processo = numero;
  }

  get descricao() {
    return this.#descricao;
  }
  set descricao(descricao) {
    this.#descricao = descricao;
  }


  get status() {
    return this.#status;
  }
  set status(status) {
    this.#status = status;
  }

  static findAllByJogadorId(id_advogado) {
    return ProcessoModel.findAll({ where: { id_advogado } });
  }

  static create(novoProcesso) {
    return ProcessoModel.create(novoProcesso);
  }

  static update(processoAtualizado) {
    return ProcessoModel.update(processoAtualizado);
  }

  static findOne(id_advogado, id_processo) {
  return ProcessoModel.findOne({ where: { id: id_processo, id_advogado: id_advogado } });
}

    
    static async update(dados, id_advogado, id_processo) {
      try {
        const resultado = await ProcessoModel.update(dados, { where: { id: id_processo, id_advogado: id_advogado} });
        
        console.log('update model', resultado);
        if (resultado) {
          return resultado;
        } else {
          return false;
        }
      } catch (error) {
        throw error;
      }
    }

  }
  

const EquipamentoModel = db.define('equipamento', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_jogador: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  numero_processo: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING(80),
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
});

module.exports = { Processo, ProcessoModel };