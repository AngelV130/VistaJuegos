import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'jugadores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre',60);
      table.string('ap_paterno',50);
      table.string('ap_materno',50).nullable();
      table.smallint('edad');
      table.integer('pais').unsigned().references('pais.id').onDelete('cascade');
      table.integer('equipo').unsigned().references('equipos.id').onDelete('cascade');
      table.boolean('status').defaultTo(true);
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
