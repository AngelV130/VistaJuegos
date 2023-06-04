// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Profesor from "App/Models/Profesor";
import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class ProfesoresController {
    public async index({response,params}){
        if(params.id){
            const profesor=await Profesor.query().where('status',true).where('id',params.id).first()
            return response.status(200).json(profesor)
        }
        const profesores=await Profesor.query().where('status', true)
        return response.json(profesores)
    }
    public async create({response,request}){
        const newProfesorSchema=schema.create({
            nombre: schema.string(),
            ap_paterno: schema.string(),
            ap_materno: schema.string(),
            correo: schema.string([
                rules.email()
            ]),
            materia_id: schema.number(),
        })
        try {
            const validator=await request.validate({
                schema:newProfesorSchema
            })
            const profesor=new Profesor()
            profesor.nombre=validator.nombre
            profesor.ap_paterno=validator.ap_paterno
            profesor.ap_materno=validator.ap_materno
            profesor.correo=validator.correo
            profesor.materia_id=validator.materia_id
            await profesor.save()
            return response.status(201).json({
                status: 201,
                msg: 'los datos fueron correctamente insertados',
                error: {},
                data: [profesor]
            })
        } catch (error) {
            return response.status(400).json({
                status: 400,
                msg: 'falta de datos',
                error: error.messages,
                data: []
            })
        }
    }
    public async update({request,response,params}){
        const newProfesorSchema=schema.create({
            nombre: schema.string(),
            ap_paterno: schema.string(),
            ap_materno: schema.string(),
            correo: schema.string([
                rules.email()
            ]),
            materia_id: schema.number(),
        })
        try {
            const validator=await request.validate({
                schema:newProfesorSchema
            })
            const profesor=await Profesor.findOrFail(params.id)
            profesor.nombre=validator.nombre ?? profesor.nombre
            profesor.ap_paterno=validator.ap_paterno ??  profesor.ap_paterno
            profesor.ap_materno=validator.ap_materno ?? profesor.ap_materno
            profesor.correo=validator.correo ?? profesor.correo
            profesor.materia_id=validator.materia_id ?? profesor.materia_id
            await profesor.save()
            return response.status(200).json({
                status: 200,
                msg: 'los datos fueron actualizado correctamente',
                error: {},
                data: [profesor]
            })
        } catch (error) {
            return response.status(400).json({
                status: 400,
                msg: 'falta de datos',
                error: error.messages,
                data: []
            })
        }
    }
    public async delete({response,params}){
        const profesor=await Profesor.findOrFail(params.id)
        profesor.status=false
        profesor.save()
        return response.json({
            status:200,
            msg: "el profesor a sido eliminada",
            error: {},
            data: [profesor]
        })
    }
}
