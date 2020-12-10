'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PessoaSchema extends Schema {
  up() {
    this.create('pessoas', (table) => {
      table.increments('id');
      table.integer('id_endereco').unsigned()
        .references('id')
        .inTable('enderecos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('id_user').unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('nome', 10).notNullable()
      table.string('sobreNome', 30).notNullable()
      table.bigInteger('CPF').notNullable().unique()
      table.bigInteger('telefone').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('pessoas')
  }
}

module.exports = PessoaSchema
