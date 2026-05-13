import { DataSource, In } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import { setLog } from "../../common/logger.helper";
import { SwitchPlateOrientation } from "../../models/SwitchPlateOrientation.entity";

type SwitchPlateOrientationData = {
  name: string;
  code: string;
};

export class SwitchPlateOrientationSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const switchPlateOrientationRepository = this.dataSource.getRepository(SwitchPlateOrientation);

    try {
      // Dynamically read the data from the JSON file
      const filePath = path.resolve(__dirname, "../data/switchPlateOrientations.json");
      const rawData = fs.readFileSync(filePath, "utf-8");
      const orientationsData = JSON.parse(rawData) as SwitchPlateOrientationData[];

      const existingOrientations = await switchPlateOrientationRepository.find({
        where: {
          code: In(orientationsData.map((orientation) => orientation.code)),
        },
      });

      if (existingOrientations.length > 0) {
        setLog({
          level: "info",
          method: "SwitchPlateOrientationSeeder",
          message: "Switch plate orientations already exist",
        });
        return;
      }

      await Promise.all(
        orientationsData.map((orientation) =>
          this.dataSource.query(
            `
              INSERT INTO "switch_plate_orientations" ("name", "code")
              VALUES ($1, $2)
            `,
            [orientation.name, orientation.code],
          ),
        ),
      );

      setLog({
        level: "info",
        method: "SwitchPlateOrientationSeeder",
        message: "Switch plate orientations have been seeded",
      });
    } catch (error) {
      setLog({
        level: "error",
        method: "SwitchPlateOrientationSeeder",
        message: "Error seeding switch plate orientations",
        error: error as Error,
      });
    }
  }
}
