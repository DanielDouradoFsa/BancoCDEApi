'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with Associados
 */
const Database = use('Database')
const Pessoa = use('App/Models/Pessoa')
const Endereco = use('App/Models/Endereco')
const User = use('App/Models/User')
const Associado = use('App/Models/Associado')
import TestaCPF from('../../../Validators/ValidaCPF.js')
const PessoaController = use('./PessoaController')
class AssociadoController {
  
  /**
   * Show a list of all Associados.
   * GET Associados
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
        .table('pessoas')
        .innerJoin('associados', 'pessoas.id', 'associados.id_Pessoa')
      response.send(associados)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to be used for creating a new Associado.
   * GET Associados/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new Associado.
   * POST Associados
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    function TestaCPF(strCPF) {
      var Soma;
      var Resto;
      Soma = 0;
    if (strCPF == "00000000000") return false;
  
    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
  
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
  
    Soma = 0;
      for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;
  
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
      return true;
  }
    const trx = await Database.beginTransaction()
    try {
      const {
        id_instituicao,
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
      const pess = new PessoaController()
      if(TestaCPF(CPF))
        return response.send({message: 'CPF válido'})
      else if(!TestaCPF(CPF))
      return response.send({message: 'CPF inválido'})
      
      
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
      const associado = await Associado.create({
        id_Pessoa: pessoa.id,
        id_Instituicao: id_instituicao,
        cadastrado: true
      }, trx)
      await trx.commit()

      return response.status(201).send({ message: 'Associado criada com sucesso' });
    } catch (err) {
      await trx.rollback()

      return response.status(400).send({
        error: `Erro: ${err.message}`
      })

    }
  }

  /**
   * Display a single Associado.
   * GET Associados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const pessoa = await Pessoa.findBy('id_user', request.params.id_user)
      const associado = await Associado.findBy('id_Pessoa', pessoa.id)
      const associadoCompleto = {
        associado: associado,
        pessoa: pessoa,
        endereco: await Endereco.findBy('id', pessoa.id_endereco),
        user: await User.findBy('id', pessoa.id_user)
      }
      return response.status(200).json(associadoCompleto)
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Render a form to update an existing Associado.
   * GET Associados/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update Associado details.
   * PUT or PATCH Associados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const pessoa = await Pessoa.findBy('id_user', request.params.id_user)
      const associado = await Associado.findBy('id_Pessoa', pessoa.id)
      const endereco = await Endereco.findBy('id', pessoa.id_endereco)
      const Associado = await User.find(request.params.id_user)

      const associadoReq = request.only(['cadastrado', 'liberado', 'cancelado'])
      const pessoaReq = request.only(['Nome', 'SobreNome', 'Telefone'])
      const enderecoReq = request.only(['Estado', 'Cidade', 'Bairro', 'Rua', 'Numero', 'Complemento'])
      const AssociadoReq = request.only(['email', 'password'])

      associado.merge({ ...associadoReq })
      pessoa.merge({ ...pessoaReq })
      endereco.merge({ ...enderecoReq })
      Associado.merge({ ...AssociadoReq })

      await associado.save(trx)
      await pessoa.save(trx)
      await endereco.save(trx)
      await Associado.save(trx)

      await trx.commit()

      return response.status(201).send({ message: 'Pessoa alterada com sucesso' });
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }

  /**
   * Delete a Associado with id.
   * DELETE Associados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const user = await User.find(request.params.id_user)
      if (user == null)
        return response.status(404).send({ message: 'Usuário não localizado' })
      user.ativo = false
      await user.save()

      return response.status(204).send({ message: 'Usuário foi desativado' })
    } catch (err) {
      return response.status(400).send({
        error: `Erro: ${err.message}`
      })
    }
  }
}


module.exports = AssociadoController
