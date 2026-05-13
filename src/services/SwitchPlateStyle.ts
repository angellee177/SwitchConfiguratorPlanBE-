import { Repository } from "typeorm";
import { SwitchPlateStyle } from "../models/SwitchPlateStyle.entity";
import { setLog } from "../common/logger.helper";

export class SwitchPlateStyleService {
  constructor(
    private switchPlateStyleRepository: Repository<SwitchPlateStyle>,
  ) {}

  /**
   * Get all switch plate styles
   * @returns Switch plate styles
   */
  async getSwitchPlateStyles(): Promise<SwitchPlateStyle[]> {
    try {
      const switchPlateStyles = await this.switchPlateStyleRepository.find({
        order: { name: "ASC" },
      });

      setLog({
        level: "info",
        method: "SwitchPlateStyleService",
        message: "Switch plate styles fetched successfully",
      });

      return switchPlateStyles;
    } catch (error) {
      setLog({
        level: "error",
        method: "SwitchPlateStyleService",
        message: "Failed to fetch switch plate styles",
        error: error as Error,
      });
      throw error;
    }
  }

}