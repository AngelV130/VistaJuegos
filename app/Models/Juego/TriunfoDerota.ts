import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TriunfoDerota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id:number
  @column()
  public partida_id:number
  @column()
  public estado:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  static get table(){
    return 'triunfo_derrotas'
  }
}
