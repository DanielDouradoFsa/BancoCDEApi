'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioSchema extends Schema {
  up() {
    this.create('usuarios', (table) => {
      table.increments('id');
      table.integer('id_Pessoa').unsigned()
        .references('id')
        .inTable('pessoas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.integer('id_Instituicao').unsigned()
        .references('id')
        .inTable('instituicoes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.boolean('Cadastrado').defaultTo(false);
      table.boolean('Liberado').defaultTo(false);
      table.boolean('Cancelado').defaultTo(false);
      
      table.timestamps()
    })
  }

  down() {
    this.drop('usuarios')
  }
}

module.exports = UsuarioSchema
