import {Plant, PlantCharacteristic, PlantDistribution} from "#app/model/database-types.js";
import {CharacteristicsRequest, NativeRequest} from "#app/model/requests.js";

// Should this return the 1:1 mapping to the database table or the mapping to a type-def Plant with an extra repository to
// map from database object to type-def?
export interface PlantInterface {
    getPlants(): Plant[] | Promise<Plant[]>;

    getPlantsByGroupAndDistributionAndCharacteristic(
        groups?: string[],
        distribution?: NativeRequest,
        characteristic?: CharacteristicsRequest
    ): any[] | Promise<any[]>;

    getPlantByName(name: string, nameType?: string): Plant[] | Promise<Plant[]>;

    getPlantsNativeTo(states: string[], includeIntroduced: boolean): any[] | Promise<any[]>;

    getPlantDistribution(plantId: number): PlantDistribution[] | Promise<PlantDistribution[]>;

    getPlantCharacteristics(plantId: number): PlantCharacteristic[] | Promise<PlantCharacteristic[]>;
}