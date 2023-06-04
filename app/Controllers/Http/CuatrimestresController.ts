// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Cuatrimestre from "App/Models/Cuatrimestre"
import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class CuatrimestresController {
    public async index({response,params}){
        if(params.id){
            const cuatri=await Cuatrimestre.query().where('status',true).where('id',params.id).first()
            return response.status(200).json(cuatri)
        }
        const cuatrimestres = await Cuatrimestre.query().where('status', true)
        return response.status(200).json(cuatrimestres)
    }
    public async create({request,response}){
        const newCuatriSchema=schema.create({
            num_cuatri:schema.number(),
            periodo:schema.enum(['en-abr', 'my-agt','sept-dic'])
        })
        try {
            const validator=await request.validate({
                schema:newCuatriSchema
            })
            const cuatri=new Cuatrimestre()
            cuatri.num_cuatri=validator.num_cuatri
            cuatri.periodo=validator.periodo
            await cuatri.save()
            return response.status(201).json({
                status: 201,
                msg: 'los datos fueron correctamente insertados',
                error: {},
                data: [cuatri]
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
        const newCuatriSchema=schema.create({
            num_cuatri:schema.number(),
            periodo:schema.enum(['en-abr', 'my-agt','sept-dic'])
        })
        try {
            const validator=await request.validate({
                schema:newCuatriSchema
            })
            const cuatri=await Cuatrimestre.findOrFail(params.id)
            cuatri.num_cuatri=validator.num_cuatri ?? cuatri.num_cuatri
            cuatri.periodo=validator.periodo ?? cuatri.periodo
            await cuatri.save()
            return response.status(200).json({
                status: 200,
                msg: 'los datos fueron actualizado correctamente',
                error: {},
                data: [cuatri]
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
        const cuatri=await Cuatrimestre.findOrFail(params.id)
        cuatri.status=false
        await cuatri.save()
        return response.json({
            status:200,
            msg: "el cuatrimestre a sido eliminada",
            error: {},
            data: [cuatri]
        })
    }
}
