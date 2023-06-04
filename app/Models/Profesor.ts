import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Materia from './Materia'

export default class Profesor extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public nombre:string
  @column()
  public ap_paterno:string
  @column()
  public ap_materno:string
  @column()
  public correo:string
  @column({ })
  public materia_id:number
  @column()
  public status:boolean

  public static table = 'profesores'

  @belongsTo(()=>Materia)
  public Materia:BelongsTo<typeof Materia>
}
