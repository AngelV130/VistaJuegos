import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Cuatrimestre from './Cuatrimestre'

export default class Alumno extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  public nombre:string
  @column()
  public ap_paterno:string
  @column()
  public ap_materno:string
  @column()
  public correo:string
  @column({ })
  public cuatri_id:number
  @column()
  public status:boolean

  @belongsTo(()=>Cuatrimestre)
  public Cuatrimestre:BelongsTo<typeof Cuatrimestre>
}
