'use strict'

const Database = use('Database')
const Pessoa = use('App/Models/Pessoa')
const Colaboradore = use('App/Models/Colaboradore')
const Endereco = use('App/Models/Endereco')
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with colaboradores
 */
class ColaboradoreController {
  /**
   * Show a list of all colaboradores.
   * GET colaboradores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const colaboradores = await Database
        .select('*')
        .table('pessoas')
        .innerJoin('colaboradores', 'pessoas.id', 'colaboradores.id_Pessoa')
      response.send(colaboradores)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to be used for creating a new colaboradore.
   * GET colaboradores/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new colaboradore.
   * POST colaboradores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const {
        profissao,
        expVendas,
        yransporteProprio,
        MEI,
        CNH,
        CNHClasse,
        CNHVencimento,
        id_instituicao,
        nome,
        sobreNome,
        CPF,
        telefone,
        Senha,
        Email,
        Estado,
        Cidade,
        Rua,
        Numero,
        Bairro,
        Complemento
      } = request.all()
      const endereco = await Endereco.create({
        Estado,
        Cidade,
        Rua,
        Numero,
        Bairro,
        Complemento
      }, trx)
      const user = await User.create({
        username: Email,
        email: Email,
        password: Senha,
      }, trx)
      const pessoa = await Pessoa.create({
        nome,
        sobreNome,
        CPF,
        telefone,
        id_user: user.id,
        id_endereco: endereco.id
      }, trx)
      const colaborador = await Colaboradore.create({
        profissao,
        expVendas,
        yransporteProprio,
        MEI,
        CNH,
        CNHClasse,
        CNHVencimento,
        id_Pessoa: pessoa.id,
      }, trx)
      await trx.commit()

      return response.status(201).send({ message: 'Colaborador criado com sucesso' });
    } catch (err) {
      await trx.rollback()

      return response.status(400).send({
        error: `Erro: ${err.message}`
      })

    }
  }

  /**
   * Display a single colaboradore.
   * GET colaboradores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing colaboradore.
   * GET colaboradores/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update colaboradore details.
   * PUT or PATCH colaboradores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a colaboradore with id.
   * DELETE colaboradores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ColaboradoreController
