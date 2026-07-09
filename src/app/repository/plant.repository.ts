import {PlantInterface} from "#app/repository/plant.interface.js";
import {Plant} from "#app/model/database-types.js";
import {Database} from "sqlite3";
import {CharacteristicsRequest, NativeRequest} from "../model/requests.js";

export class PlantRepository implements PlantInterface {
    static readonly STATES = [
        "Alabama".toUpperCase(),
        "Alaska".toUpperCase(),
        "Arizona".toUpperCase(),
        "Arkansas".toUpperCase(),
        "California".toUpperCase(),
        "Colorado".toUpperCase(),
        "Connecticut".toUpperCase(),
        "Delaware".toUpperCase(),
        "Florida".toUpperCase(),
        "Georgia".toUpperCase(),
        "Hawaii".toUpperCase(),
        "Idaho".toUpperCase(),
        "Illinois".toUpperCase(),
        "Indiana".toUpperCase(),
        "Iowa".toUpperCase(),
        "Kansas".toUpperCase(),
        "Kentucky".toUpperCase(),
        "Louisiana".toUpperCase(),
        "Maine".toUpperCase(),
        "Maryland".toUpperCase(),
        "Massachusetts".toUpperCase(),
        "Michigan".toUpperCase(),
        "Minnesota".toUpperCase(),
        "Mississippi".toUpperCase(),
        "Missouri".toUpperCase(),
        "Montana".toUpperCase(),
        "Nebraska".toUpperCase(),
        "Nevada".toUpperCase(),
        "New Hampshire".toUpperCase(),
        "New Jersey".toUpperCase(),
        "New Mexico".toUpperCase(),
        "New York".toUpperCase(),
        "North Carolina".toUpperCase(),
        "North Dakota".toUpperCase(),
        "Ohio".toUpperCase(),
        "Oklahoma".toUpperCase(),
        "Oregon".toUpperCase(),
        "Pennsylvania".toUpperCase(),
        "Rhode Island".toUpperCase(),
        "South Carolina".toUpperCase(),
        "South Dakota".toUpperCase(),
        "Tennessee".toUpperCase(),
        "Texas".toUpperCase(),
        "Utah".toUpperCase(),
        "Vermont".toUpperCase(),
        "Virginia".toUpperCase(),
        "Washington".toUpperCase(),
        "West Virginia".toUpperCase(),
        "Wisconsin".toUpperCase(),
        "Wyoming".toUpperCase(),
        "American Samoa".toUpperCase(),
        "Federated States of Micronesia".toUpperCase(),
        "Guam".toUpperCase(),
        "Marshall Islands".toUpperCase(),
        "Northern Mariana Islands".toUpperCase(),
        "Palau".toUpperCase(),
        "Puerto Rico".toUpperCase(),
        "U.S. Minor Outlying Islands".toUpperCase(),
        "Virgin Islands".toUpperCase(),
        "Alberta".toUpperCase(),
        "British Columbia".toUpperCase(),
        "Manitoba".toUpperCase(),
        "New Brunswick".toUpperCase(),
        "Nova Scotia".toUpperCase(),
        "Ontario".toUpperCase(),
        "Prince Edward Island".toUpperCase(),
        "Quebec".toUpperCase(),
        "Saskatchewan".toUpperCase(),
        "Yukon".toUpperCase(),
        "Northwest Territories".toUpperCase(),
        "Nunavut".toUpperCase(),
        "Labrador".toUpperCase(),
        "Newfoundland".toUpperCase(),
        "Greenland".toUpperCase(),
        "Saint Pierre and Miquelon".toUpperCase(),
        "Navassa Island".toUpperCase(),
    ]
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

    readonly database: Database;

    constructor(database: Database) {
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
        characteristics?: CharacteristicsRequest): Promise<any[]> {
        let sql = PlantRepository.GET_PLANTS;
        const queryParts = [];
        if (distribution || characteristics) {
            const plantFilters = [];
            let distributionAndCharacteristicsSql = ''
            if (distribution) {
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

    async getPlantDistribution(plantId: bigint) {
        return await this.fetchAll(this.database, PlantRepository.GET_PLANT_DISTRIBUTION_FOR_PLANT, [plantId.toString()]);
    }

    async getPlantCharacteristics(plantId: bigint) {
        return await this.fetchAll(this.database, PlantRepository.GET_PLANT_CHARACTERISTICS_FOR_PLANT, [plantId.toString()]);
    }

    createPlantsNativeToQuery(states: string[], includeIntroduced: boolean): string {
        return "(" + states
            .filter((state) => PlantRepository.STATES.includes(state.toUpperCase()))
            .map((state) => {
                let part = `UPPER(pd.native_states) like UPPER("%${state.replace(" ", "_")}%")`;
                if (includeIntroduced) {
                    part = part.concat(` OR UPPER(pd.introduced_states) like UPPER("%${state.replace(" ", "_")}%")`)
                }
                return part;
            }).join(" OR ") + ")";
    }

    // TODO add the rest
    createPlantsByCharacteristicsQuery(characteristics: CharacteristicsRequest): string {
        const query = [];
        if (characteristics.activeGrowthPeriod) {
            query.push(`UPPER(pc.active_growth_period) = UPPER("${characteristics.activeGrowthPeriod}")`);
        }
        if (characteristics.adaptedToCoarseTexturedSoils) {
            query.push(`UPPER(pc.adapted_to_coarse_textured_soils) = UPPER("${characteristics.adaptedToCoarseTexturedSoils}")`);
        }
        if (characteristics.adaptedToFineTexturedSoils) {
            query.push(`UPPER(pc.adapted_to_fine_textured_soils) = UPPER("${characteristics.adaptedToFineTexturedSoils}")`);
        }
        if (characteristics.adaptedToMediumTexturedSoils) {
            query.push(`UPPER(pc.adapted_to_medium_textured_soils) = UPPER("${characteristics.adaptedToMediumTexturedSoils}")`);
        }
        if (characteristics.anaerobicTolerance) {
            query.push(`UPPER(pc.anaerobic_tolerance) = UPPER("${characteristics.anaerobicTolerance}")`);
        }
        if (characteristics.berryNutSeedProduct) {
            query.push(`UPPER(pc.berry_nut_seed_product) = UPPER("${characteristics.berryNutSeedProduct}")`);
        }
        if (characteristics.bloat) {
            query.push(`UPPER(pc.bloat) = UPPER("${characteristics.bloat}")`);
        }
        if (characteristics.bloomPeriod) {
            query.push(`UPPER(pc.bloom_period) = UPPER("${characteristics.bloomPeriod}")`);
        }
        if (characteristics.flowerColor) {
            query.push(`UPPER(pc.flower_color) = UPPER("${characteristics.flowerColor}")`);
        }
        return query.join(" AND ");
    }


    async fetchAll(db: Database, sql: string, params: string[]) {
        return new Promise<any[]>((resolve, reject) => {
            db.all(sql, params, (err: Error, rows: Plant[]) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        })
    }
}