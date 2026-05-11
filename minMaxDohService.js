const { BaseService } = require("./BaseService");

class minMaxDohData extends BaseService {
  constructor(db) {
    super(db);
  }

  /**
   * @description Mock: Check if Min Max DoH has data for the given scenario
   * @param {String} scenarioId - scenario UUID
   * @returns {boolean} true if data exists
   */
  async isMinMaxDohDataComplete(scenarioId) {
    try {
      console.log(
        "*********query***********",
        `SELECT COUNT(1) as count FROM supply_planning.min_max_doh WHERE scenario_id = ${scenarioId}::uuid`
      );
      if (process.env.COMPLETENESS === "nodata") {
        return false;
      }
      if (process.env.COMPLETENESS === "dberror") {
        throw new Error("isMinMaxDohDataComplete DB error");
      }
      return true;
    } catch (error) {
      console.log("Error in isMinMaxDohDataComplete:", error);
      throw error;
    }
  }

  /**
   * @description Mock: Get min and max DOH values for a given scenario, month and group
   * @param {String} scenarioId - scenario UUID
   * @param {Number} month - month number (1-12)
   * @param {String} groupId - group UUID
   * @returns {Array} min_max_doh records
   */
  async getMinMaxDohData(scenarioId, month, groupId) {
    try {
      console.log(
        "*********query***********",
        `SELECT * FROM supply_planning.min_max_doh WHERE scenario_id = ${scenarioId}::uuid AND month = ${month} AND group_id = ${groupId}::uuid`
      );
      if (process.env.EXECUTION === "minmaxdoherror") {
        throw new Error("getMinMaxDohData DB error");
      }
      if (process.env.EXECUTION === "nominmaxdoh") {
        return [];
      }
      return [
        {
          min_max_doh_id: "mmm-uuid-1",
          group_id: groupId,
          scenario_id: scenarioId,
          month: month,
          year: 2026,
          min_doh: 10,
          max_doh: 20,
          apply_to_all_months: true,
        },
      ];
    } catch (error) {
      console.log("Error in getMinMaxDohData:", error);
      throw error;
    }
  }

  /**
   * @description Mock: Get all min and max DOH values for a given scenario and group (all months)
   * @param {String} scenarioId - scenario UUID
   * @param {String} groupId - group UUID
   * @returns {Array} min_max_doh records
   */
  async getAllMinMaxDohData(scenarioId, groupId) {
    try {
      console.log(
        "*********query***********",
        `SELECT * FROM supply_planning.min_max_doh WHERE scenario_id = ${scenarioId}::uuid AND group_id = ${groupId}::uuid`
      );
      if (process.env.EXECUTION === "allminmaxdoherror") {
        throw new Error("getAllMinMaxDohData DB error");
      }
      if (process.env.EXECUTION === "nodata") {
        return [];
      }
      if (process.env.EXECUTION === "duplicatemonths") {
        /* Tight range so doh values 320/330 exceed max_doh:100 → out of range */
        return [
          { month: 1, year: 2026, min_doh: 1, max_doh: 100 },
          { month: 2, year: 2026, min_doh: 1, max_doh: 100 },
        ];
      }
      /* Default: wide range so doh values 310/320 are within range → dohOutOfRange: [] */
      return [
        { month: 1, year: 2026, min_doh: 1, max_doh: 400 },
        { month: 2, year: 2026, min_doh: 1, max_doh: 400 },
      ];
    } catch (error) {
      console.log("Error in getAllMinMaxDohData:", error);
      throw error;
    }
  }
}

module.exports.minMaxDohData = minMaxDohData;
