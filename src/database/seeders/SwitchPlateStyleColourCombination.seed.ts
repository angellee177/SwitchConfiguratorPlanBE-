import { DataSource, In } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import { setLog } from "../../common/logger.helper";
import { SwitchPlateColourCombination } from "../../models/SwitchPlateColourCombination.entity";
import { SwitchPlateStyle } from "../../models/SwitchPlateStyle.entity";
import { SwitchPlateStyleColourCombination } from "../../models/SwitchPlateStyleColourCombination.entity";

type StyleColourCombinationData = {
  styleCode: string;
  colourCombinationCode: string;
};

export class SwitchPlateStyleColourCombinationSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const switchPlateStyleColourCombinationRepository = this.dataSource.getRepository(
      SwitchPlateStyleColourCombination,
    );
    const switchPlateStyleRepository = this.dataSource.getRepository(SwitchPlateStyle);
    const switchPlateColourCombinationRepository = this.dataSource.getRepository(
      SwitchPlateColourCombination,
    );

    try {
      // Dynamically read the data from the JSON file
      const filePath = path.resolve(__dirname, "../data/switchPlateStyleColourCombinations.json");
      const rawData = fs.readFileSync(filePath, "utf-8");
      const styleColourCombinationsData = JSON.parse(rawData) as StyleColourCombinationData[];

      const styleCodes = [...new Set(styleColourCombinationsData.map((row) => row.styleCode))];
      const colourCombinationCodes = [
        ...new Set(styleColourCombinationsData.map((row) => row.colourCombinationCode)),
      ];

      const styles = await switchPlateStyleRepository.find({
        where: {
          code: In(styleCodes),
        },
      });
      const colourCombinations = await switchPlateColourCombinationRepository.find({
        where: {
          code: In(colourCombinationCodes),
        },
      });

      const styleIdByCode = new Map(styles.map((style) => [style.code, style.id]));
      const colourCombinationIdByCode = new Map(
        colourCombinations.map((combination) => [combination.code, combination.id]),
      );

      const resolvedPairs = styleColourCombinationsData.map((row) => {
        const styleId = styleIdByCode.get(row.styleCode);
        const colourCombinationId = colourCombinationIdByCode.get(row.colourCombinationCode);

        if (!styleId || !colourCombinationId) {
          throw new Error(
            `Missing style or colour combination reference: ${row.styleCode}/${row.colourCombinationCode}`,
          );
        }

        return { styleId, colourCombinationId };
      });

      const existingRows = await switchPlateStyleColourCombinationRepository.find({
        where: resolvedPairs.map((pair) => ({
          styleId: pair.styleId,
          colourCombinationId: pair.colourCombinationId,
        })),
      });

      if (existingRows.length > 0) {
        setLog({
          level: "info",
          method: "SwitchPlateStyleColourCombinationSeeder",
          message: "Style colour combinations already exist",
        });
        return;
      }

      await Promise.all(
        resolvedPairs.map((pair) =>
          this.dataSource.query(
            `
              INSERT INTO "switch_plate_style_colour_combinations" ("style_id", "colour_combination_id")
              VALUES ($1, $2)
            `,
            [pair.styleId, pair.colourCombinationId],
          ),
        ),
      );

      setLog({
        level: "info",
        method: "SwitchPlateStyleColourCombinationSeeder",
        message: "Style colour combinations have been seeded",
      });
    } catch (error) {
      setLog({
        level: "error",
        method: "SwitchPlateStyleColourCombinationSeeder",
        message: "Error seeding style colour combinations",
        error: error as Error,
      });
    }
  }
}
