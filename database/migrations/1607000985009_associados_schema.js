'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioSchema extends Schema {
  up() {
    this.create('associados', (table) => {
      table.increments('id');
      table.integer('id_Pessoa').unsigned()
        .references('id')
        .inTable('pessoas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.integer('id_Instituicao').unsigned()
        .references('id')
        .inTable('instituicaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.boolean('cadastrado').defaultTo(false);
      table.boolean('liberado').defaultTo(false);
      table.boolean('cancelado').defaultTo(false);
      
      table.timestamps()
    })
  }

  down() {
    this.drop('usuarios')
  }
}

module.exports = UsuarioSchema
