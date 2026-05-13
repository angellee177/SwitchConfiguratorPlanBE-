import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { SwitchPlateStyle } from "./SwitchPlateStyle.entity";
import { SwitchPlateColourCombination } from "./SwitchPlateColourCombination.entity";

/**
 * @description being used for Switch Plate Style Colour Combination dropdown.
 * example: Vision Black, Horizon White, Infinity Blue, Eclipse Red.
 * @openapi
 * components:
 *   schemas:
 *     SwitchPlateStyleColourCombination:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         styleId:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         colourCombinationId:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000
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
@Entity("switch_plate_style_colour_combinations")
export class SwitchPlateStyleColourCombination {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ name: "style_id", type: "uuid" })
    styleId!: string;

    @ManyToOne(() => SwitchPlateStyle)
    @JoinColumn({ name: "style_id" })
    style!: SwitchPlateStyle;

    @Column({ name: "colour_combination_id", type: "uuid" })
    colourCombinationId!: string;

    @ManyToOne(() => SwitchPlateColourCombination)
    @JoinColumn({ name: "colour_combination_id" })
    colourCombination!: SwitchPlateColourCombination;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
    updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamptz" })
    deletedAt?: Date;
}