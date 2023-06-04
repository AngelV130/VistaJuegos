// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from "axios";
import User from "App/Models/User";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
export default class VerificacionsController {
    public async mandarCodigo({request,params,response}){
        if (!request.hasValidSignature()) {
            return 'ruta no valida'
          }
        //7b88f689
        //DvD2oE75QTKRfx26
        try {
            const user = (await User.findOrFail(params.id))
        const response = await axios.post('https://api.nexmo.com/v2/verify', {
            brand: 'Verifica Usuario',
            workflow:[
                {
                    channel:"sms",
                    to : `52${user.telefono}`,
                }
            ],
            locale : 'es-mx',
            channel_timeout:300,
            code_length:4,
        },{
            auth:{username:"7b88f689",password:"DvD2oE75QTKRfx26"}
        });
        if (response.status == 202){
            user.verificacion = response.data['request_id']
            user.save()
        }
        return "Se a enviado el codigo";
        } catch (error) {
            if(error.response.data.request_id != null){
                return "ya se a enviado un codigo"
            }
            return response.unauthorized(error.response)
        }
    }

    public async validarodigo({request,params,response}){
        try {            
            await request.validate({
                schema: schema.create({
                    code: schema.string([rules.required(),rules.minLength(4),rules.maxLength(4)])})});
            const user = (await User.findOrFail(params.id));
            const response = await axios.post(`https://api.nexmo.com/v2/verify/${user.verificacion}`, {
                code: request.body().code
            },{
                auth:{username:"7b88f689",password:"DvD2oE75QTKRfx26"}
            });
            user.status = true;
            user.save()
            return {status:response.status, body:request.body().code};
            } catch (error) {
                return response.unauthorized(error)
            }
    }

}
