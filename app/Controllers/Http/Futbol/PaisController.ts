// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { rules, schema } from "@ioc:Adonis/Core/Validator";
import Database from "@ioc:Adonis/Lucid/Database";
import Pais from "App/Models/FutBol/Pais";
import Event from "@ioc:Adonis/Core/Event";

export default class PaisController {
    public async insertarPais({request,response}){
        try{
            await request.validate({
                schema: schema.create({
                    nombre: schema.string([rules.required(),
                        rules.unique({ table: 'pais', column: 'nombre'})])
                })});
        }catch(error){
            return response.status(400).send({error:error.messages.errors})
        }
        const pais = request.body()
        Event.emit('pais',"Pais")
        return Pais.create(pais);
    }
    public async actualizarPais({params,request}){
        const pais = await Pais.find(params.id)
        if(!pais){
            return {error: "Pais no encontrado"}
        }
        await request.validate({
            schema: schema.create({
                nombre: schema.string([rules.required()])
            })});
            
        Event.emit('pais',"Pais")
        return Pais.query().where('id',params.id).update(request.body());
    }
    public async eliminarPais({params}){
        const pais = await Pais.find(params.id)
        if(!pais){
            return {error: "Pais no encontrado"}
        }
        pais.delete()
        Event.emit('pais',"Pais")
        return {msg: "Pais Eliminado"}
    }
    public async getPaises({response,params}){
        if(params.id){
            const pais = Database.from(Pais.table).where('pais.id','=',params.id).first();
            return pais;
        }
        const pais = Database.from(Pais.table);
        return pais
    }
}
