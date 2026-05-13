import { Repository } from "typeorm";
import {
  mapStyleColourCombinationForApi,
  type StyleColourCombinationApi,
} from "../common/switch-plate-combination.mapper";
import { SwitchPlateStyleColourCombination } from "../models/SwitchPlateStyleColourCombination.entity";
import { setLog } from "../common/logger.helper";

export class SwitchPlateStyleColourCombinationService {
  constructor(
    private switchPlateStyleColourCombinationRepository: Repository<SwitchPlateStyleColourCombination>,
  ) {}

  /**
   * Get all switch plate style colour combinations
   * @returns Switch plate style colour combinations
   */
  async getSwitchPlateStyleColourCombinations(): Promise<StyleColourCombinationApi[]> {
    try {
      const switchPlateStyleColourCombinations =
        await this.switchPlateStyleColourCombinationRepository.find({
          relations: {
            style: true,
            colourCombination: {
              backplateColour: true,
              faceplateColour: true,
              mechColour: true,
            },
          },
          order: {
            style: { name: "ASC" },
            colourCombination: { name: "ASC" },
          },
        });

      setLog({
        level: "info",
        method: "SwitchPlateStyleColourCombinationService",
        message: "Switch plate style colour combinations fetched successfully",
      });

      return switchPlateStyleColourCombinations.map(mapStyleColourCombinationForApi);
    } catch (error) {
      setLog({
        level: "error",
        method: "SwitchPlateStyleColourCombinationService",
        message: "Failed to fetch switch plate style colour combinations",
        error: error as Error,
      });
      throw error;
    }
  }

}