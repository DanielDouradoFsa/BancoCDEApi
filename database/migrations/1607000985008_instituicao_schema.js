'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class instituicoeschema extends Schema {
  up () {
    this.create('instituicaos', (table) => {
      table.increments('id');
      table.integer('id_Entidade').unsigned()
        .references('id')
        .inTable('entidades')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.string('categoria', 20).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('instituicoes')
  }
}

module.exports = instituicoeschema
