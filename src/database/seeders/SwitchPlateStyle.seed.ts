import { DataSource, In } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import { setLog } from "../../common/logger.helper";
import { SwitchPlateStyle } from "../../models/SwitchPlateStyle.entity";

type SwitchPlateStyleData = {
  name: string;
  code: string;
  supportsCustomColours: boolean;
};

export class SwitchPlateStyleSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const switchPlateStyleRepository = this.dataSource.getRepository(SwitchPlateStyle);

    try {
      // Dynamically read the data from the JSON file
      const filePath = path.resolve(__dirname, "../data/switchPlateStyles.json");
      const rawData = fs.readFileSync(filePath, "utf-8");
      const stylesData = JSON.parse(rawData) as SwitchPlateStyleData[];

      const existingStyles = await switchPlateStyleRepository.find({
        where: {
          code: In(stylesData.map((style) => style.code)),
        },
      });

      if (existingStyles.length > 0) {
        setLog({
          level: "info",
          method: "SwitchPlateStyleSeeder",
          message: "Switch plate styles already exist",
        });
        return;
      }

      await Promise.all(
        stylesData.map((style) =>
          this.dataSource.query(
            `
              INSERT INTO "switch_plate_styles" ("name", "code", "supports_custom_colours")
              VALUES ($1, $2, $3)
            `,
            [style.name, style.code, style.supportsCustomColours],
          ),
        ),
      );

      setLog({
        level: "info",
        method: "SwitchPlateStyleSeeder",
        message: "Switch plate styles have been seeded",
      });
    } catch (error) {
      setLog({
        level: "error",
        method: "SwitchPlateStyleSeeder",
        message: "Error seeding switch plate styles",
        error: error as Error,
      });
    }
  }
}
