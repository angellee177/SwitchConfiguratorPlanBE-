import { Repository } from "typeorm";
import { SwitchPlateColour } from "../models/SwitchPlateColour.entity";
import { setLog } from "../common/logger.helper";

export class SwitchPlateColourService {
  constructor(
    private switchPlateColourRepository: Repository<SwitchPlateColour>,
  ) {}

  /**
   * Get all switch plate colours 
   * 
   * @returns Switch plate colours
   */
  async getSwitchPlateColours(): Promise<SwitchPlateColour[]> {
    try {
      const switchPlateColours = await this.switchPlateColourRepository.find({
        order: { name: "ASC" },
      });

      setLog({
        level: "info",
        method: "SwitchPlateColourService",
        message: "Switch plate colours fetched successfully",
      });

      return switchPlateColours;
    } catch (error) {
      setLog({
        level: "error",
        method: "SwitchPlateColourService",
        message: "Failed to fetch switch plate colours",
        error: error as Error,
      });
      throw error;
    }
  }
}