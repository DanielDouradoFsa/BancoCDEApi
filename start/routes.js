'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

/**ROTAS LOGIN */
Route.post('/login', 'UserController.login').middleware('guest')
Route.get('/dataLogin', 'UserController.dataLogin').middleware('auth')

/**ROTAS ENDERECOS */
Route.resource('/enderecos', 'EnderecoController').middleware('guest')

/**ROTAS PESSOAS */
Route.post('/pessoas', 'PessoaController.store')
Route.get('/pessoas/:id_user','PessoaController.chow').middleware("auth")
Route.patch('/pessoas/:id_user','PessoaController.update').middleware("auth")

/**ROTAS PARCEIROS */
Route.get('/parceiros/','ParceiroController.index').middleware("auth")
Route.post('/parceiros', 'ParceiroController.store')
Route.get('/parceiros/:id_user','ParceiroController.show').middleware("auth")
Route.patch('/parceiros/:id_user','ParceiroController.update').middleware("auth")

/**ROTAS INSTITUICOES */
Route.post('/instituicao', 'InstituicaoController.store')
Route.get('/instituicao/:id_user', 'InstituicaoController.show').middleware("auth")
Route.patch('/instituicao/:id_user', 'InstituicaoController.update').middleware("auth")
Route.get('/instituicao', 'InstituicaoController.index').middleware("auth")

/**ROTAS ASSOCIADOS */
Route.post('/associado', 'AssociadoController.store')
Route.get('/associado/:id_user','AssociadoController.show').middleware("auth")
Route.patch('/associado/:id_user','AssociadoController.update').middleware("auth")
Route.get('/associado','AssociadoController.index').middleware("auth")

/**ROTAS DE USER (MUDAR EMAIL SENHA E INATIVAR) */
Route.delete('/user/ativo/:id_user','UserController.destroy').middleware("auth")

/**ROTAS DE COLABORADORES */
Route.get('/colaboradores/','ColaboradoreController.index').middleware("auth")
Route.post('/colaboradores/', 'ColaboradoreController.store')