import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";

/**
 * @description Switch plate colour entity, for example: Black, White.
 *  being used in Backplate, Faceplate, Mechanical Switch color, Combination, and Switch Plate dropdown.
 * @openapi
 * components:
 *   schemas:
 *     SwitchPlateColour:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         name:
 *           type: string
 *           example: Black
 *         code:
 *           type: string
 *           example: B
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-05-12T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-05-12T00:00:00.000Z
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-05-12T00:00:00.000Z
 */
@Entity("switch_plate_colours")
export class SwitchPlateColour {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 20, unique: true })
  code!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamptz" })
  deletedAt?: Date;
}