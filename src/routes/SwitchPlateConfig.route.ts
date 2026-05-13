import { Router } from "express";
import type { DataSource } from "typeorm";
import { SwitchPlateConfigController } from "../controllers/SwitchPlateConfigController";
import { SwitchPlateColour } from "../models/SwitchPlateColour.entity";
import { SwitchPlateColourCombination } from "../models/SwitchPlateColourCombination.entity";
import { SwitchPlateMech } from "../models/SwitchPlateMech.entity";
import { SwitchPlateOrientation } from "../models/SwitchPlateOrientation.entity";
import { SwitchPlateStyle } from "../models/SwitchPlateStyle.entity";
import { SwitchPlateStyleColourCombination } from "../models/SwitchPlateStyleColourCombination.entity";
import { SwitchPlateColourService } from "../services/SwitchPlateColour";
import { SwitchPlateColourCombinationService } from "../services/SwitchPlateColourCombination";
import { SwitchPlateMechService } from "../services/SwitchPlateMech";
import { SwitchPlateOrientationService } from "../services/SwitchPlateOrientation";
import { SwitchPlateStyleService } from "../services/SwitchPlateStyle";
import { SwitchPlateStyleColourCombinationService } from "../services/SwitchPlateStyleColourCombination";

/**
 * Switch plate configurator API routes (GET lookups for Angular / other clients).
 */
export function createSwitchPlateConfigRouter(dataSource: DataSource): Router {
  const router = Router();

  const controller = new SwitchPlateConfigController(
    new SwitchPlateStyleService(dataSource.getRepository(SwitchPlateStyle)),
    new SwitchPlateColourService(dataSource.getRepository(SwitchPlateColour)),
    new SwitchPlateOrientationService(dataSource.getRepository(SwitchPlateOrientation)),
    new SwitchPlateMechService(dataSource.getRepository(SwitchPlateMech)),
    new SwitchPlateColourCombinationService(dataSource.getRepository(SwitchPlateColourCombination)),
    new SwitchPlateStyleColourCombinationService(
      dataSource.getRepository(SwitchPlateStyleColourCombination),
    ),
  );

  router.get("/styles", controller.getStyles.bind(controller));
  router.get("/colours", controller.getColours.bind(controller));
  router.get("/orientations", controller.getOrientations.bind(controller));
  router.get("/mechs", controller.getMechs.bind(controller));
  router.get("/colour-combinations", controller.getColourCombinations.bind(controller));
  router.get(
    "/style-colour-combinations",
    controller.getStyleColourCombinations.bind(controller),
  );
  router.get("/config", controller.getFullConfig.bind(controller));

  return router;
}
