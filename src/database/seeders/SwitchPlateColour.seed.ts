import { DataSource, In } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import { setLog } from "../../common/logger.helper";
import { SwitchPlateColour } from "../../models/SwitchPlateColour.entity";

type SwitchPlateColourData = {
  name: string;
  code: string;
};

export class SwitchPlateColourSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const switchPlateColourRepository = this.dataSource.getRepository(SwitchPlateColour);
    
    try {
      // Dynamically read the data from the JSON file
      const filePath = path.resolve(__dirname, "../data/switchPlateColours.json");
      const rawData = fs.readFileSync(filePath, "utf-8");
      const coloursData = JSON.parse(rawData) as SwitchPlateColourData[];

      const existingColours = await switchPlateColourRepository.find({
        where: {
          code: In(coloursData.map((colour) => colour.code)),
        },
      });

      if (existingColours.length > 0) {
        setLog({
          level: "info",
          method: "SwitchPlateColourSeeder",
          message: "Switch plate colours already exist",
        });
        return;
      }

      await Promise.all(
        coloursData.map((colour) =>
          this.dataSource.query(
            `
              INSERT INTO "switch_plate_colours" ("name", "code")
              VALUES ($1, $2)
            `,
            [colour.name, colour.code],
          ),
        ),
      );

      setLog({
        level: "info",
        method: "SwitchPlateColourSeeder",
        message: "Switch plate colours have been seeded",
      });
    } catch (error) {
      setLog({
        level: "error",
        method: "SwitchPlateColourSeeder",
        message: "Error seeding switch plate colours",
        error: error as Error,
      });
    }
  }
}
