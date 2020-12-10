'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with instituicaos
 */
const Database = use('Database')
const Entidade = use('App/Models/Entidade')
const Instituicao = use('App/Models/Instituicao')
const Endereco = use('App/Models/Endereco')
const User = use('App/Models/User')
class InstituicaoController {
  /**
   * Show a list of all instituicaos.
   * GET instituicaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const associados = await Database
        .select('*')
        .table('entidades')
        .innerJoin('instituicaos', 'entidades.id', 'instituicaos.id_Entidade')
      response.send(associados)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to be used for creating a new instituicao.
   * GET instituicaos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new instituicao.
   * POST instituicaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const trx = await Database.beginTransaction()
    try {
      const {
        razaoSocial,
        CNPJ,
        nomeFantasia,
        nomeResponsavel,
        sobreNomeResp,
        telefone,
        telefoneFixo,
        email,
        senha,
        estado,
        cidade,
        rua,
        numero,
        bairro,
        complemento,
        categoria
      } = request.all()
      const endereco = await Endereco.create({
        estado,
        cidade,
        rua,
        numero,
        bairro,
        complemento
      }, trx)
      const user = await User.create({
        email,
        username:email,
        password:senha
      }, trx)
      const entidade = await Entidade.create({
        razaoSocial,
        CNPJ,
        nomeFantasia,
        nomeResponsavel,
        sobreNomeResp,
        telefone,
        telefoneFixo,
        id_user: user.id,
        id_Endereco: endereco.id,
      }, trx)
      const instituicao = await Instituicao.create({
        id_Entidade: entidade.id,
        categoria
      }, trx)


      await trx.commit()

      return response.status(201).send({ message: 'Instituicao criada com sucesso' });
    } catch (err) {
      await trx.rollback()
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Display a single instituicao.
   * GET instituicaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try{
      const entidade = await Entidade.findBy('id_user', request.params.id_user)
      const instituicao = await Instituicao.findBy('id_Entidade', entidade.id)
      const endereco = await Endereco.findBy('id', entidade.id_Endereco)
      const user = await User.findBy('id', entidade.id_user)
      const fullParceiro = {
        entidade,
        instituicao,
        endereco,
        user
      }

      return response.status(200).json(fullParceiro)

    }catch(err){
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to update an existing instituicao.
   * GET instituicaos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update instituicao details.
   * PUT or PATCH instituicaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const entidade = await Entidade.findBy('id_user',request.params.id_user)
      const instituicao = await Instituicao.findBy("id_Entidade",entidade.id)
      const endereco = await Endereco.findBy('id', entidade.id_Endereco)
      const usuario = await User.find(request.params.id_user)

      const entidadeReq = request.only(["razaoSocial", 'nomeFantasia',
                                        'nomeResponsavel','sobreNomeResp',
                                        'telefone',
                                        'telefoneFixo'])
      const instituicaoReq = request.only(['categoria'])
      const enderecoReq = request.only(['Estado', 'Cidade', 'Bairro', 'Rua', 'Numero', 'Complemento'])
      const usuarioReq = request.only(['email', 'password'])

      entidade.merge({ ...entidadeReq })
      instituicao.merge({ ...instituicaoReq })
      endereco.merge({ ...enderecoReq })
      usuario.merge({ ...usuarioReq })

      await entidade.save(trx)
      await instituicao.save(trx)
      await endereco.save(trx)
      await usuario.save(trx)

      await trx.commit()

      return response.status(201).send({ message: 'Instituição alterada com sucesso' });
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Delete a instituicao with id.
   * DELETE instituicaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

  }
}

module.exports = InstituicaoController
