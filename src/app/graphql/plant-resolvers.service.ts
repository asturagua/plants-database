import {PlantService} from "../plant.service.js";
import {ResolverInterface} from "./resolver.interface.js";
import {NativeRequest, PlantNameRequest, PlantRequest} from "../model/requests.js";
import {PlantMapping} from "../model/mappings.js";
import {STATES} from "../constants.js";

export class PlantResolversService implements ResolverInterface {
    private readonly service;

    constructor(service: PlantService) {
        this.service = service;
    }

    getResolvers() {
        return {
            Query: {
                plants: async () => {
                    try {
                        return this.service.getPlants();
                    } catch (err) {
                        console.error(err);
                    }
                },
                plantByName: async (_parent: undefined, args: PlantNameRequest) => {
                    try {
                        return this.service.getPlantByName(args.nameFilter, args.nameType);
                    } catch (err) {
                        console.error(err);
                    }
                },
                plantsNativeTo: async (_parent: undefined, args: NativeRequest) => {
                    try {
                        args.statesFilter.map(state => {
                            if (!STATES.includes(state.toUpperCase())) {
                                // TODO better error
                                throw new Error('Invalid state in request.');
                            }
                        })
                        return this.service.getPlantsNativeTo(args.statesFilter, args.includeIntroduced ?? false);
                    } catch (err) {
                        console.error(err);
                    }
                },
                plantsByGroupAndDistributionAndCharacteristics: async (_parent: undefined, args: PlantRequest) => {
                    try {
                        return this.service.getPlantsByGroupAndDistributionAndCharacteristics(args.groupNamesFilter, args.distributionFilter, args.characteristicsFilter);
                    } catch (err) {
                        console.error(err);
                    }
                }
            },
            Plant: {
                plantDistribution: (parent: PlantMapping) => {
                    // Since we may have already done a join on plant and plant_distribution tables, we might already have
                    // fetched the distribution data and can simply return that data from the parent resolver.
                    if (parent.distribution) {
                        return parent.distribution;
                    }
                    return this.service.getPlantDistribution(parent['id']);
                },
                plantCharacteristic: (parent: PlantMapping) => {
                    // Since we may have already done a join on plant and plant_characteristics tables, we might already have
                    // fetched the characteristics data and can simply return that data from the parent resolver.
                    if (parent.characteristics) {
                        return parent.characteristics;
                    }
                    return this.service.getPlantCharacteristics(parent['id']);
                },
            },
        };
    }
}