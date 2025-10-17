const Sequelize = require('sequelize');
const db = require('./conexao.js');

class Usuario {
  #nome;
  #email;
  #senha;

  construct() {}

  get nome() {
    return this.#nome;
  }
  set nome(nome) {
    this.#nome = nome;
  }

  get email() {
    return this.#email;
  }
  set email(email) {
    this.#email = email;
  }

  get senha() {
    return this.#senha;
  }
  set senha(senha) {
    this.#senha = senha;
  }

  static async create(novoUsuario) {
    try {
      const usuario = await UsuarioModel.create({
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        senha: novoUsuario.senha,
      });
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  static async findOne(dados) {
    try {
      const resultado = await UsuarioModel.findOne({ where: dados });
      if (resultado) {
        return resultado;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}
const UsuarioModel = db.define('usuario', {
  nome: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING(80),
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING(64),
    allowNull: false,
  },
});
module.exports = { Usuario, UsuarioModel };
