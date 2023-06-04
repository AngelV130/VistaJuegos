import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'alumnos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre',30).notNullable()
      table.string('ap_paterno',30).notNullable()
      table.string('ap_materno',30).notNullable()
      table.string('correo',35).notNullable().unique()
      table.boolean('status').defaultTo(true)
      table.integer('cuatri_id').unsigned().references('id').inTable('cuatrimestres')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
