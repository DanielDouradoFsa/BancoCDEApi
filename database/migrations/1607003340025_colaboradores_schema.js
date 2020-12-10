'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ColaboradoresSchema extends Schema {
  up () {
    this.create('colaboradores', (table) => {
      table.increments('id');
      table.integer('id_Pessoa').unsigned()
        .references('id')
        .inTable('pessoas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.string('profissao',20)
      table.boolean('expVendas').defaultTo(false);
      table.boolean('yransporteProprio').defaultTo(false);
      table.bigInteger('MEI').unsigned()
      table.bigInteger('CNH').unsigned()
      table.string('CNHClasse',2)
      table.date('CNHVencimento')
      table.timestamps()
    })
  }

  down () {
    this.drop('colaboradores')
  }
}

module.exports = ColaboradoresSchema
