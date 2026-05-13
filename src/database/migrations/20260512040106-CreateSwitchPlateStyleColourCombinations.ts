import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSwitchPlateStyleColourCombinations20260512040106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "switch_plate_style_colour_combinations",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "style_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "colour_combination_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "created_at",
            type: "timestamptz",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamptz",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamptz",
            isNullable: true,
          }
        ],
        foreignKeys: [
          {
            name: "fk_style_colour_combinations_style",
            columnNames: ["style_id"],
            referencedTableName: "switch_plate_styles",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            name: "fk_style_colour_combinations_colour_combination",
            columnNames: ["colour_combination_id"],
            referencedTableName: "switch_plate_colour_combinations",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("switch_plate_style_colour_combinations");
  }
}
