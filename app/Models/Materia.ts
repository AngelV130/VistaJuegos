import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Profesor from './Profesor'

export default class Materia extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public nombre:string
  @column()
  public unidades:number
  @column()
  public status:boolean

  @hasMany(()=>Profesor)
  public Profesor:HasMany<typeof Profesor>
}
