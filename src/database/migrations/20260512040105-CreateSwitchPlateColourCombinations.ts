import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSwitchPlateColourCombinations20260512040105 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "switch_plate_colour_combinations",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
          },
          {
            name: "code",
            type: "varchar",
            length: "20",
            isUnique: true,
          },
          {
            name: "backplate_colour_id",
            type: "uuid",
          },
          {
            name: "faceplate_colour_id",
            type: "uuid",
          },
          {
            name: "mech_colour_id",
            type: "uuid",
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
            name: "fk_colour_combinations_backplate_colour",
            columnNames: ["backplate_colour_id"],
            referencedTableName: "switch_plate_colours",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk_colour_combinations_faceplate_colour",
            columnNames: ["faceplate_colour_id"],
            referencedTableName: "switch_plate_colours",
            referencedColumnNames: ["id"],
          },
          {
            name: "fk_colour_combinations_mech_colour",
            columnNames: ["mech_colour_id"],
            referencedTableName: "switch_plate_colours",
            referencedColumnNames: ["id"],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("switch_plate_colour_combinations");
  }
}
