import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Rol {
  public async handle({auth,response}: HttpContextContract, next: () => Promise<void>,roles) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if(!roles.includes(auth.user?.rol_id.toString())){
      return response.forbidden("Usuario no autorizado")
    }
    await next()
  }
}
