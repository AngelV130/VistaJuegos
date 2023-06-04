import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Liga extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column({  })
  public nombre: String
  @column({  })
  public pais: number
  @column({  })
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  static get table(){
    return 'ligas'
  }
}
