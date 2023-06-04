import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Alumno from './Alumno'

export default class Cuatrimestre extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public num_cuatri:number
  @column()
  public periodo:string
  @column()
  public status:boolean

  @hasMany(()=>Alumno)
  public Alumno:HasMany<typeof Alumno>
}
