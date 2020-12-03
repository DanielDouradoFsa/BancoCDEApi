'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoSchema extends Schema {
  up () {
    this.create('enderecos', (table) => {
      table.increments('id');
      table.string('Estado', 20).notNullable()
      table.string('Cidade', 30).notNullable()
      table.string('Rua', 30).notNullable()
      table.integer('Numero').notNullable()
      table.string('Bairro', 80).notNullable()
      table.bigInteger('Complemento', 40).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('enderecos')
  }
}

module.exports = EnderecoSchema
