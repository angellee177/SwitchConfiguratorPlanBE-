import { Repository } from "typeorm";
import {
  mapColourCombinationForApi,
  type ColourCombinationApi,
} from "../common/switch-plate-combination.mapper";
import { SwitchPlateColourCombination } from "../models/SwitchPlateColourCombination.entity";
import { setLog } from "../common/logger.helper";

export class SwitchPlateColourCombinationService {
  constructor(
    private switchPlateColourCombinationRepository: Repository<SwitchPlateColourCombination>,
  ) {}

  /**
   * Get all switch plate colour combinations
   *
   * @returns Switch plate colour combinations
   */
  async getSwitchPlateColourCombinations(): Promise<ColourCombinationApi[]> {
    try {
      const switchPlateColourCombinations =
        await this.switchPlateColourCombinationRepository.find({
          relations: {
            backplateColour: true,
            faceplateColour: true,
            mechColour: true,
          },
          order: { name: "ASC" },
        });

      setLog({
        level: "info",
        method: "SwitchPlateColourCombinationService",
        message: "Switch plate colour combinations fetched successfully",
      });

      return switchPlateColourCombinations.map(mapColourCombinationForApi);
    } catch (error) {
      setLog({
        level: "error",
        method: "SwitchPlateColourCombinationService",
        message: "Failed to fetch switch plate colour combinations",
        error: error as Error,
      });
      throw error;
    }
  }
}
