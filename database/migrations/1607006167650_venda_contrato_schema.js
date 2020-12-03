'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VendaContratoSchema extends Schema {
  up() {
    this.create('venda_contratoes', (table) => {
      table.increments('id');
      table.integer('id_Colaborador').unsigned()
        .references('id')
        .inTable('colaboradores')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('id_Entidade').unsigned()
        .references('id')
        .inTable('entidades')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.bigInteger('CRM').unsigned()
      table.integer('contratoValor').unsigned()
      table.date('ContratoInicio').notNullable();
      table.date('ContratoFim').notNullable();
      table.date('ContratoData').notNullable();
      table.string('Complemento',30).notNullable()
      table.integer('Multa').unsigned()
      table.integer('Juros').unsigned()
      table.date('PgtoVencimento').notNullable();
      table.date('PgtoQuitacao ').notNullable();
      table.integer('PgtoDiasTolerancia').notNullable();
      table.timestamps()
    })
  }

  down() {
    this.drop('venda_contratoes')
  }
}

module.exports = VendaContratoSchema
