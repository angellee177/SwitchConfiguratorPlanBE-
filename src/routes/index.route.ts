import { Router } from "express";
import type { DataSource } from "typeorm";
import { createSwitchPlateConfigRouter } from "./SwitchPlateConfig.route";

/**
 * Central API router: mount feature routers here so `index.ts` stays small.
 */
export function createIndexRouter(dataSource: DataSource): Router {
  const router = Router();

  router.use("/v1/switch-plate", createSwitchPlateConfigRouter(dataSource));

  return router;
}
