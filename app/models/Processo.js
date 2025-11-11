const Sequelize = require('sequelize');
const db = require('./conexao.js');

class Processo {
  #numero_processo;
  #descricao;
  #status;
  #id_advogado

  constructor() { }

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
  get id_advogado() {
    return this.#id_advogado;
  }
  set id_advogado(id_advogado) {
    this.#id_advogado = id_advogado;
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
      const resultado = await ProcessoModel.update(dados, { where: { id: id_processo, id_advogado: id_advogado } });

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

  static async delete(id) {
    try {
      const processo = await ProcessoModel.findByPk(id);
      if (processo) {
        await processo.destroy();
        return true; // Retorna true se o processo foi encontrado e excluído
      } else {
        return false; // Retorna false se o processo não foi encontrado
      }
    } catch (error) {
      throw error;
    }
  }

}


const ProcessoModel = db.define('processo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_advogado: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  numero_processo: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
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