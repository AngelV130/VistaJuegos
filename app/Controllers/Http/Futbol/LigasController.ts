// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { rules, schema } from "@ioc:Adonis/Core/Validator";
import Database from "@ioc:Adonis/Lucid/Database";
import Liga from "App/Models/FutBol/Liga";
export default class LigasController {
    public async insertarLiga({request}){
        await request.validate({
            schema: schema.create({
                nombre: schema.string([rules.required()]),
                pais: schema.number([rules.required()])
            })});
            const liga = request.body()
            return Liga.create(liga);
    }

    
    public async actualizarLiga({params,request}){
        const liga = await Liga.find(params.id)
        if(!liga){
            return {error: "Liga no encontrado"}
        }
        await request.validate({
            schema: schema.create({
                nombre: schema.string([rules.required()]),
                pais: schema.number([rules.required()])
            })});
        return Liga.query().where('id',params.id).update(request.body());
    }
    public async eliminarLiga({params}){
        const liga = await Liga.find(params.id)
        if(!liga){
            return {error: "Liga no encontrado"}
        }
        liga.delete()
        return {msg: "Liga Eliminado"}
    }
    public async getLigas({params}){
        if(params.id){
            const liga = Database.from(Liga.table).where('ligas.id','=',params.id).first();
            return liga;
        }
        const liga = Database.from(Liga.table).select('ligas.id','ligas.nombre','pais.nombre as pais').join('pais','ligas.pais','=','pais.id');
        return liga;
    }
}
