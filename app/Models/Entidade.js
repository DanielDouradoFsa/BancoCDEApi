'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class Entidade extends Model {
    endereco(){
        return this.belongsTo('App/Models/Endereco')
    }
    user(){
        return this.belongsTo('App/Models/User')
    }
    instituicao(){
        return this.hasOne('App/Models/Instituicao')
    }
    parceiro(){
        return this.hasOne('App/Models/Parceiro')
    }

}

module.exports = Entidade
