'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Parceiro extends Model {
    entidade(){
        return this.belongsTo('App/Models/Entidade')
    }
}

module.exports = Parceiro
