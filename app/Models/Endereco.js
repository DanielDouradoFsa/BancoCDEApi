'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/**user->profile(id_user)
 * endereco->pessoa(id_endereco)
 * 
*/

class Endereco extends Model {
    pessoa () {
        return this.hasOne('./Pessoa')
      }

    entidade () {
        return this.hasOne('./Entidade')
      }  
}

module.exports = Endereco
