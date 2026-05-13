import { DataSource, In } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import { setLog } from "../../common/logger.helper";
import { SwitchPlateMech } from "../../models/SwitchPlateMech.entity";

type SwitchPlateMechData = {
  name: string;
  code: string;
  supportsColour: boolean;
};

export class SwitchPlateMechSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const switchPlateMechRepository = this.dataSource.getRepository(SwitchPlateMech);
    
    try {
      // Dynamically read the data from the JSON file
      const filePath = path.resolve(__dirname, "../data/switchPlateMech.json");
      const rawData = fs.readFileSync(filePath, "utf-8");
      const mechsData = JSON.parse(rawData) as SwitchPlateMechData[];

      const existingMechs = await switchPlateMechRepository.find({
        where: {
          code: In(mechsData.map((mech) => mech.code)),
        },
      });

      if (existingMechs.length > 0) {
        setLog({
          level: "info",
          method: "SwitchPlateMechSeeder",
          message: "Switch plate mechs already exist",
        });
        return;
      }

      await Promise.all(
        mechsData.map((mech) =>
          this.dataSource.query(
            `
              INSERT INTO "switch_plate_mechs" ("name", "code", "supports_colour")
              VALUES ($1, $2, $3)
            `,
            [mech.name, mech.code, mech.supportsColour],
          ),
        ),
      );

      setLog({
        level: "info",
        method: "SwitchPlateMechSeeder",
        message: "Switch plate mechs have been seeded",
      });
    } catch (error) {
      setLog({
        level: "error",
        method: "SwitchPlateMechSeeder",
        message: "Error seeding switch plate mechs",
        error: error as Error,
      });
    }
  }
}
