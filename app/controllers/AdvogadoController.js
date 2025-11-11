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

    // Inicia uma transação para garantir a integridade dos dados
    const t = await sequelize.transaction();

    try {
      // 1. Atualiza os dados principais do advogado
      await models.advogado.AdvogadoModel.update( // Usando o Model diretamente, que é o padrão do Sequelize
        { nome, oab, especialidade },
        { where: { id: id }, transaction: t }
      );

      // 2. Garante que 'processos' é um array antes de continuar
      if (processos && Array.isArray(processos)) {
        
        // 3. Itera sobre os processos enviados pelo formulário
        for (const processoDoForm of processos) {
          if (processoDoForm.id) {
            // SE TEM ID: Atualiza o processo existente
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
            // SE NÃO TEM ID: Cria um novo processo
            await ProcessoModel.create(
              {
                numero_processo: processoDoForm.numero_processo,
                descricao: processoDoForm.descricao,
                status: processoDoForm.status,
                id_advogado: id, // Vincula ao advogado que está sendo editado
              },
              { transaction: t }
            );
          }
        }

        // 4. Lógica para EXCLUIR processos que foram removidos no formulário
        const idsDoFormulario = processos
          .map((p) => p.id)
          .filter((pId) => pId !== null); // Pega apenas os IDs que não são nulos

        await ProcessoModel.destroy({
          where: {
            id_advogado: id,
            id: { [Op.notIn]: idsDoFormulario }, // Deleta onde o ID não está na lista de IDs do formulário
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

  // update(request, response) {
  //   const id = request.params.id;

  //   Advogado.findByPk(id)
  //     .then((buscaAdvogado) => {
  //       if (buscaAdvogado === null) {
  //         return response.status(404).json({
  //           message: 'Advogado nao encontrado',
  //         });
  //       } else {
  //         Advogado.update(request.body, id).then((atualizado) => {
  //           if (atualizado) {
  //             Advogado.findByPk(id).then((advogadoAtualizado) => {
  //               return response.status(200).json(advogadoAtualizado);
  //             });
  //           } else {
  //             return response.status(500).json({
  //               message: 'ocorreu algum problema no servidor',
  //             });
  //           }
  //         });
  //       }
  //     })
  //     .catch((erro) => {
  //       return response.status(500).json({
  //         message: erro.message,
  //       });
  //     });
  // }

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
