'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntidadeSchema extends Schema {
  up () {
    this.create('entidades', (table) => {
      table.increments('id');
      table.integer('id_Endereco').unsigned()
        .references('id')
        .inTable('enderecos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('id_user').unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('razaoSocial', 20).notNullable()
      table.bigInteger('CNPJ').notNullable().unique()
      table.string('nomeFantasia',20).notNullable()
      table.string('nomeResponsavel',15).notNullable()
      table.string('sobreNomeResp', 30).notNullable()
      table.bigInteger('telefone').notNullable()
      table.bigInteger('telefoneFixo').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('entidades')
  }
}

module.exports = EntidadeSchema
