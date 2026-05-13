import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";
import { SwitchPlateColour } from "./SwitchPlateColour.entity";

/**
 * @description Switch plate colour combination entity, for example: Full White, Full Black.
 *  being used in Switch Plate dropdown and Combination dropdown.
 * @openapi
 * components:
 *   schemas:
 *     SwitchPlateColourCombination:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         name:
 *           type: string
 *           example: Full White
 *         code:
 *           type: string
 *           example: WWW
 *         backplateColour:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: 123e4567-e89b-12d3-a456-426614174000
 *             name:
 *               type: string
 *               example: White
 *             code:
 *               type: string
 *               example: W
 *         faceplateColour:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: 123e4567-e89b-12d3-a456-426614174000
 *             name:
 *               type: string
 *               example: White
 *             code:
 *               type: string
 *               example: W
 *         mechColour:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: 123e4567-e89b-12d3-a456-426614174000
 *             name:
 *               type: string
 *               example: White
 *             code:
 *               type: string
 *               example: W
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
@Entity("switch_plate_colour_combinations")
export class SwitchPlateColourCombination {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", length: 20, unique: true })
    code!: string;

    @Column({ name: "backplate_colour_id", type: "uuid" })
    backplateColourId!: string;

    @ManyToOne(() => SwitchPlateColour)
    @JoinColumn({ name: "backplate_colour_id" })
    backplateColour!: SwitchPlateColour;

    @Column({ name: "faceplate_colour_id", type: "uuid" })
    faceplateColourId!: string;

    @ManyToOne(() => SwitchPlateColour)
    @JoinColumn({ name: "faceplate_colour_id" })
    faceplateColour!: SwitchPlateColour;

    @Column({ name: "mech_colour_id", type: "uuid" })
    mechColourId!: string;

    @ManyToOne(() => SwitchPlateColour)
    @JoinColumn({ name: "mech_colour_id" })
    mechColour!: SwitchPlateColour;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
    updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamptz" })
    deletedAt?: Date;
}