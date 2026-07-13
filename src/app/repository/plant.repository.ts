import {PlantInterface} from "#app/repository/plant.interface.js";
import {Plant} from "#app/model/database-types.js";
import {CharacteristicsRequest, NativeRequest} from "../model/requests.js";
import {characteristicsKeys} from "../model/mappings.js";
import Database from "better-sqlite3";

export class PlantRepository implements PlantInterface {
    static readonly GET_PLANTS = `SELECT *
                                  FROM plants p`;
    static readonly GET_PLANTS_BY_NATIVE_STATE = `SELECT *
                                                  FROM plants p
                                                           INNER JOIN plant_distribution pd ON p.id = pd.plant_id
                                                  WHERE ?`;
    static readonly GET_PLANTS_BY_COMMON_NAME = PlantRepository.GET_PLANTS.concat(` WHERE UPPER(common_name) = UPPER(?)`)
    static readonly GET_PLANTS_BY_SCIENTIFIC_NAME = PlantRepository.GET_PLANTS.concat(` WHERE UPPER(scientific_name) = UPPER(?)`)
    static readonly GET_PLANTS_BY_NAME = PlantRepository.GET_PLANTS.concat(` WHERE UPPER(scientific_name) = UPPER(?) OR UPPER(common_name) = UPPER(?)`)
    static readonly GET_PLANT_DISTRIBUTION_FOR_PLANT = `SELECT *
                                                        FROM plant_distribution
                                                        WHERE plant_id = ?`;
    static readonly GET_PLANT_CHARACTERISTICS_FOR_PLANT = `SELECT *
                                                           FROM plant_characteristics
                                                           WHERE plant_id = ?`;

    readonly database: Database.Database;

    constructor(database: Database.Database) {
        this.database = database;
    }

    async getPlantByName(name: string, nameType: string): Promise<Plant[]> {
        if (nameType && nameType.toUpperCase() === 'SCIENTIFIC') {
            return await this.fetchAll(this.database, PlantRepository.GET_PLANTS_BY_SCIENTIFIC_NAME,
                [name])
        } else if (nameType && nameType.toUpperCase() === 'COMMON') {
            return await this.fetchAll(this.database, PlantRepository.GET_PLANTS_BY_COMMON_NAME,
                [name])
        } else {
            return await this.fetchAll(this.database, PlantRepository.GET_PLANTS_BY_NAME,
                [name, name])
        }
    }

    async getPlants(): Promise<Plant[]> {
        return await this.fetchAll(this.database, PlantRepository.GET_PLANTS, []);
    }

    async getPlantsByGroupAndDistributionAndCharacteristic(
        groups?: string[],
        distribution?: NativeRequest,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        characteristics?: CharacteristicsRequest): Promise<any[]> {
        let sql = `SELECT p.id AS v_plant_id, * FROM plants p`;
        const queryParts = [];
        if ((distribution && distribution.statesFilter) || characteristics) {
            const plantFilters = [];
            let distributionAndCharacteristicsSql = ''
            if (distribution && distribution.statesFilter) {
                distributionAndCharacteristicsSql = distributionAndCharacteristicsSql.concat(` INNER JOIN plant_distribution pd ON p.id = pd.plant_id`);
                plantFilters.push(this.createPlantsNativeToQuery(distribution.statesFilter, distribution.includeIntroduced ?? false));
            }
            if (characteristics) {
                distributionAndCharacteristicsSql = distributionAndCharacteristicsSql.concat(` INNER JOIN plant_characteristics pc ON p.id = pc.plant_id`);
                plantFilters.push(this.createPlantsByCharacteristicsQuery(characteristics));
            }
            distributionAndCharacteristicsSql = distributionAndCharacteristicsSql.concat(` WHERE `);
            distributionAndCharacteristicsSql = distributionAndCharacteristicsSql.concat(plantFilters.join(" AND "));
            queryParts.push(distributionAndCharacteristicsSql);
        }
        if (groups && groups.length > 0) {
            let groupSql = '';
            if (queryParts.length == 0) {
                groupSql = groupSql.concat(` WHERE `)
            }
            groupSql = groupSql.concat(`UPPER(p.group_name) in (${groups.map(group => "'" + group.toUpperCase() + "'").join(',')})`);
            queryParts.push(groupSql);
        }
        sql = sql.concat(queryParts.join(` AND `));
        return await this.fetchAll(this.database, sql, []);
    }

    async getPlantsNativeTo(states: string[], includeIntroduced: boolean): Promise<Plant[]> {
        const sql = PlantRepository.GET_PLANTS_BY_NATIVE_STATE
            .replace("?", this.createPlantsNativeToQuery(states, includeIntroduced));
        return await this.fetchAll(this.database, sql, []);
    }

    async getPlantDistribution(plantId: number) {
        return await this.fetchAll(this.database, PlantRepository.GET_PLANT_DISTRIBUTION_FOR_PLANT, [plantId.toString()]);
    }

    async getPlantCharacteristics(plantId: number) {
        return await this.fetchAll(this.database, PlantRepository.GET_PLANT_CHARACTERISTICS_FOR_PLANT, [plantId.toString()]);
    }

    createPlantsNativeToQuery(states: string[], includeIntroduced: boolean): string {
        return "(" + states.map((state) => {
            let part = `UPPER(pd.native_states) like UPPER('%${state.replace(" ", "_")}%')`;
            if (includeIntroduced) {
                part = part.concat(` OR UPPER(pd.introduced_states) like UPPER('%${state.replace(" ", "_")}%')`)
            }
            return part;
        }).join(" OR ") + ")";
    }

    createPlantsByCharacteristicsQuery(characteristics: CharacteristicsRequest): string {
        const query: string[] = [];
        Object.keys(characteristics).map(key => {
            query.push(`UPPER(pc.${characteristicsKeys.get(key)}) = UPPER('${characteristics[key]}')`)
        })
        return query.join(" AND ");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async fetchAll(db:  Database.Database, sql: string, params: string[]): Promise<any> {
        try {
            const statement = db.prepare(sql);
            return statement.all(...params);
        } catch (err) {
            console.error("Failed to execute SQL: ", sql, err);
            throw err;
        }
    }
}