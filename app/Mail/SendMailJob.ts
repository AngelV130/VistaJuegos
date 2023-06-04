import Mail from "@ioc:Adonis/Addons/Mail"

export default class SendEmailJob {
  static get key () {
    return 'send_email'
  }

  async handle (email,url) {
    await Mail.send((message) => {
      message.to(email)
      message.subject("Mensaje de verificacion")
      message.html(
        `<h1>Bienvenido</h1><h3>Da click en el enlase para mandar codigo de verificacion al numero <b></b></h3><a href="http://192.168.115.9:3333${url}">Verificacion</a>`
        )
    })
  }
}