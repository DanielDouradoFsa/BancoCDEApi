'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VendaCartaoSchema extends Schema {
  up () {
    this.create('venda_cartaos', (table) => {
      table.increments('id');
      table.integer('id_Colaborador').unsigned()
        .references('id')
        .inTable('colaboradores')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.bigInteger('CRM').unsigned()
      table.integer('contratoValor').unsigned()
      table.date('contratoInicio').notNullable();
      table.date('contratoFim').notNullable();
      table.date('cataContrato').notNullable();
      table.integer('pgtoDiasTolerancia').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('venda_cartaos')
  }
}

module.exports = VendaCartaoSchema
