import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../common/response.helper";
import { SwitchPlateColourService } from "../services/SwitchPlateColour";
import { SwitchPlateColourCombinationService } from "../services/SwitchPlateColourCombination";
import { SwitchPlateMechService } from "../services/SwitchPlateMech";
import { SwitchPlateOrientationService } from "../services/SwitchPlateOrientation";
import { SwitchPlateStyleService } from "../services/SwitchPlateStyle";
import { SwitchPlateStyleColourCombinationService } from "../services/SwitchPlateStyleColourCombination";

/**
 * HTTP layer for switch-plate configurator: maps request/response to services.
 * Routes are registered in `SwitchPlateConfig.route.ts`.
 */
export class SwitchPlateConfigController {
  constructor(
    private readonly styleService: SwitchPlateStyleService,
    private readonly colourService: SwitchPlateColourService,
    private readonly orientationService: SwitchPlateOrientationService,
    private readonly mechService: SwitchPlateMechService,
    private readonly colourCombinationService: SwitchPlateColourCombinationService,
    private readonly styleColourCombinationService: SwitchPlateStyleColourCombinationService,
  ) {}

  /**
   * Get all switch plate styles
   * @param _req - Request object
   * @param res 
   */
  async getStyles(_req: Request, res: Response): Promise<void> {
    try {
      const result = await this.styleService.getSwitchPlateStyles();
      res.status(200).json(successResponse("Switch plate styles fetched successfully", result));
    } catch (error) {
      res.status(500).json(errorResponse("Failed to fetch switch plate styles", error instanceof Error ? error.message : error));
    }
  }

  /**
   * Get all switch plate colours
   * @param _req - Request object
   * @param res - Response object
   */
  async getColours(_req: Request, res: Response): Promise<void> {
    try {
      const result = await this.colourService.getSwitchPlateColours();

      res.status(200).json(successResponse("Switch plate colours fetched successfully", result));
    } catch (error) {
      res.status(500).json(errorResponse("Failed to fetch switch plate colours", error instanceof Error ? error.message : error));
    }
  }

  /**
   * Get all switch plate orientations
   * @param _req - Request object
   * @param res - Response object
   */
  async getOrientations(_req: Request, res: Response): Promise<void> {
    try {
      const result = await this.orientationService.getSwitchPlateOrientations();
      res.status(200).json(successResponse("Switch plate orientations fetched successfully", result));
    } catch (error) {
      res.status(500).json(errorResponse("Failed to fetch switch plate orientations", error instanceof Error ? error.message : error));
    }
  }

  /**
   * Get all switch plate mechs
   * @param _req - Request object
   * @param res - Response object
   */
  async getMechs(_req: Request, res: Response): Promise<void> {
    try {
      const result = await this.mechService.getSwitchPlateMechs();
      res.status(200).json(successResponse("Switch plate mechs fetched successfully", result));
    } catch (error) {
      res.status(500).json(errorResponse("Failed to fetch switch plate mechs", error instanceof Error ? error.message : error));
    }
  }

  /**
   * Get all switch plate colour combinations
   * @param _req - Request object
   * @param res - Response object
   */
  async getColourCombinations(_req: Request, res: Response): Promise<void> {
    try {
      const result = await this.colourCombinationService.getSwitchPlateColourCombinations();
      res.status(200).json(successResponse("Switch plate colour combinations fetched successfully", result));
    } catch (error) {
      res.status(500).json(errorResponse("Failed to fetch switch plate colour combinations", error instanceof Error ? error.message : error));
    }
  }

  /**
   * Get all switch plate style colour combinations
   * @param _req - Request object
   * @param res - Response object
   */
  async getStyleColourCombinations(_req: Request, res: Response): Promise<void> {
    try {
      const result = await this.styleColourCombinationService.getSwitchPlateStyleColourCombinations();
      res.status(200).json(successResponse("Switch plate style colour combinations fetched successfully", result));
    } catch (error) {
      res.status(500).json(errorResponse("Failed to fetch switch plate style colour combinations", error instanceof Error ? error.message : error));
    }
  }

  /**
   * Get full switch plate config
   * @param _req - Request object
   * @param res - Response object
   */
  async getFullConfig(_req: Request, res: Response): Promise<void> {
    try {
      const [styles, colours, orientations, mechs, colourCombinations, styleColourCombinations] =
        await Promise.all([
          this.styleService.getSwitchPlateStyles(),
          this.colourService.getSwitchPlateColours(),
          this.orientationService.getSwitchPlateOrientations(),
          this.mechService.getSwitchPlateMechs(),
          this.colourCombinationService.getSwitchPlateColourCombinations(),
          this.styleColourCombinationService.getSwitchPlateStyleColourCombinations(),
        ]);
      res.status(200).json(successResponse("Switch plate config fetched successfully", { styles, colours, orientations, mechs, colourCombinations, styleColourCombinations }));
    } catch (error) {
      res.status(500).json(errorResponse("Failed to fetch switch plate config", error instanceof Error ? error.message : error));
    }
  }
}
