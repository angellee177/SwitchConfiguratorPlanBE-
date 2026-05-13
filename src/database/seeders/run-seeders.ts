import "reflect-metadata";

import { connectionSource } from "../../config/typeorm";
import { SwitchPlateColourSeeder } from "./SwitchPlateColour.seed";
import { SwitchPlateColourCombinationSeeder } from "./SwitchPlateColourCombination.seed";
import { SwitchPlateMechSeeder } from "./SwitchPlateMech.seed";
import { SwitchPlateOrientationSeeder } from "./SwitchPlateOrientation.seed";
import { SwitchPlateStyleSeeder } from "./SwitchPlateStyle.seed";
import { SwitchPlateStyleColourCombinationSeeder } from "./SwitchPlateStyleColourCombination.seed";

async function runSeeders(): Promise<void> {
  await connectionSource.initialize();

  try {
    await new SwitchPlateStyleSeeder(connectionSource).run();
    await new SwitchPlateColourSeeder(connectionSource).run();
    await new SwitchPlateOrientationSeeder(connectionSource).run();
    await new SwitchPlateMechSeeder(connectionSource).run();
    await new SwitchPlateColourCombinationSeeder(connectionSource).run();
    await new SwitchPlateStyleColourCombinationSeeder(connectionSource).run();
  } finally {
    await connectionSource.destroy();
  }
}

runSeeders().catch((error) => {
  console.error("Error running seeders", error);
  process.exit(1);
});
