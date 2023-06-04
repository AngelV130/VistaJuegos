/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Event from '@ioc:Adonis/Core/Event'
import Route from '@ioc:Adonis/Core/Route'
import UsersController from 'App/Controllers/Http/loging/UsersController'
import VerificacionsController from 'App/Controllers/Http/loging/VerificacionsController'
import EquiposController from 'App/Controllers/Http/Futbol/EquiposController'
import LigasController from 'App/Controllers/Http/Futbol/LigasController'
import PaisController from 'App/Controllers/Http/Futbol/PaisController'
import JugadorsController from 'App/Controllers/Http/Futbol/JugadorsController'
import PartidasController from 'App/Controllers/Http/Juego/PartidasController'
import TriunfoDerota from 'App/Models/Juego/TriunfoDerota'

//user
Route.post('users',new UsersController().registrar);
Route.post('users/loging',new UsersController().iniciarSersion);
Route.post('users/logOut',new UsersController().cerrarSesion).middleware('auth');
Route.put('usuario/:id',new UsersController().actualizar).middleware(['auth','rol:1']);
Route.get('get/users/:id?',new UsersController().getUsers).middleware(['auth','rol:1','status']);
Route.get('token',new UsersController().token).middleware(['auth']);
Route.get('roles', new UsersController().roles).middleware(['auth','rol:1','status']);
//verificacion
Route.get("verify/:id",new VerificacionsController().mandarCodigo).as('verificacion');
Route.post("verificacion/:id",new VerificacionsController().validarodigo);

//Futbol
Route.post('equipo',new EquiposController().insertarEquipo).middleware(['auth','rol:1,2','status']);
Route.put('equipo/:id',new EquiposController().actualizarEquipo).middleware(['auth','rol:1','status']);
Route.get('tabla/equipo/:id?',new EquiposController().getEquipos).middleware(['auth','rol:1,2,3','status']);
Route.delete('equipo/:id',new EquiposController().eliminarEquipo).middleware(['auth','rol:1','status']);

Route.post('liga',new LigasController().insertarLiga).middleware(['auth','rol:1,2','status']);
Route.put('liga/:id',new LigasController().actualizarLiga).middleware(['auth','rol:1','status']);
Route.get('tabla/liga/:id?',new LigasController().getLigas).middleware(['auth','rol:1,2,3','status']);
Route.delete('liga/:id',new LigasController().eliminarLiga).middleware(['auth','rol:1','status']);

Route.post('pais',new PaisController().insertarPais).middleware(['auth','rol:1,2','status']);
Route.put('pais/:id',new PaisController().actualizarPais).middleware(['auth','rol:1','status']);
Route.get('tabla/pais/:id?',new PaisController().getPaises);//.middleware(['auth','rol:1,2,3','status']);
Route.delete('pais/:id',new PaisController().eliminarPais).middleware(['auth','rol:1','status']);

Route.post('jugador',new JugadorsController().insertarJugador).middleware(['auth','rol:1,2','status']);
Route.put('jugador/:id',new JugadorsController().actualizarJugador).middleware(['auth','rol:1','status']);
Route.get('tabla/jugador/:id?',new JugadorsController().getJugadores).middleware(['auth','rol:1,2,3','status']);
Route.delete('jugador/:id',new JugadorsController().eliminarJugador).middleware(['auth','rol:1','status']);

//Universidad
Route.get('/tabla/materia', 'MateriasController.index').middleware(['auth','rol:1,2,3','status'])
Route.get('/tabla/materia/:id', 'MateriasController.index').middleware(['auth','rol:1','status'])
Route.post('/materia', 'MateriasController.create').middleware(['auth','rol:1,2','status'])
Route.put('/materia/:id', 'MateriasController.update').middleware(['auth','rol:1','status'])
Route.delete('/materia/:id', 'MateriasController.delete').middleware(['auth','rol:1','status'])

Route.get('/tabla/profesor', 'ProfesoresController.index').middleware(['auth','rol:1,2,3','status'])
Route.get('/tabla/profesor/:id', 'ProfesoresController.index').middleware(['auth','rol:1','status'])
Route.post('/profesor','ProfesoresController.create').middleware(['auth','rol:1,2','status'])
Route.put('/profesor/:id','ProfesoresController.update').middleware(['auth','rol:1','status'])
Route.delete('/profesor/:id','ProfesoresController.delete').middleware(['auth','rol:1','status'])

Route.get('/tabla/cuatri','CuatrimestresController.index').middleware(['auth','rol:1,2,3','status'])
Route.get('/tabla/cuatri/:id','CuatrimestresController.index').middleware(['auth','rol:1','status'])
Route.post('/cuatri','CuatrimestresController.create' ).middleware(['auth','rol:1,2','status'])
Route.put('/cuatri/:id','CuatrimestresController.update').middleware(['auth','rol:1','status'])
Route.delete('/cuatri/:id','CuatrimestresController.delete').middleware(['auth','rol:1','status'])

Route.get('/tabla/alumno', 'AlumnosController.index').middleware(['auth','rol:1,2,3','status'])
Route.get('/tabla/alumno/:id', 'AlumnosController.index').middleware(['auth','rol:1','status'])
Route.post('/alumno','AlumnosController.create').middleware(['auth','rol:1,2','status'])
Route.put('/alumno/:id','AlumnosController.update').middleware(['auth','rol:1','status'])
Route.delete('/alumno/:id','AlumnosController.delete').middleware(['auth','rol:1','status'])

Route.get('/sse/:id',async ({response,request,auth,params})=>{
  response.response.setHeader('content-type','text/event-stream')
  response.response.setHeader('Access-Control-Allow-Origin','*')
  response.response.setHeader("Cache-Control","no-cache")
  response.response.setHeader( "Connection", "keep-alive")
  response.response.write(`event: partida${params.id}\n`);
  response.response.write(`data: hola\n\n`)
  Event.on('partida',(msj)=>{
    response.response.write(`data: ${msj}\n\n`)
  })
  Event.on("turno",(turno)=>{
    console.log(turno)
    response.response.write(`event: partida${params.id}\n`);
    response.response.write(`data: ${JSON.stringify(turno)}\n\n`)
  })
  Event.on("final",(turno)=>{
    response.response.write(`event: final:partida${params.id}\n`);
    response.response.write(`data:  ${JSON.stringify({turno:turno.turno,fin:'fin'})}\n\n`)
  })
})

Route.get('/sse',async ({response})=>{
  response.response.setHeader('content-type','text/event-stream')
  response.response.setHeader('Access-Control-Allow-Origin','*')
  response.response.setHeader("Cache-Control","no-cache")
  response.response.setHeader( "Connection", "keep-alive")
  response.response.write(`data: hola\n\n`)
  Event.on('partida',(msj)=>{
    response.response.write(`data: ${msj}\n\n`)
  })
})


Route.get('/partida/:id', new PartidasController().buscarPartida).middleware(['auth'])
Route.post('/partida',new PartidasController().iniciarPartida).middleware(['auth'])
Route.get('/partida', new PartidasController().buscarPartidas).middleware(['auth'])
Route.post('/ataque',new PartidasController().ataque).middleware(['auth'])
Route.post('/salir/:id',new PartidasController().resultado).middleware(['auth'])