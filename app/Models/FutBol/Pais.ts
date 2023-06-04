import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pais extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column({ })
  public nombre: String
  @column({ })
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  static get table(){
    return 'pais'
  }
}
