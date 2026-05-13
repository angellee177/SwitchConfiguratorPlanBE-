import { Repository } from "typeorm";
import { SwitchPlateMech } from "../models/SwitchPlateMech.entity";
import { setLog } from "../common/logger.helper";

export class SwitchPlateMechService {
  constructor(
    private switchPlateMechRepository: Repository<SwitchPlateMech>,
  ) {}

  /**
   * Get all switch plate mechs
   * @returns Switch plate mechs
   */
  async getSwitchPlateMechs(): Promise<SwitchPlateMech[]> {
    try {
      const switchPlateMechs = await this.switchPlateMechRepository.find({
        order: { name: "ASC" },
      });

      setLog({
        level: "info",
        method: "SwitchPlateMechService",
        message: "Switch plate mechs fetched successfully",
      });

      return switchPlateMechs;
    } catch (error) {
      setLog({
        level: "error",
        method: "SwitchPlateMechService",
        message: "Failed to fetch switch plate mechs",
        error: error as Error,
      });
      throw error;
    }
  }
}