// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Alumno from "App/Models/Alumno";
import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class AlumnosController {
    public async index({response,params}){
        if(params.id){
            const alumno=await Alumno.query().where('status',true).where('id',params.id).first()
            return response.status(200).json(alumno)
        }
        const alumno=await Alumno.query().where('status',true)
        return response.status(200).json(alumno)
    }
    public async create({response,request}){
        const newAlumnoSchema=schema.create({
            nombre: schema.string(),
            ap_paterno: schema.string(),
            ap_materno: schema.string(),
            correo: schema.string([
                rules.email()
            ]),
            cuatri_id: schema.number(),
        })
        try {
            const validator=await request.validate({
                schema:newAlumnoSchema
            })
            const alumno=new Alumno()
            alumno.nombre=validator.nombre
            alumno.ap_paterno=validator.ap_paterno
            alumno.ap_materno=validator.ap_materno
            alumno.correo=validator.correo
            alumno.cuatri_id=validator.cuatri_id
            await alumno.save()
            return response.status(201).json({
                status: 201,
                msg: 'los datos fueron correctamente insertados',
                error: {},
                data: [alumno]
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
        const newAlumnoSchema=schema.create({
            nombre: schema.string(),
            ap_paterno: schema.string(),
            ap_materno: schema.string(),
            correo: schema.string([
                rules.email()
            ]),
            cuatri_id: schema.number(),
        })
        try {
            const validator=await request.validate({
                schema:newAlumnoSchema
            })
            const alumno=await Alumno.findOrFail(params.id)
            alumno.nombre=validator.nombre ?? alumno.nombre
            alumno.ap_paterno=validator.ap_paterno ??  alumno.ap_paterno
            alumno.ap_materno=validator.ap_materno ?? alumno.ap_materno
            alumno.correo=validator.correo ?? alumno.correo
            alumno.cuatri_id=validator.cuatri_id ?? alumno.cuatri_id
            await alumno.save()
            return response.status(200).json({
                status: 200,
                msg: 'los datos fueron actualizado correctamente',
                error: {},
                data: [Alumno]
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
        const alumno=await Alumno.findOrFail(params.id)
        alumno.status=false
        alumno.save()
        return response.json({
            status:200,
            msg: "el Alumno a sido eliminada",
            error: {},
            data: [alumno]
        })
    }
}
