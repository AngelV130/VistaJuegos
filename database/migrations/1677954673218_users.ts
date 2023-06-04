import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name');
      table.string('telefono',10);
      table.string('email');
      table.string('password');
      table.integer('rol_id').unsigned().references('roles.id');
      table.boolean('status').defaultTo(false);
      table.string('remember_me_token').nullable();
      table.string('verificacion').nullable();
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
