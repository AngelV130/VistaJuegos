// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema,rules } from "@ioc:Adonis/Core/Validator"
import Database from "@ioc:Adonis/Lucid/Database";
import Jugador from "App/Models/FutBol/Jugador";

export default class JugadorsController {
    public async insertarJugador({request}){
        await request.validate({
            schema: schema.create({
                nombre: schema.string([rules.required()]),
                equipo: schema.number([rules.required()]),
                pais: schema.number([rules.required()]),
                edad: schema.number([rules.required()]),
                ap_paterno: schema.string([rules.required()]),
                ap_materno: schema.string([rules.required()])
            })});
            const jugador = request.body()
            return Jugador.create(jugador);
    }

    public async actualizarJugador({params,request}){
        const jugador = await Jugador.find(params.id)
        if(!jugador){
            return {error: "Jugador no encontrado"}
        }
        await request.validate({
            schema: schema.create({
                nombre: schema.string([rules.required()]),
                equipo: schema.number([rules.required()]),
                pais: schema.number([rules.required()]),
                edad: schema.number([rules.required()]),
                ap_paterno: schema.string([rules.required()]),
                ap_materno: schema.string([rules.required()])
            })});
        return Jugador.query().where('id',params.id).update(request.body());
    }
    public async eliminarJugador({params}){
        const jugador = await Jugador.find(params.id)
        if(!jugador){
            return {error: "Jugador no encontrado"}
        }
        jugador.delete()
        return {msg: "Jugador Eliminado"}
    }
    public async getJugadores({params}){
        if(params.id){
            const jugador = Database.from(Jugador.table).where('jugadores.id','=',params.id).first();
            return jugador;
        }
        const jugador = Database.from(Jugador.table).select('jugadores.id','jugadores.nombre','pais.nombre as pais','equipos.nombre as equipo',
        'jugadores.edad','jugadores.ap_paterno','jugadores.ap_materno').join('pais','jugadores.pais','=','pais.id').join(
            'equipos','jugadores.equipo','=','equipos.id'
        );
        return jugador;
    }
}
