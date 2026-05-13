import { DataSource, In } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import { setLog } from "../../common/logger.helper";
import { SwitchPlateColourCombination } from "../../models/SwitchPlateColourCombination.entity";
import { SwitchPlateColour } from "../../models/SwitchPlateColour.entity";

type ColourCombinationData = {
  name: string;
  code: string;
  backplateColourCode: string;
  faceplateColourCode: string;
  mechColourCode: string;
};

export class SwitchPlateColourCombinationSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const switchPlateColourCombinationRepository = this.dataSource.getRepository(
      SwitchPlateColourCombination
    );
    const switchPlateColourRepository = this.dataSource.getRepository(
      SwitchPlateColour
    );

    try {
      // Dynamically read the data from the JSON file
      const filePath = path.resolve(__dirname, "../data/switchPlateColourCombinations.json");
      const rawData = fs.readFileSync(filePath, "utf-8");
      const colourCombinationsData = JSON.parse(rawData) as ColourCombinationData[];

      // Check if the colour combinations already exist
      const existingColourCombinations = await switchPlateColourCombinationRepository.find({
        where: {
          code: In(colourCombinationsData.map((combination) => combination.code)),
        },
      });

      if (existingColourCombinations.length > 0) {
        setLog({
          level: "info",
          method: "SwitchPlateColourCombinationSeeder",
          message: "Colour combinations already exist",
        });
        return;
      }

      const colourCodes = [
        ...new Set(
          colourCombinationsData.flatMap((combination) => [
            combination.backplateColourCode,
            combination.faceplateColourCode,
            combination.mechColourCode,
          ]),
        ),
      ];
      const colours = await switchPlateColourRepository.find({
        where: {
          code: In(colourCodes),
        },
      });

      // Map the colour codes to their IDs
      const colourIdByCode = new Map<string, string>(
        colours.map((colour: { id: string; code: string }) => [colour.code, colour.id]),
      );

      // Create the colour combinations into DB
      await Promise.all(
        colourCombinationsData.map((combination) => {
          const backplateColourId = colourIdByCode.get(combination.backplateColourCode);
          const faceplateColourId = colourIdByCode.get(combination.faceplateColourCode);
          const mechColourId = colourIdByCode.get(combination.mechColourCode);

          if (!backplateColourId || !faceplateColourId || !mechColourId) {
            throw new Error(`Missing colour reference for colour combination: ${combination.code}`);
          }

          return this.dataSource.query(
            `
              INSERT INTO "switch_plate_colour_combinations"
                ("name", "code", "backplate_colour_id", "faceplate_colour_id", "mech_colour_id")
              VALUES ($1, $2, $3, $4, $5)
            `,
            [
              combination.name,
              combination.code,
              backplateColourId,
              faceplateColourId,
              mechColourId,
            ],
          );
        }),
      );

      setLog({
        level: "info",
        method: "SwitchPlateColourCombinationSeeder",
        message: "Colour combinations have been seeded",
      });
    } catch (error) {
      setLog({
        level: "error",
        method: "SwitchPlateColourCombinationSeeder",
        message: "Error seeding colour combinations",
        error: error as Error,
      });
    }
  }
}
