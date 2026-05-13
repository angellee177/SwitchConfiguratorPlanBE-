import { Repository } from "typeorm";
import { SwitchPlateOrientation } from "../models/SwitchPlateOrientation.entity";
import { setLog } from "../common/logger.helper";

export class SwitchPlateOrientationService {
  constructor(
    private switchPlateOrientationRepository: Repository<SwitchPlateOrientation>,
  ) {}

  /**
   * Get all switch plate orientations
   * @returns Switch plate orientations
   */
  async getSwitchPlateOrientations(): Promise<SwitchPlateOrientation[]> {
    try {
      const switchPlateOrientations = await this.switchPlateOrientationRepository.find({
        order: { name: "ASC" },
      });

      setLog({
        level: "info",
        method: "SwitchPlateOrientationService",
        message: "Switch plate orientations fetched successfully",
      });

      return switchPlateOrientations;
    } catch (error) {
      setLog({
        level: "error",
        method: "SwitchPlateOrientationService",
        message: "Failed to fetch switch plate orientations",
        error: error as Error,
      });
      throw error;
    }
  }
}