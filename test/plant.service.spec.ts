import {beforeEach, describe, expect, test, vi} from "vitest";
import {PlantService} from "../src/app/plant.service.js";
import {PlantInterface} from "../src/app/repository/plant.interface.js";
import {mock} from "vitest-mock-extended";

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
