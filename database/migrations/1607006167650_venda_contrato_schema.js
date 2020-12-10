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
      table.date('contratoInicio').notNullable();
      table.date('contratoFim').notNullable();
      table.date('contratoData').notNullable();
      table.string('complemento',30).notNullable()
      table.integer('multa').unsigned()
      table.integer('juros').unsigned()
      table.date('pgtoVencimento').notNullable();
      table.date('pgtoQuitacao ').notNullable();
      table.integer('pgtoDiasTolerancia').notNullable();
      table.timestamps()
    })
  }

  down() {
    this.drop('venda_contratoes')
  }
}

module.exports = VendaContratoSchema
