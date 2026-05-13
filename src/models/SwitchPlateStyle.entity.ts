import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from "typeorm";

/**
 * @description being used for Switch Plate Style dropdown.
 * example: Vision, Horizon, Infinity, Eclipse.
 * @openapi
 * components:
 *   schemas:
 *     SwitchPlateStyle:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         name:
 *           type: string
 *           example: Vision
 *         code:
 *           type: string
 *           example: VSW
 *         supportsCustomColours:
 *           type: boolean
 *           example: true
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
@Entity("switch_plate_styles")
export class SwitchPlateStyle {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", length: 20, unique: true })
    code!: string;

    @Column({ name: "supports_custom_colours", type: "boolean", default: false })
    supportsCustomColours!: boolean;
    
    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
    updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamptz" })
    deletedAt?: Date;
}