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

      table.string('RazaoSocial', 20).notNullable()
      table.bigInteger('CNPJ').notNullable().unique()
      table.string('NomeFantansia',20).notNullable()
      table.string('NomeResponsavel',15).notNullable()
      table.string('SobreNomeResp', 30).notNullable()
      table.bigInteger('Telefone').notNullable()
      table.bigInteger('TelefoneFixo').notNullable()
      table.string('Email', 20).notNullable().unique()
      table.string('senha',20).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('entidades')
  }
}

module.exports = EntidadeSchema
