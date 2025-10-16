//validacao de schema
const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/advogado/novoAdvogado.js');
const validacao = ajv.compile(schema);
//models
const models = require('../models/index.js');
const Advogado = models.advogado.Advogado;

class AdvogadoController {
  findAll(request, response) {
    const processoModel = models.processo.ProcessoModel;
    Advogado.findAll(processoModel)
      .then((data) => {
        if (data) {
          return response.status(200).json(data);
        } else {
          return response.status(404).json({
            message: 'Advogado nao encontrado',
          });
        }
      })
      .catch((erro) => {
        response.status(500).json({
          message: erro.message,
        });
      });
  }

  find(request, response) {
    const id = request.params.id;
    Advogado.findByPk(id)
      .then((data) => {
        if (data) {
          return response.status(200).json(data);
        } else {
          return response.status(404).json({
            message: 'Advogado nao encontrado',
          });
        }
      })
      .catch((erro) => {
        return response.status(500).json({
          message: erro.message,
        });
      });
  }

  create(request, response) {
    let validacoes = validacao(request.body);
    if (!validacoes) {
      let mensagem = validacao.errors[0].instancePath.replace('/', '');
      mensagem += ' ' + validacao.errors[0].message;
      return response.status(400).json({
        message: mensagem,
      });
    }

    Advogado.create(request.body)
      .then((data) => {
        return response.status(201).json(data);
      })
      .catch((erro) => {
        return response.status(500).json({
          message: 'erro no servidor: ' + erro.message,
        });
      });
  }

  update(request, response) {
    const id = request.params.id;

    Advogado.findByPk(id)
      .then((buscaAdvogado) => {
        if (buscaAdvogado === null) {
          return response.status(404).json({
            message: 'Advogado nao encontrado',
          });
        } else {
          Advogado.update(request.body, id).then((atualizado) => {
            if (atualizado) {
              Advogado.findByPk(id).then((advogadoAtualizado) => {
                return response.status(200).json(advogadoAtualizado);
              });
            } else {
              return response.status(500).json({
                message: 'ocorreu algum problema no servidor',
              });
            }
          });
        }
      })
      .catch((erro) => {
        return response.status(500).json({
          message: erro.message,
        });
      });
  }

  delete(request, response) {
    const id = request.params.id;
    Advogado.delete(id)
      .then((removido) => {
        if (removido) {
          return response.status(200).json({
            message: 'Advogado excluido com sucesso',
          });
        } else {
          return response.status(404).json({
            message: 'Advogado nao encontrado',
          });
        }
      })
      .catch((erro) => {
        response.status(500).json({
          message: erro.message,
        });
      });
  }
}
module.exports = new AdvogadoController();
