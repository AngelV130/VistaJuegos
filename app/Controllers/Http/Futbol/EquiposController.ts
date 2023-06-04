// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema,rules } from "@ioc:Adonis/Core/Validator"
import Database from "@ioc:Adonis/Lucid/Database";
import Equipo from "App/Models/FutBol/Equipo";

export default class EquiposController {
    public async insertarEquipo({request}){
        await request.validate({
            schema: schema.create({
                nombre: schema.string([rules.required()]),
                liga: schema.number([rules.required()])
            })});
            const equipo = request.body()
            return Equipo.create(equipo);
    }

    public async actualizarEquipo({params,request}){
        const equipo = await Equipo.find(params.id)
        if(!equipo){
            return {error: "Equipo no encontrado"}
        }
        await request.validate({
            schema: schema.create({
                nombre: schema.string([rules.required()]),
                liga: schema.number([rules.required()])
            })});
        return Equipo.query().where('id',params.id).update(request.body());
    }
    public async eliminarEquipo({params}){
        const equipo = await Equipo.find(params.id)
        if(!equipo){
            return {error: "Equipo no encontrado"}
        }
        equipo.delete()
        return {msg: "Equipo Eliminado"}
    }
    public async getEquipos({params}){
        if(params.id){
            const equipo = Database.from(Equipo.table).where('equipos.id','=',params.id).first();
            return equipo;
        }
        const equipo = Database.from(Equipo.table).select('equipos.id','equipos.nombre','ligas.nombre as liga').join(
            'ligas','equipos.liga','=','ligas.id');
        return equipo;
    }
}
