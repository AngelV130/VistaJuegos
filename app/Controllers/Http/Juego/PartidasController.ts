// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Partida from "App/Models/Juego/Partida";
import Ws from "App/Services/Ws";
import TriunfoDerota from "App/Models/Juego/TriunfoDerota";
import Event from "@ioc:Adonis/Core/Event";
import Ataque from "App/Models/Juego/Ataque";
export default class PartidasController {
    public async iniciarPartida({auth}){
        const partida =  Partida.create({status:true,user_uno:auth.user.id})
        Event.emit('partida',"partida");
        return partida
    }
    public async buscarPartida({params,auth}){
        const partida = await Partida.findOrFail(params.id)
        partida.user_dos = auth.user.id
        partida.save()
        Event.emit('turno',{turno:"turno1",ataque:null})
        Event.emit('partida',"partida");
        return partida
    }
    public async ataque({request,auth}){
        
        const ataque =  Ataque.create({user_id:auth.user.id,partida_id:request.body().id,ataque:request.body().ataque})
        const partida = await Partida.findOrFail(request.body().id)
        if(auth.user.id == partida.user_uno){
            Event.emit('turno',{turno:"turno2",ataque:request.body().ataque})
        }if(auth.user.id == partida.user_dos){
            Event.emit('turno',{turno:"turno1",ataque:request.body().ataque})
        }
        return ataque
    }
    public async buscarPartidas(){
        const partida = Partida.query().where('status','=',true)
        const part = partida.whereNull('user_uno').orWhereNull('user_dos')
        return part
    }
    public async resultado({auth,params}){
        const partida = await Partida.findByOrFail('id',params.id)
        partida.status = false
        partida.save()
        const derrota = TriunfoDerota.create({user_id:auth.user.id,partida_id:params.id,estado:'perdido'})
        if(auth.user.id == partida.user_uno){
            TriunfoDerota.create({user_id:partida.user_dos,partida_id:params.id,estado:'ganado'})
            Event.emit('final',{id:params.id,user:partida.user_dos,turno:'turno2'})
        }if(auth.user.id == partida.user_dos){
            TriunfoDerota.create({user_id:partida.user_uno,partida_id:params.id,estado:'ganado'})
            Event.emit('final',{id:params.id,user:partida.user_uno,turno:'turno1'})
        }
        return derrota
    }
}
