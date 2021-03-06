'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pessoas
 */
const Database = use('Database')
const Pessoa = use('App/Models/Pessoa')
const Endereco = use('App/Models/Endereco')
const User = use('App/Models/User')
class PessoaController {

  /**
   * Show a list of all pessoas.
   * GET pessoas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async index({ request, response, view }) {
  }



  /**
   * Render a form to be used for creating a new pessoa.
   * GET pessoas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new pessoa.
   * POST pessoas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const {
        username,
        Nome,
        Sobrenome,
        CPF,
        Telefone,
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
        Nome,
        Sobrenome,
        CPF,
        Telefone,
        id_user: user.id,
        id_endereco: endereco.id
      }, trx)
      await trx.commit()

      return response.status(201).send({ message: 'Pessoa criada com sucesso' });
    } catch (err) {
      await trx.rollback()

      return response.status(400).send({
        error: `Erro: ${err.message}`
      })

    }
  }

  /**
   * Display a single pessoa.
   * GET pessoas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async chow({ params, request, response, view, auth }) {
    try {
      const pessoa = await Pessoa.findBy('id_user', request.params.id_user)
      const fullPessoa = {
        pessoa,
        endereco: await Endereco.findBy('id', pessoa.id_endereco),
        user: await User.findBy('id', pessoa.id_user)
      }
      return response.status(200).json(fullPessoa)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }
  async show({ params, request, response, view }) {
    try {
      const pessoa = await Pessoa.findBy('id_user', request.params.id_user)
      console.log(request.params.id_user)
      console.log(pessoa)
      response.send(pessoa)
      // await pessoa.loadMany(['pessoa.endereco', 'usuario.permissao'])

      // return response.status(200).json(pessoa)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to update an existing pessoa.
   * GET pessoas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update pessoa details.
   * PUT or PATCH pessoas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    const trx = await Database.beginTransaction()
    try {
      const pessoa = await Pessoa.findBy('id_user', request.params.id_user)
      const endereco = await Endereco.findBy('id', pessoa.id_endereco)
      const usuario = await User.find(request.params.id_user)

      const pessoaReq = request.only(['Nome', 'SobreNome', 'Telefone'])
      const enderecoReq = request.only(['Estado', 'Cidade', 'Bairro', 'Rua', 'Numero', 'Complemento'])
      const usuarioReq = request.only(['email', 'password'])

      pessoa.merge({ ...pessoaReq })
      endereco.merge({ ...enderecoReq })
      usuario.merge({ ...usuarioReq })

      await pessoa.save(trx)
      await endereco.save(trx)
      await usuario.save(trx)

      await trx.commit()

      return response.status(201).send({ message: 'Pessoa alterada com sucesso' });
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Delete a pessoa with id.
   * DELETE pessoas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, auth }) {
    const trx = await Database.beginTransaction()
    try {
      const pessoa = await Pessoa.findBy("id_user", request.params.id_user)
      const endereco = await Endereco.findBy("id", pessoa.id_endereco)
      const user = await User.find(request.params.id_user)
      await user.delete(trx)
      await endereco.delete(trx)
      await pessoa.delete(trx)
      await trx.commit()
      return response.status(201).send({ message: 'Pessoa excluída com sucesso' });
    } catch (err) {
      await trx.rollback()
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }
  async TestaCPF(strCPF) {
    console.log(strCPF)
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (var i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;
 
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
  }
}
module.exports = PessoaController
