const models = require('../models/index.js');
const Usuario = models.usuario.Usuario;
const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/usuario/novoUsuario.js');
const validacao = ajv.compile(schema);
const helper = require('../commons/helper.js');
const schemaLogin = require('../schemas/usuario/login.js');
const validacaoLogin = ajv.compile(schemaLogin);

class UsuarioController {
  create(request, response) {
    let validacoes = validacao(request.body);
    if (!validacoes) {
      let mensagem = validacao.errors[0].instancePath.replace('/', '');
      mensagem += ' ' + validacao.errors[0].message;
      return response.status(400).json({
        message: mensagem,
      });
    }

    const usuario = {
      nome: request.body.nome ? request.body.nome : null,
      email: request.body.email,
      senha: helper.hashSenha(request.body.senha),
    };

    Usuario.create(usuario)
      .then((data) => {
        data.setDataValue('senha', '');
        data.setDataValue('token', helper.gerarTokenAcesso(usuario.nome, usuario.id));
        return response.status(201).json(data);
      })
      .catch((erro) => {
        return response.status(500).send({
          message: erro.message,
        });
      });
  }

  login(request, response) {
    let validacoes = validacaoLogin(request.body);
    if (!validacoes) {
      let mensagem = validacaoLogin.errors[0].instancePath.replace('/', '');
      mensagem += ' ' + validacaoLogin.errors[0].message;
      return response.status(400).json({
        message: mensagem,
      });
    }

    let dados = request.body;
    dados.senha = helper.hashSenha(dados.senha);

    Usuario.findOne(dados)
      .then((registro) => {
        if (!registro) {
          return response.status(404).json({
            message: 'Usuário ou senha nao foram encontrados',
          });
        }
        return response.status(200).json({
          token: helper.gerarTokenAcesso(registro.nome, registro.id),
        });
      })
      .catch((erro) => {
        return response.status(500).send({
          message: erro.message,
        });
      });
  }
}

module.exports = new UsuarioController();
