const models = require('../models/index.js');
const Processo = models.processo.Processo;
const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../schemas/processo/novoProcesso.js');
const validacao = ajv.compile(schema);

class ProcessoController {
    findByProcesso(request, response) {
        Processo.findAllByProcessoId(request.params.id_processo)
            .then((processos) => {
                if (processos && processos.length > 0) {
                    return response.status(200).json(processos);
                }
                return response.status(404).json({ message: 'Nenhum processo encontrado para este advogado' });
            })
            .catch((error) => {
                return response.status(500).json({ message: error.message });
            });
    }

    // ADICIONADO: busca todos os processos de um advogado por id_advogado
    findByAdvogado(request, response) {
        const idAdvogado = request.params.id_advogado;

        // se o model tiver método personalizado
        if (typeof Processo.findAllByAdvogadoId === 'function') {
            Processo.findAllByAdvogadoId(idAdvogado)
                .then(processos => {
                    if (processos && processos.length > 0) return response.status(200).json(processos);
                    return response.status(404).json({ message: 'Nenhum processo encontrado para este advogado' });
                })
                .catch(err => response.status(500).json({ message: err.message }));
            return;
        }

        // fallback para Sequelize ou implementation similar
        if (typeof Processo.findAll === 'function') {
            Processo.findAll({ where: { id_advogado: idAdvogado } })
                .then(processos => {
                    if (processos && processos.length > 0) return response.status(200).json(processos);
                    return response.status(404).json({ message: 'Nenhum processo encontrado para este advogado' });
                })
                .catch(err => response.status(500).json({ message: err.message }));
            return;
        }

        return response.status(500).json({ message: 'Método do model para buscar processos por advogado não implementado' });
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

        const processoParaCriar = {
            ...request.body,
            id_advogado: request.params.id_advogado,
        };

        Processo.create(processoParaCriar)
            .then((novoProcesso) => {
                return response.status(201).json(novoProcesso);
            })
            .catch((erro) => {
                return response.status(500).json({ message: 'erro no servidor: ' + erro.message });
            });
    }

    update(request, response) {
        let validacoes = validacao(request.body);
        if (!validacoes) {
            let mensagem = validacao.errors[0].instancePath.replace('/', '');
            mensagem += ' ' + validacao.errors[0].message;
            return response.status(400).json({
                message: mensagem,
            });
        }

        const processoParaAtualizar = {
            ...request.body,
        };

        Processo.update(request.body, request.params.id_advogado, request.params.id_processo)
            .then(processoAtualizado => {
                if (processoAtualizado == 1) {
                    Processo.findOne(request.params.id_advogado, request.params.id_processo).then(data => {
                        response.send(data);
                    });
                } else {
                    response.send({
                        message: `Não foi possível atualizar o processo com id=${request.params.id_processo}. Talvez o processo não foi encontrado ou o req.body está vazio!`
                    });
                }
            })
            .catch(erro => {
                return response.status(500).json({ message: 'erro no servidor: ' + erro.message });
            });
    }
}

module.exports = new ProcessoController();