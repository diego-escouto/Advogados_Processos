// No topo do seu arquivo AdvogadoController.js, adicione estas importações:
const { Op } = require('sequelize');
const sequelize = require('../models/conexao.js'); // Verifique se este é o caminho correto para sua conexão
const { ProcessoModel } = require('../models/Processo.js'); // Importe o ProcessoModel

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
    Advogado.findAll() // Chama o método que já inclui os processos
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

  async update(request, response) {
    const id = request.params.id;
    const { nome, oab, especialidade, processos } = request.body;


    const t = await sequelize.transaction();

    try {

      await models.advogado.AdvogadoModel.update(
        { nome, oab, especialidade },
        { where: { id: id }, transaction: t }
      );


      if (processos && Array.isArray(processos)) {


        for (const processoDoForm of processos) {
          if (processoDoForm.id) {

            await ProcessoModel.update(
              {
                numero_processo: processoDoForm.numero_processo,
                descricao: processoDoForm.descricao,
                status: processoDoForm.status,
              },
              {
                where: { id: processoDoForm.id, id_advogado: id },
                transaction: t,
              }
            );
          } else {

            await ProcessoModel.create(
              {
                numero_processo: processoDoForm.numero_processo,
                descricao: processoDoForm.descricao,
                status: processoDoForm.status,
                id_advogado: id,
              },
              { transaction: t }
            );
          }
        }


        const idsDoFormulario = processos
          .map((p) => p.id)
          .filter((pId) => pId !== null);

        await ProcessoModel.destroy({
          where: {
            id_advogado: id,
            id: { [Op.notIn]: idsDoFormulario },
          },
          transaction: t,
        });
      }

      // Se tudo deu certo, confirma as alterações no banco
      await t.commit();

      // Busca o advogado atualizado com todas as associações para retornar a informação completa
      const advogadoAtualizado = await Advogado.findByPk(id); // Chama o método que já inclui os processos
      return response.status(200).json(advogadoAtualizado);

    } catch (erro) {
      // Se algo deu errado, desfaz todas as operações
      await t.rollback();
      console.error("Erro na transação de atualização:", erro);
      return response.status(500).json({
        message: 'Ocorreu um erro no servidor: ' + erro.message,
      });
    }
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
