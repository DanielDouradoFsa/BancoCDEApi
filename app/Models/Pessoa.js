'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pessoa extends Model {
    endereco () {
        return this.belongsTo('./Endereco')
      }
}

module.exports = Pessoa
