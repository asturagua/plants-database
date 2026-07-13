import {PlantInterface} from "#app/repository/plant.interface.js";
import {CharacteristicMapping, DistributionMapping, PlantMapping} from "./model/mappings.js";
import {CharacteristicsRequest, NativeRequest} from "./model/requests.js";
import {Plant} from "./model/database-types.js";

export class PlantService {
    private readonly repository;

    constructor(repository: PlantInterface) {
        this.repository = repository;
    }

    /**
     * Gets all plants.
     */
    async getPlants(): Promise<PlantMapping[]> {
        return (await this.repository.getPlants()).map(plant => this.mapPlantFromDb(plant));
    }

    /**
     * Gets plant by common name or scientific name.
     * @param name Name of plant to filter by
     * @param nameType COMMON or SCIENTIFIC. If not specified, will search both common and scientific names for matches.
     */
    async getPlantByName(name: string, nameType?: string): Promise<PlantMapping[]> {
        return (await this.repository.getPlantByName(name, nameType)).map(plant => this.mapPlantFromDb(plant))
    }

    /**
     * Get plants filtered by group and distribution and characteristics.
     * Filters are optional, but the service will only return distribution and characteristic data if the respective
     * filters are specified.
     * @param groupsFilter A string array of plant groups to filter by
     * @param distributionFilter A filter that includes a string array of states to filter by and whether to include introduced states
     * @param characteristicsFilter A filter for various plant characteristics
     */
    async getPlantsByGroupAndDistributionAndCharacteristics(
        groupsFilter?: string[],
        distributionFilter?: NativeRequest,
        characteristicsFilter?: CharacteristicsRequest): Promise<PlantMapping[]> {
        const dbPlantsWithDistributionAndCharacteristics =
            await this.repository.getPlantsByGroupAndDistributionAndCharacteristic(groupsFilter, distributionFilter, characteristicsFilter);
        if (!dbPlantsWithDistributionAndCharacteristics) {
            return [];
        }
        return dbPlantsWithDistributionAndCharacteristics.map(plant => {
            const distribution = distributionFilter ? this.mapDistributionFromDb(plant) : null;
            const characteristics = characteristicsFilter ? this.mapCharacteristicsFromDb(plant) : null;
            const mappedPlant = this.mapPlantFromDb(plant);
            mappedPlant.id = plant.v_plant_id;
            mappedPlant.characteristics = characteristics;
            mappedPlant.distribution = distribution;
            return mappedPlant
        });
    }

    /**
     * Get plants native to and introduced to states.
     * TODO might remove this in favor of just getPlantsByGroupAndDistributionAndCharacteristics
     * @param states A string array of US states to filter plants by
     * @param includeIntroduced Whether to include plants introduced to the state
     */
    async getPlantsNativeTo(states: string[], includeIntroduced: boolean): Promise<PlantMapping[]> {
        const dbPlantsWithDistribution = await this.repository.getPlantsNativeTo(states, includeIntroduced)
        if (!dbPlantsWithDistribution) {
            return [];
        }
        return dbPlantsWithDistribution.map(plant => {
            const distribution = this.mapDistributionFromDb(plant);

            const plantMapping = this.mapPlantFromDb(plant);
            plantMapping.distribution = distribution;

            return plantMapping
        });
    }

    /**
     * Get plant distribution for a single plant.
     * @param plantId Plant id
     */
    async getPlantDistribution(plantId: number): Promise<DistributionMapping | null> {
        const dbDistribution = (await this.repository.getPlantDistribution(plantId))[0];
        if (!dbDistribution) {
            return null;
        }
        return this.mapDistributionFromDb(dbDistribution);
    }

    /**
     * Get plant characteristics for a single plant.
     * @param plantId Plant id
     */
    async getPlantCharacteristics(plantId: number): Promise<CharacteristicMapping | null> {
        const dbCharacteristics = (await this.repository.getPlantCharacteristics(plantId))[0];
        if (!dbCharacteristics) {
            return null;
        }
        return this.mapCharacteristicsFromDb(dbCharacteristics);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private mapDistributionFromDb(distribution: any): DistributionMapping {
        return {
            introducedStates: this.stringToArray(distribution.introduced_states),
            nativeStates: this.stringToArray(distribution.native_states),
            plantId: distribution.plant_id,
            totalIntroducedStates: distribution.total_introduced_states,
            totalNativeStates: distribution.total_native_states
        }
    }

    private stringToArray(stringArray: string) {
        let strippedString = stringArray.trim();
        if (strippedString.startsWith("[") && strippedString.endsWith("]")) {
            strippedString = strippedString.substring(1, strippedString.length - 1)
        }
        return strippedString
            .split(",")
            .filter(array => array.length > 0)
            .map(string => string.replace(/['"]/g, "")
                .trim());

    }

    private mapPlantFromDb(plant: Plant): PlantMapping {
        return {
            acceptedId: plant.accepted_id,
            commonName: plant.common_name,
            durations: plant.durations,
            factSheetUrls: plant.fact_sheet_urls,
            groupName: plant.group_name,
            growthHabits: plant.growth_habits,
            id: plant.id,
            imageId: plant.image_id,
            numImages: plant.num_images,
            otherCommonNames: plant.other_common_names,
            plantGuideUrls: plant.plant_guide_urls,
            plantLocationId: plant.plant_location_id,
            profileImageFilename: plant.profile_image_filename,
            profileImageUrl: plant.profile_image_url,
            rank: plant.rank,
            rankId: plant.rank_id,
            scientificName: plant.scientific_name,
            symbol: plant.symbol
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private mapCharacteristicsFromDb(characteristics: any): CharacteristicMapping {
        return {
            activeGrowthPeriod: characteristics.active_growth_period,
            adaptedToCoarseTexturedSoils: characteristics.adapted_to_coarse_textured_soils,
            adaptedToFineTexturedSoils: characteristics.adapted_to_fine_textured_soils,
            adaptedToMediumTexturedSoils: characteristics.adapted_to_medium_textured_soils,
            anaerobicTolerance: characteristics.anaerobic_tolerance,
            berryNutSeedProduct: characteristics.berry_nut_seed_product,
            bloat: characteristics.bloat,
            bloomPeriod: characteristics.bloom_period,
            cNRatio: characteristics.c_n_ratio,
            caco3Tolerance: characteristics.caco_3_tolerance,
            christmasTreeProduct: characteristics.christmas_tree_product,
            coldStratificationRequired: characteristics.cold_stratification_required,
            commercialAvailability: characteristics.commercial_availability,
            coppicePotential: characteristics.coppice_potential,
            droughtTolerance: characteristics.drought_tolerance,
            fallConspicuous: characteristics.fall_conspicuous,
            fertilityRequirement: characteristics.fertility_requirement,
            fireResistant: characteristics.fire_resistant,
            fireTolerance: characteristics.fire_tolerance,
            flowerColor: characteristics.flower_color,
            flowerConspicuous: characteristics.flower_conspicuous,
            fodderProduct: characteristics.fodder_product,
            foliageColor: characteristics.foliage_color,
            foliagePorositySummer: characteristics.foliage_porosity_summer,
            foliagePorosityWinter: characteristics.foliage_porosity_winter,
            foliageTexture: characteristics.foliage_texture,
            frostFreeDaysMinimum: characteristics.frost_free_days_minimum,
            fruitSeedAbundance: characteristics.fruit_seed_abundance,
            fruitSeedColor: characteristics.fruit_seed_color,
            fruitSeedConspicuous: characteristics.fruit_seed_conspicuous,
            fruitSeedPeriodBegin: characteristics.fruit_seed_period_begin,
            fruitSeedPeriodEnd: characteristics.fruit_seed_period_end,
            fruitSeedPersistence: characteristics.fruit_seed_persistence,
            fuelwoodProduct: characteristics.fuelwood_product,
            growthForm: characteristics.growth_form,
            growthRate: characteristics.growth_rate,
            hedgeTolerance: characteristics.hedge_tolerance,
            heightAt20YearsMaximumFeet: characteristics.height_at_20_years_maximum_feet,
            heightMatureFeet: characteristics.height_mature_feet,
            knownAllelopath: characteristics.known_allelopath,
            leafRetention: characteristics.leaf_retention,
            lifespan: characteristics.lifespan,
            lowGrowingGrass: characteristics.low_growing_grass,
            lumberProduct: characteristics.lumber_product,
            moistureUse: characteristics.moisture_use,
            navalStoreProduct: characteristics.naval_store_product,
            nitrogenFixation: characteristics.nitrogen_fixation,
            nurseryStockProduct: characteristics.nursery_stock_product,
            palatableBrowseAnimal: characteristics.palatable_browse_animal,
            palatableHuman: characteristics.palatable_human,
            phMaximum: characteristics.ph_maximum,
            phMinimum: characteristics.ph_minimum,
            plantId: characteristics.plant_id,
            plantingDensityPerAcreMaximum: characteristics.planting_density_per_acre_maximum,
            plantingDensityPerAcreMinimum: characteristics.planting_density_per_acre_minimum,
            postProduct: characteristics.post_product,
            precipitationMaximum: characteristics.precipitation_maximum,
            precipitationMinimum: characteristics.precipitation_minimum,
            propagatedByBareRoot: characteristics.propagated_by_bare_root,
            propagatedByBulb: characteristics.propagated_by_bulb,
            propagatedByContainer: characteristics.propagated_by_container,
            propagatedByCorm: characteristics.propagated_by_corm,
            propagatedByCuttings: characteristics.propagated_by_cuttings,
            propagatedBySeed: characteristics.propagated_by_seed,
            propagatedBySod: characteristics.propagated_by_sod,
            propagatedBySprigs: characteristics.propagated_by_sprigs,
            propagatedByTubers: characteristics.propagated_by_tubers,
            pulpwoodProduct: characteristics.pulpwood_product,
            resproutAbility: characteristics.resprout_ability,
            rootDepthMinimum: characteristics.root_depth_minimum,
            salinityTolerance: characteristics.salinity_tolerance,
            seedPerPound: characteristics.seed_per_pound,
            seedSpreadRate: characteristics.seed_spread_rate,
            seedlingVigor: characteristics.seedling_vigor,
            shadeTolerance: characteristics.shade_tolerance,
            shapeAndOrientation: characteristics.shape_and_orientation,
            smallGrain: characteristics.small_grain,
            temperatureMinimumF: characteristics.temperature_minimum_f,
            toxicity: characteristics.toxicity,
            vegetativeSpreadRate: characteristics.vegetative_spread_rate,
            veneerProduct: characteristics.veneer_product
        }
    }

    // TODO i probably dont need this anymore
    mapDatabaseKey(key: string) {
        return key.replace(/_./g, (result) => result[1].toUpperCase());
    }
}