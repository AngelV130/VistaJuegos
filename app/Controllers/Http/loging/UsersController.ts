//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import SendEmailJob from 'App/Mail/SendMailJob';
import User from 'App/Models/User';
import {schema,rules} from '@ioc:Adonis/Core/Validator';
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database';
import Route from '@ioc:Adonis/Core/Route'
import Rol from 'App/Models/Rol';

export default class UsersController {
    
    public async registrar({request}){
        await request.validate({
            schema: schema.create({
                name: schema.string([rules.required()]),
                telefono: schema.string([rules.required(),rules.minLength(10),rules.maxLength(10)]),
                email: schema.string([rules.required(),rules.email()]),
                password: schema.string([rules.required(),rules.minLength(8)])})});
        request.body().rol_id = 2;
        request.body().password = await Hash.make(request.body().password)
        const user = (await User.create(request.body()))
        //new SendEmailJob().handle(user.email,Route.makeSignedUrl('verificacion', {id: user.id}));
        user.status = true
        user.save()
        return user
    }

    public async iniciarSersion({ auth, request, response }){
        await request.validate({
            schema: schema.create({
                email: schema.string([rules.required(),rules.email()]),
                password: schema.string([rules.required(),rules.minLength(8)])
            })
        });
        const email = request.body().email
        const password = request.body().password
        try {
            const user = (await User.findBy('email',email));
            if(user != null){
                if(user.status == true){           
                    const token = await auth.use('api').attempt(email, password)
                    return token
                }
                return response.unauthorized("active su cuenta")
            }
            return response.unauthorized('Usuario no registrado')
        } catch {
            return response.unauthorized('Invalid credentials')
        }
    }

    public async cerrarSesion({ auth}){
        auth.use('api').revoke();
        return {msg: "Sesion cerrada"};
    }
    
    public async getUsers({params}){
        if(params.id){
            const user = Database.from(User.table).where('users.id','=',params.id).where('users.id','!=',1).join('roles','users.rol_id','=','roles.id').
            select('users.id','users.name','users.telefono','users.email','users.status','roles.id as rol_id').first();
            return user;
        }
        const user = Database.from(User.table).where('users.id','!=',1).join('roles','users.rol_id','=','roles.id').
        select('users.id','users.name','users.telefono','users.email','users.status','roles.nombre as rol_id');
        return user;
    }

    public async token({auth}){
        return auth.user
    }

    public async roles(){
        const roles = Database.from(Rol.table).select('*')
        return roles
    }

    public async actualizar({request,params}){
        
        await request.validate({
            schema: schema.create({
                name: schema.string([rules.required()]),
                rol_id: schema.number([rules.required()]),
                status: schema.boolean([rules.required()])})});
        const user = await User.findOrFail(params.id);
        user.name = request.body().name
        user.rol_id = request.body().rol_id
        user.status = request.body().status
        user.save()
        return user
    }
}
