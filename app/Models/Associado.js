'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Associado extends Model {
    entidade (){
        return this.belongsTo('./Entidade')
    }
}

module.exports = Associado
