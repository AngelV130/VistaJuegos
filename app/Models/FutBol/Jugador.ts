import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Jugador extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column({  })
  public nombre: String
  @column({  })
  public ap_paterno: String
  @column({  })
  public ap_materno: String
  @column({  })
  public edad: number
  @column({  })
  public pais: number
  @column({  })
  public equipo: number
  @column({  })
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  static get table(){
    return 'jugadores'
  }
}
