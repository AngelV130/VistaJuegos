import Ws from 'App/Services/Ws'
import Partida from 'App/Models/Juego/Partida'
import Database from '@ioc:Adonis/Lucid/Database'

Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', async (socket) => {
  Ws.io.emit('partidas',await Partida.query().where('status','=',true))
  
  socket.on('turno',async (data)=>{
    console.log('llego',data)
    const partida = await Database.from(Partida.table).where('id',data.id).first()
    if(partida.ventan1 == data.socket){
      console.log(partida.ventan2,'hola',partida)
      Ws.io.emit(partida.ventan2,partida.ventan2)
    }
    if(partida.ventan2 == data.socket){
      Ws.io.emit(partida.ventan3,partida.ventan3)
    }
    if(partida.ventan3 == data.socket){
      Ws.io.emit(partida.ventan1,partida.ventan1)
    }
  })
  socket.on('desconexion', async (data) => {
      console.log(data)
      const partida = (await Partida.findByOrFail('id',data))
      partida.status = false
      partida.save()
      socket.disconnect()
      Ws.io.emit('desconexion',"desc serv")
  })
  socket.on('conectar', async (data)=>{
    console.log(data.id,socket.id)
    if(data.ventana == 'ventana1'){
      const partida = (await Partida.findByOrFail('id',data.id))
      partida.ventan1 = socket.id
      partida.save()
    }if(data.ventana == 'ventana2'){
      const partida = (await Partida.findByOrFail('id',data.id))
      partida.ventan2 = socket.id
      partida.save()
    }if(data.ventana == 'ventana3'){
      const partida = (await Partida.findByOrFail('id',data.id))
      partida.ventan3 = socket.id
      partida.save()
    }
    socket.emit('conectar',socket.id)
    setTimeout(async ()=>{
      const partida = await Database.from(Partida.table).where('id',data.id).first()
      if(partida.ventan1 != '' && partida.ventan2 != '' && partida.ventan3 != ''){
        console.log(partida," ",partida.ventan1)
        Ws.io.emit(partida.ventan1,partida.ventan1)
      }
    },1000)
  })
})
/*
  socket.on('juego', async (data) => {
    console.log(data)
    const partida = await Database.from(Partida.table).where('status','=',true)
    if(partida.length < 1){
      console.log("esta vacio")
      const partida = new Partida();
      partida.status = true
      partida.ventan1 = socket.id;
      await partida.save();
      socket.emit('juego',socket.id)
      socket.on(partida.ventan1,async (data)=>{
        const part = await Database.from(Partida.table).where('id','=',partida.id).first()
        Ws.io.emit(data,part.ventan2)
      })
    }else{
      const partida = await Database.from(Partida.table).where('ventan1','=','').first()
      if(partida == null){
        const partida = await Database.from(Partida.table).where('ventan2','=','').first()
        if(partida == null){
          console.log("no hay partidas")          
          const partida = new Partida();
          partida.status = true
          partida.ventan1 = socket.id;
          await partida.save();
          socket.emit('juego',socket.id)
          socket.on(partida.ventan1,async (data)=>{
            const part = await Database.from(Partida.table).where('id','=',partida.id).first()
            Ws.io.emit(data,part.ventan2)
          })
        }else{
          console.log(partida)
          console.log(2)
          await Partida.query().where('id',partida.id).update({ventan2:socket.id})
          console.log(partida)
          const part = await Database.from(Partida.table).where('id','=',partida.id).first()
          console.log(part)
          socket.emit('juego',socket.id)
          Ws.io.emit(part.ventan1,part.ventan2)
          socket.on(part.ventan2,(data)=>{
            Ws.io.emit(data,part.ventan1 )
            console.log('hola')
          })
        }
      }else{
        console.log(partida)
        console.log(1)
        await Partida.query().where('id',partida.id).update({ventan1:socket.id})
        console.log(partida)
        const part = await Database.from(Partida.table).where('id','=',partida.id).first()
        socket.emit('juego',socket.id)
        Ws.io.emit(part.ventan1,part.ventan2)
        socket.on(part.ventan1,(data)=>{
          Ws.io.emit(data,part.ventan2)
        })
        
      }
    }
  })
*/