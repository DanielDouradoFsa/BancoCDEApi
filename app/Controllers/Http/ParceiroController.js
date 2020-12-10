'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with parceiros
 */

const Database = use('Database')
const Entidade = use('App/Models/Entidade')
const Parceiro = use('App/Models/Parceiro')
const Endereco = use('App/Models/Endereco')
const User = use('App/Models/User')



class ParceiroController {
  /**
   * Show a list of all parceiros.
   * GET parceiros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const parceiros = await Database
        .select('*')
        .table('entidades')
        .innerJoin('parceiros', 'entidades.id', 'parceiros.id_Entidade')
      response.send(parceiros)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to be used for creating a new parceiro.
   * GET parceiros/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new parceiro.
   * POST parceiros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
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
        categoria,
        segmento
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
      },trx)
      const parceiro = await Parceiro.create({
        id_Entidade: entidade.id,
        categoria,
        segmento
      }, trx)


      await trx.commit()

      return response.status(201).send({ message: 'Parceiro criado com sucesso' });
    } catch (err) {
        await trx.rollback()
        return response.status(400).send({
          error: `Erro: ${err.message}`
        })
    }
  }

  /**
   * Display a single parceiro.
   * GET parceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try{
      const entidade = await Entidade.findBy('id_user', request.params.id_user)
      const parceiro = await Parceiro.findBy('id_Entidade', entidade.id)
      const endereco = await Endereco.findBy('id', entidade.id_Endereco)
      const user = await User.findBy('id', entidade.id_user)
      const fullParceiro = {
        entidade,
        parceiro,
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
   * Render a form to update an existing parceiro.
   * GET parceiros/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update parceiro details.
   * PUT or PATCH parceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try{
      
      const entidade = await Entidade.findBy('id_user', request.params.id_user)
      const parceiro = await Parceiro.findBy('id_Entidade', entidade.id)
      const endereco = await Endereco.findBy('id', entidade.id_Endereco)
      const usuario = await User.find(request.params.id_user)

      const parceiroReq = request.only(['categoria','segmento'])
      const enderecoReq = request.only(['estado', 'cidade', 'bairro', 'rua', 'numero','complemento'])

      const usuarioReq = request.only(['email', 'password'])
      const entidadeReq = request.only(['razaoSocial', 'nomeFantasia', 'nomeResponsavel', 'telefone','telefoneFixo'])

     
      parceiro.merge({ ...parceiroReq })
      endereco.merge({ ...enderecoReq })
      usuario.merge({ ...usuarioReq })
      entidade.merge({...entidadeReq})
      
      await parceiro.save(trx)
      await endereco.save(trx)
      await usuario.save(trx)
      await entidade.save(trx)

      await trx.commit()

      return response.status(201).send({message: 'Parceiro alterado com sucesso'});

    } catch (err) {
      
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Delete a parceiro with id.
   * DELETE parceiros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async destroy ({ params, request, response }) {
    
    }
}

module.exports = ParceiroController
