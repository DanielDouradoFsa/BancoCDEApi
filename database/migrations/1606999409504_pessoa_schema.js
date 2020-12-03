'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PessoaSchema extends Schema {
  up () {
    this.create('pessoas', (table) => {
      table.increments('id');
      table.integer('id_endereco').unsigned()
        .references('id')
        .inTable('enderecos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.string('Nome', 10).notNullable()
      table.string('SobreNome', 30).notNullable()
      table.bigInteger('CPF').notNullable().unique()
      table.bigInteger('Telefone').notNullable()
      table.string('Senha', 20).notNullable()
      table.bigInteger('Email', 30).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('pessoas')
  }
}

module.exports = PessoaSchema
