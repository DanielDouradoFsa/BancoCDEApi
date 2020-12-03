'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParceirosSchema extends Schema {
  up () {
    this.create('parceiros', (table) => {
      table.increments('id');
      table.integer('id_Entidade').unsigned()
        .references('id')
        .inTable('entidades')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.string('Categoria', 20).notNullable()
      table.string('Segmento',20).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('parceiros')
  }
}

module.exports = ParceirosSchema
