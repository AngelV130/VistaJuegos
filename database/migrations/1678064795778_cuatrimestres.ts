import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cuatrimestres'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.tinyint('num_cuatri').notNullable()
      table.enum('periodo',['en-abr', 'my-agt','sept-dic']).notNullable()
      table.boolean('status').defaultTo(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
