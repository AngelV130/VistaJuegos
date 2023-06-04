import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'partidas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id'),
      table.integer('user_uno').unsigned().references('id').inTable('users').onDelete('CASCADE'),
      table.integer('user_dos').unsigned().references('id').inTable('users').nullable().onDelete('CASCADE'),
      table.boolean('status'),
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
