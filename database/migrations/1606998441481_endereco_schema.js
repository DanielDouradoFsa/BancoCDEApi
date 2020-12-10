'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoSchema extends Schema {
  up () {
    this.create('enderecos', (table) => {
      table.increments('id');
      table.string('estado', 20).notNullable()
      table.string('cidade', 30).notNullable()
      table.string('rua', 30).notNullable()
      table.integer('numero').notNullable()
      table.string('bairro', 80).notNullable()
      table.string('complemento', 40).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('enderecos')
  }
}

module.exports = EnderecoSchema
