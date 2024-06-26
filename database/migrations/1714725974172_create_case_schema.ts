// import { Schema } from '@ioc:Adonis/Lucid/Schema';
import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "projects";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onDelete("CASCADE");
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.string("skills").notNullable();
      table.string("customer").notNullable();
      table.string("assignees").notNullable();
      table.string("status").notNullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
