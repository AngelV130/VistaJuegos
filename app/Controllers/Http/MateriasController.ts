//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Materia from "App/Models/Materia";

export default class MateriasController {
    public async index({ response,params }) {
        if(params.id){
            const materia=await Materia.query().where('status',true).where('id',params.id).first()
            return response.status(200).json(materia)
        }
        const materias = await Materia.query().where('status', true)
        return response.status(200).json(materias)
    }
    public async create({ request, response }) {
        const newMateriaSchema = schema.create({
            nombre: schema.string(),
            unidades: schema.number()
        })
        try {
            const validator = await request.validate({
                schema: newMateriaSchema
            })
            const materia = new Materia()
            materia.nombre = validator.nombre
            materia.unidades = validator.unidades
            await materia.save()
            return response.status(201).json({
                status: 201,
                msg: 'los datos fueron correctamente insertados',
                error: {},
                data: [materia]
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
    public async update({ request, response, params }) {
        const newMateriaSchema = schema.create({
            nombre: schema.string(),
            unidades: schema.number()
        })
        try {
            const validator = await request.validate({
                schema: newMateriaSchema
            })
            const materia = await Materia.findOrFail(params.id)
            materia.nombre = validator.nombre ?? materia.nombre
            materia.unidades = validator.unidades ?? materia.unidades
            await materia.save()

            return response.status(200).json({
                status: 200,
                msg: 'los datos fueron actualizado correctamente',
                error: {},
                data: [materia]
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
    public async delete({ response, params }) {
        const materia = await Materia.findOrFail(params.id)
        materia.status = false
        materia.save()
        return response.json({
            status:200,
            msg: "la materia a sido eliminada",
            error: {},
            data: [materia]
        })
    }
}