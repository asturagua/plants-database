import {beforeAll, beforeEach, describe, expect, test, vi} from "vitest";
import {PlantService} from "../src/app/plant.service.js";
import {PlantInterface} from "../src/app/repository/plant.interface.js";
import {mock} from "vitest-mock-extended";
import {PlantRepository} from "../src/app/repository/plant.repository.js";
import Database from "better-sqlite3";
import {createMockDatabase} from "./setup.js";
import {CharacteristicMapping, DistributionMapping, PlantMapping} from "../src/app/model/mappings.js";

vi.mock('#app/repository/plant.interface.js', () => {
    return {}
});

let mockedPlantInterface: PlantInterface;

beforeEach(() => {
    vi.clearAllMocks();
    mockedPlantInterface = mock<PlantInterface>();
});

describe('PlantService', () => {
    test.for([
        ["ab_cdef_ghi", "abCdefGhi"],
        ["AdwkjadnAD_Adb_d", "AdwkjadnADAdbD"],
        ["wad_2_23", "wad223"],
        ["awd_", "awd_"],
    ])('should map %s to %s', ([input, expected]) => {
        const service = new PlantService(mockedPlantInterface);
        expect(service.mapDatabaseKey(input)).toBe(expected);
    });
    // TODO tests for mappings
})

describe('PlantService Integration Tests', () => {
    const testPlantsMapping: PlantMapping[] = [
        {
            acceptedId: 21313,
            commonName: "INTEGRATION TEST",
            durations: null,
            factSheetUrls: null,
            groupName: "Moss",
            growthHabits: null,
            id: 123,
            imageId: 324,
            numImages: 1,
            otherCommonNames: null,
            plantGuideUrls: null,
            plantLocationId: 54353,
            profileImageFilename: null,
            profileImageUrl: null,
            rank: "Species",
            rankId: 180,
            scientificName: "TESTIA INTEGRA",
            symbol: "TESTSYM",
        },
        {
            acceptedId: 4234234,
            commonName: "INTEGRATION TEST 2",
            durations: "durers",
            factSheetUrls: "test.com",
            groupName: "Dicot",
            growthHabits: "fast",
            id: 124,
            imageId: 324,
            numImages: 1,
            otherCommonNames: "TEST 2",
            plantGuideUrls: "test-guide.com",
            plantLocationId: 54353,
            profileImageFilename: "test-image.jpg",
            profileImageUrl: "test-image.com",
            rank: "Species",
            rankId: 180,
            scientificName: "TESTIA INTEGRA 2",
            symbol: "TESTSYM 2",
        },
        {
            acceptedId: 4234234,
            commonName: "Planty plant",
            durations: "durararara",
            factSheetUrls: "plant-test.com",
            groupName: "Lichen",
            growthHabits: "slow",
            id: 125,
            imageId: 132,
            numImages: 1,
            otherCommonNames: "Plant",
            plantGuideUrls: "test-guide.com",
            plantLocationId: 3455,
            profileImageFilename: "mfwdawd.jpg",
            profileImageUrl: "dsdffesf.com",
            rank: "Species",
            rankId: 180,
            scientificName: "Plantica plantus",
            symbol: "PLPL",
        },
        {
            acceptedId: 4234234,
            commonName: "Rydia Mist",
            durations: "durararara",
            factSheetUrls: "ffiv.com/adawdawwa",
            groupName: "Moss",
            growthHabits: "slow",
            id: 126,
            imageId: 435,
            numImages: 1,
            otherCommonNames: "Green Summoner",
            plantGuideUrls: "ffiv.com/dwadad",
            plantLocationId: 3455,
            profileImageFilename: "ffiv.jpg",
            profileImageUrl: "ffiv.com",
            rank: "Species",
            rankId: 180,
            scientificName: "Rydia Mistica",
            symbol: "RYMI",
        }
    ];

    const testDistributions: DistributionMapping[] = [
        {
            plantId: 123,
            nativeStates: ["New_York", "Maine", "New_Jersey", "Pennsylvania"],
            introducedStates: ["Massachusetts"],
            totalNativeStates: 4,
            totalIntroducedStates: 1,
        },
        {
            plantId: 124,
            nativeStates: ["Florida"],
            introducedStates: ["California", "Texas", "Pennsylvania"],
            totalNativeStates: 1,
            totalIntroducedStates: 3
        },
        {
            plantId: 126,
            nativeStates: ["Maine", "Vermont"],
            introducedStates: [],
            totalNativeStates: 1,
            totalIntroducedStates: 3
        }
    ]

    const testCharacteristics: CharacteristicMapping[] = [
        {
            activeGrowthPeriod: null,
            adaptedToCoarseTexturedSoils: null,
            adaptedToFineTexturedSoils: null,
            adaptedToMediumTexturedSoils: null,
            anaerobicTolerance: null,
            berryNutSeedProduct: null,
            bloat: null,
            bloomPeriod: null,
            cNRatio: null,
            caco3Tolerance: null,
            christmasTreeProduct: null,
            coldStratificationRequired: null,
            commercialAvailability: null,
            coppicePotential: null,
            droughtTolerance: null,
            fallConspicuous: null,
            fertilityRequirement: null,
            fireResistant: null,
            fireTolerance: null,
            flowerColor: "Green",
            flowerConspicuous: null,
            fodderProduct: null,
            foliageColor: null,
            foliagePorositySummer: null,
            foliagePorosityWinter: null,
            foliageTexture: null,
            frostFreeDaysMinimum: null,
            fruitSeedAbundance: null,
            fruitSeedColor: null,
            fruitSeedConspicuous: null,
            fruitSeedPeriodBegin: null,
            fruitSeedPeriodEnd: null,
            fruitSeedPersistence: null,
            fuelwoodProduct: null,
            growthForm: null,
            growthRate: null,
            hedgeTolerance: null,
            heightAt20YearsMaximumFeet: null,
            heightMatureFeet: null,
            knownAllelopath: null,
            leafRetention: null,
            lifespan: null,
            lowGrowingGrass: null,
            lumberProduct: null,
            moistureUse: null,
            navalStoreProduct: null,
            nitrogenFixation: null,
            nurseryStockProduct: null,
            palatableBrowseAnimal: null,
            palatableHuman: null,
            phMaximum: null,
            phMinimum: null,
            plantId: 126,
            plantingDensityPerAcreMaximum: null,
            plantingDensityPerAcreMinimum: null,
            postProduct: null,
            precipitationMaximum: null,
            precipitationMinimum: null,
            propagatedByBareRoot: null,
            propagatedByBulb: null,
            propagatedByContainer: null,
            propagatedByCorm: null,
            propagatedByCuttings: null,
            propagatedBySeed: null,
            propagatedBySod: null,
            propagatedBySprigs: null,
            propagatedByTubers: null,
            pulpwoodProduct: null,
            resproutAbility: null,
            rootDepthMinimum: null,
            salinityTolerance: null,
            seedPerPound: null,
            seedSpreadRate: null,
            seedlingVigor: null,
            shadeTolerance: null,
            shapeAndOrientation: null,
            smallGrain: null,
            temperatureMinimumF: null,
            toxicity: null,
            vegetativeSpreadRate: null,
            veneerProduct: null,
        }
    ]

    let mockDb: Database.Database;
    let repository: PlantInterface;
    let service: PlantService;

    beforeAll(() => {
        mockDb = createMockDatabase();
        repository = new PlantRepository(mockDb);
        service = new PlantService(repository);
    });

    test('should get all plants from database', async () => {
        expect(await service.getPlants()).toEqual(testPlantsMapping);
    });

    test('should get plant with specified name from database', async () => {
        expect(await service.getPlantByName("Testia integra")).toEqual([testPlantsMapping[0]]);
    });

    test('should get plant with common name from database', async () => {
        expect(await service.getPlantByName("integration TEST 2", "common")).toEqual([testPlantsMapping[1]]);
    });

    test('should fail to get plant with name that does not exist in database', async () => {
        expect(await service.getPlantByName("This plant does not exist", "scientific")).toEqual([]);
    });

    test('should fail to get plant with scientific name that does not exist in database, even if common name exists', async () => {
        expect(await service.getPlantByName("integration test", "scientific")).toEqual([]);
    });

    test('should fail to get plant with common name that does not exist in database, even if scientific name exists', async () => {
        expect(await service.getPlantByName("tESTIA Integra", "common")).toEqual([]);
    });

    test('should get plants native to New York and Florida', async () => {
        const expected1 = testPlantsMapping[0];
        expected1.distribution = testDistributions[0];
        const expected2 = testPlantsMapping[1];
        expected2.distribution = testDistributions[1];
        expect(await service.getPlantsNativeTo(["New York", "Florida"], false)).toEqual([expected1, expected2]);
    });

    test('should get plants native and introduced to Pennsylvania', async () => {
        const expected1 = testPlantsMapping[0];
        expected1.distribution = testDistributions[0];
        const expected2 = testPlantsMapping[1];
        expected2.distribution = testDistributions[1];
        expect(await service.getPlantsNativeTo(["Pennsylvania"], true)).toEqual([expected1, expected2]);
    });

    test('should get plants native to Pennsylvania', async () => {
        const expected = testPlantsMapping[0];
        expected.distribution = testDistributions[0];
        expect(await service.getPlantsNativeTo(["Pennsylvania"], false)).toEqual([expected]);
    });

    test('should get plants with group Moss', async () => {
        const expected1 = testPlantsMapping[0];
        expected1.distribution = null;
        expected1.characteristics = null;
        const expected2 = testPlantsMapping[3];
        expected2.distribution = null;
        expected2.characteristics = null;
        expect(await service.getPlantsByGroupAndDistributionAndCharacteristics(["Moss"], undefined, undefined)).toEqual([expected1, expected2])
    });

    test('should get plants with group Moss and native to Vermont', async () => {
        const expected = testPlantsMapping[3];
        expected.distribution = testDistributions[2];
        expected.characteristics = null;
        expect(await service.getPlantsByGroupAndDistributionAndCharacteristics(["Moss"], {statesFilter: ["vermont"]}, undefined)).toEqual([expected])
    });

    test('should get plants with group Moss, native to Vermont, and flower color green', async () => {
        const expected = testPlantsMapping[3];
        expected.distribution = testDistributions[2];
        expected.characteristics = testCharacteristics[0];
        expect(await service.getPlantsByGroupAndDistributionAndCharacteristics(["Moss"], {statesFilter: ["vermont"]}, {flowerColor: "green"})).toEqual([expected])
    });

    test('should return empty array when no match found for getPlantsByGroupAndDistributionAndCharacteristics', async () => {
        expect(await service.getPlantsByGroupAndDistributionAndCharacteristics(["Moss"], {statesFilter: ["vermont"]}, {flowerColor: "purple"})).toEqual([])
    });

    test('should get plant distribution by plant id', async () => {
        expect(await service.getPlantDistribution(123)).toEqual(testDistributions[0]);
    });

    test('should get null plant distribution by plant id', async () => {
        expect(await service.getPlantDistribution(125)).toEqual(null);
    });

    test('should get null plant characteristics by plant id', async () => {
        expect(await service.getPlantCharacteristics(124)).toEqual(null);
    });
})
