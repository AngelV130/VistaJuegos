import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
export default class extends BaseSeeder {
  public async run () {
    await User.create({
      name: "Admin",
      telefono: "871324930",
      email: "admin12@gmail.com",
      password: await Hash.make("12345678"),
      rol_id: 1,
      status: true
    })
  }
}
